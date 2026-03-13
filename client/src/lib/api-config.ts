/**
 * API Configuration
 * Dynamically determines the backend URL based on the environment and current location
 */

const getApiBaseUrl = () => {
    // 1. Check if VITE_API_URL environment variable is set
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL.endsWith('/api') 
            ? import.meta.env.VITE_API_URL 
            : `${import.meta.env.VITE_API_URL}/api`;
    }

    // 2. Fallback: Use current hostname with port 3001
    // Using window.location.hostname allows access from any device in the same network
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        return `${protocol}//${hostname}:3001/api`;
    }

    // 3. Last resort fallback
    return 'http://localhost:3001/api';
};

export const API_BASE_URL = getApiBaseUrl();
