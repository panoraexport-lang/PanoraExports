import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
    private supabase: SupabaseClient;
    private readonly logger = new Logger(SupabaseService.name);
    private readonly bucketName: string;

    constructor(private configService: ConfigService) {
        const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
        const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_KEY');
        this.bucketName = this.configService.get<string>('SUPABASE_STORAGE_BUCKET', 'panora-documents');

        if (!supabaseUrl || !supabaseKey) {
            this.logger.error('Supabase credentials not configured! Application may crash if storage is used.');
            return;
        }

        try {
            this.supabase = createClient(supabaseUrl, supabaseKey);
        } catch (e) {
            this.logger.error('Failed to initialize Supabase client', e.stack);
        }
    }

    async onModuleInit() {
        if (this.supabase) {
            // Run non-blocking - don't crash startup if bucket creation fails
            this.initializeBucket().catch(e =>
                this.logger.warn(`Bucket init skipped: ${e.message}`)
            );
        }
    }

    /**
     * Upload file to Supabase Storage
     */
    async uploadFile(
        file: Express.Multer.File,
        folder: string = 'documents',
    ): Promise<{ url: string; path: string }> {
        if (!this.supabase) {
            throw new Error('Supabase client not initialized. Check SUPABASE_URL and SUPABASE_SERVICE_KEY env vars.');
        }

        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${folder}/${Date.now()}-${sanitizedName}`;
        this.logger.log(`Uploading to bucket: "${this.bucketName}", path: "${fileName}"`);

        const { data, error } = await this.supabase.storage
            .from(this.bucketName)
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                upsert: true,
            });

        if (error) {
            this.logger.error(`File upload failed [bucket: ${this.bucketName}]: ${error.message}`);
            throw new Error(`File upload failed: ${error.message}`);
        }

        // Get public URL
        const { data: urlData } = this.supabase.storage
            .from(this.bucketName)
            .getPublicUrl(data.path);

        this.logger.log(`Upload success: ${urlData.publicUrl}`);
        return {
            url: urlData.publicUrl,
            path: data.path,
        };
    }

    /**
     * Upload multiple files
     */
    async uploadFiles(
        files: Express.Multer.File[],
        folder: string = 'documents',
    ): Promise<Array<{ url: string; path: string }>> {
        const uploadPromises = files.map((file) => this.uploadFile(file, folder));
        return Promise.all(uploadPromises);
    }

    /**
     * Delete file from Supabase Storage
     */
    async deleteFile(filePath: string): Promise<void> {
        const { error } = await this.supabase.storage
            .from(this.bucketName)
            .remove([filePath]);

        if (error) {
            this.logger.error(`File deletion failed: ${error.message}`);
            throw new Error(`File deletion failed: ${error.message}`);
        }
    }

    /**
     * Get signed URL for private files (optional)
     */
    async getSignedUrl(filePath: string, expiresIn: number = 3600): Promise<string> {
        const { data, error } = await this.supabase.storage
            .from(this.bucketName)
            .createSignedUrl(filePath, expiresIn);

        if (error) {
            this.logger.error(`Failed to create signed URL: ${error.message}`);
            throw new Error(`Failed to create signed URL: ${error.message}`);
        }

        return data.signedUrl;
    }

    /**
     * Initialize storage bucket (run once during setup)
     */
    async initializeBucket(): Promise<void> {
        const { data: buckets } = await this.supabase.storage.listBuckets();

        const bucketExists = buckets?.some((b) => b.name === this.bucketName);

        if (!bucketExists) {
            const { error } = await this.supabase.storage.createBucket(this.bucketName, {
                public: true,  // Make files publicly accessible
                fileSizeLimit: 5242880,  // 5MB
                allowedMimeTypes: [
                    'image/jpeg',
                    'image/png',
                    'image/webp',
                    'application/pdf',
                ],
            });

            if (error) {
                this.logger.error(`Failed to create bucket: ${error.message}`);
            } else {
                this.logger.log(`Bucket "${this.bucketName}" created successfully`);
            }
        }
    }
}
