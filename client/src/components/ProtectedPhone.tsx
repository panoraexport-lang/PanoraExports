import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'wouter';

interface ProtectedPhoneProps {
    phone: string;
    className?: string;
    children?: (maskedPhone: string, isProtected: boolean) => React.ReactNode;
}

export const ProtectedPhone: React.FC<ProtectedPhoneProps> = ({ phone, className = "", children }) => {
    const { user } = useAuth();
    
    // Simple logic to mask the last 3 digits
    const maskPhone = (num: string) => {
        const cleanNum = num.trim();
        if (cleanNum.length < 3) return num;
        return cleanNum.slice(0, -3) + 'XXX';
    };

    const isProtected = !user;
    const displayedPhone = isProtected ? maskPhone(phone) : phone;

    if (children) {
        return <>{children(displayedPhone, isProtected)}</>;
    }

    if (isProtected) {
        return (
            <Link href="/auth">
                <span className={`${className} cursor-pointer hover:text-secondary transition-colors`} title="Login to view full number">
                    {displayedPhone}
                </span>
            </Link>
        );
    }

    return (
        <a href={`tel:${phone.replace(/\s+/g, '')}`} className={className}>
            {displayedPhone}
        </a>
    );
};
