import React from 'react';
import { Shield } from 'lucide-react';

interface SecureDocumentProps {
    src: string;
    alt: string;
    className?: string;
    watermarkText?: string;
}

export const SecureDocument: React.FC<SecureDocumentProps> = ({
    src,
    alt,
    className = "",
    watermarkText = "PANORA EXPORTS - OFFICIAL DOCUMENT"
}) => {
    return (
        <div className={`relative group overflow-hidden bg-white rounded-lg shadow-2xl border border-border select-none ${className}`}>
            {/* Background patterns to make it harder to clean up screenshots */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            <img
                src={src}
                alt={alt}
                className="w-full h-auto grayscale-[0.1] contrast-[1.05] brightness-[0.98] pointer-events-none"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ WebkitUserSelect: 'none' } as any}
            />

            {/* Static Watermark Overlays */}
            <div className="absolute inset-0 z-10 grid grid-cols-2 grid-rows-3 pointer-events-none opacity-20">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center justify-center rotate-[-25deg]">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 whitespace-nowrap">
                            {watermarkText}
                        </span>
                    </div>
                ))}
            </div>

            {/* Protective Overlay */}
            <div className="absolute inset-0 z-20 bg-primary/0 pointer-events-none" />

            {/* Secure Badge */}
            <div className="absolute top-4 right-4 z-30">
                <div className="bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-secondary/30 flex items-center gap-2">
                    <Shield className="w-3 h-3 text-secondary" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Authorized Copy</span>
                </div>
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/5 py-1 px-4 z-30 flex justify-between items-center">
                <span className="text-[7px] font-black uppercase tracking-widest text-black/30">License Verification Active</span>
                <span className="text-[7px] font-black uppercase tracking-widest text-black/30">© 2025 Panora</span>
            </div>
        </div>
    );
};
