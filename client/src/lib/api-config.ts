/**
 * API Configuration
 * Dynamically determines the backend URL based on the environment and current location
 */

const getApiBaseUrl = () => {
    const isClient = typeof window !== 'undefined';
    if (!isClient) return 'http://localhost:3001/api';

    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const envUrl = import.meta.env.VITE_API_URL;

    // Detect if we are on a "real" device (not localhost/127.0.0.1)
    const isRealDevice = hostname !== 'localhost' && hostname !== '127.0.0.1';
    const isIp = /^[0-9.]+$/.test(hostname); // mobile accessing via IP

    let detectedUrl = '';

    // 1. If we are on a mobile/other device and have an envUrl but it's "localhost",
    // we MUST ignore it because localhost will fail on a mobile device.
    if (isRealDevice && envUrl && envUrl.includes('localhost')) {
        // Fall through to dynamic detection
    } else if (envUrl) {
        // Use explicitly provided production/staging URL
        detectedUrl = envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
    }

    if (!detectedUrl) {
        // 2. Dynamic Detection for local network or domain-relative API
        if (isIp || hostname === 'localhost') {
            // Local network testing (e.g. http://192.168.1.5:3001/api)
            detectedUrl = `${protocol}//${hostname}:3001/api`;
        } else {
            // 3. True Production (real domain e.g. panora.vercel.app)
            // In production, we expect the API to be hosted on the same domain or proxied.
            // If the backend is NOT hosted, this will result in a 404 or connection error.
            detectedUrl = `${protocol}//${hostname}/api`;
        }
    }

    if (isRealDevice && !envUrl && !isIp) {
        console.warn('[API URL] You are on a production domain but VITE_API_URL is not set. The app will try to call the backend at:', detectedUrl);
    }
    return detectedUrl;
};

export const API_BASE_URL = getApiBaseUrl();
