
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../client/public');

if (!fs.existsSync(directoryPath)) {
    console.error(`Directory not found: ${directoryPath}`);
    process.exit(1);
}

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach((file) => {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            const filePath = path.join(directoryPath, file);
            const fileName = path.basename(file, ext);
            const webpPath = path.join(directoryPath, `${fileName}.webp`);

            // Check if webp already exists (skip if desired, but here we overwrite/create)
            sharp(filePath)
                .resize({ width: 1920, withoutEnlargement: true })
                .toFormat('webp', { quality: 80 })
                .toFile(webpPath)
                .then(info => {
                    console.log(`Optimized: ${file} -> ${fileName}.webp (${info.size} bytes)`);
                })
                .catch(err => {
                    console.error(`Error processing ${file}:`, err);
                });
        }
    });
});
