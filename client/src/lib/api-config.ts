/**
 * API Configuration
 * Dynamically determines the backend URL based on the environment and current location
 */

const getApiBaseUrl = () => {
    const isClient = typeof window !== 'undefined';
    const envUrl = import.meta.env.VITE_API_URL;
    const hostname = isClient ? window.location.hostname : 'localhost';
    const protocol = isClient ? window.location.protocol : 'http:';

    // 1. If env var is set AND it's not pointing to localhost while we are on a real device
    // This prevents hardcoded 'localhost' in .env from breaking mobile/production access
    if (envUrl && (!envUrl.includes('localhost') || hostname === 'localhost')) {
        return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
    }

    // 2. Dynamic Fallback: Use current hostname with port 3001
    // This is the most reliable for local network (mobile) and production subdomains
    if (isClient) {
        return `${protocol}//${hostname}:3001/api`;
    }

    // 3. SSR fallback
    return 'http://localhost:3001/api';
};

export const API_BASE_URL = getApiBaseUrl();
