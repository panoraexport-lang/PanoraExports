import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export const ScreenshotProtection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSecure, setIsSecure] = useState(true);
    const [isPermanentlyBlocked, setIsPermanentlyBlocked] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Block PrintScreen with PERMANENT blackout until refresh
            if (e.key === 'PrintScreen' || e.keyCode === 44 || (e.ctrlKey && e.key === 'p')) {
                e.preventDefault();
                setIsPermanentlyBlocked(true);
                return;
            }

            if (
                (e.ctrlKey || e.metaKey) &&
                (['s', 'u', 'p', 'c', 'v'].includes(e.key.toLowerCase()))
            ) {
                e.preventDefault();
                setIsPermanentlyBlocked(true);
            }
        };

        const handleBlur = () => setIsSecure(false);
        const handleFocus = () => setIsSecure(true);
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                setIsSecure(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown, true);
        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('mouseleave', () => setIsSecure(false));
        document.addEventListener('mouseenter', () => setIsSecure(true));
        document.addEventListener('contextmenu', (e) => e.preventDefault());

        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <>
            <div className={`transition-none ${(!isSecure || isPermanentlyBlocked) ? 'hidden pointer-events-none' : 'block'}`}>
                {children}
            </div>

            <AnimatePresence>
                {(isPermanentlyBlocked || !isSecure) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10002] flex items-center justify-center bg-black"
                    >
                        <div className="text-center p-12 max-w-md">
                            <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-red-600/20">
                                <ShieldAlert className="w-12 h-12 text-red-600 animate-pulse" />
                            </div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-6 underline decoration-red-600 decoration-4">Security Lockdown</h2>
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed mb-8">
                                Unauthorized access or capture attempt detected. Access is restricted for data integrity.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-10 py-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all rounded-sm"
                            >
                                Reset Security Module
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media print {
                    body { display: none !important; }
                }
                * {
                    -webkit-user-select: none !important;
                    -moz-user-select: none !important;
                    -ms-user-select: none !important;
                    user-select: none !important;
                }
                img {
                    pointer-events: none !important;
                }
            `}</style>
        </>
    );
};
