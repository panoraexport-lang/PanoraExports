import { User } from './supabase';

// Admin credentials
const ADMIN_EMAIL = 'Panoraexport@admin.com';
const ADMIN_PASSWORD = 'RishabhPanora@2025';

/**
 * Check if a user has admin privileges
 */
export function isAdmin(user: User | null): boolean {
    if (!user) return false;

    // Check if user has ADMIN role
    if (user.role === 'ADMIN') return true;

    // Also check if user email matches admin email
    if (user.email === ADMIN_EMAIL) return true;

    return false;
}

/**
 * Check if login credentials are admin credentials
 */
export function isAdminCredentials(email: string, password: string): boolean {
    return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

/**
 * Get admin credentials for reference
 */
export function getAdminCredentials() {
    return {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
    };
}
