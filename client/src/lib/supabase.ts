import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isConfigured = !!(supabaseUrl && supabaseAnonKey &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseAnonKey.includes('placeholder'));

if (!isConfigured) {
    console.warn('⚠️ Supabase URL or Anon Key is missing. Check your .env file.');
}

// Create a mock client if not configured to prevent crashes
export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
            storage: window.localStorage,
        },
    })
    : createClient('https://placeholder.supabase.co', 'placeholder-key', {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });

// Database types
export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    country: string;
    role: UserRole;
    company_name?: string;
    registration_id?: string;
    verification_status: VerificationStatus;
    verification_documents?: string[];
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    user: User | null;
    session: any;
    error: Error | null;
}
