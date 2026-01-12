import React, { useEffect, useState } from 'react';

interface ProtectedEmailProps {
    user: string;
    domain: string;
    className?: string;
    label?: string;
    children?: React.ReactNode;
}

export const ProtectedEmail: React.FC<ProtectedEmailProps> = ({ user, domain, className = "", label, children }) => {
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        // Reconstruct email on client-side
        setEmail(`${user}@${domain}`);
    }, [user, domain]);

    if (!email) {
        // Render a placeholder or nothing during SSR to prevent scraping
        if (children) {
            return <div className={className} onClick={(e) => e.preventDefault()}>{children}</div>;
        }
        return <span className={className}>Click to reveal</span>;
    }

    return (
        <a href={`mailto:${email}`} className={className}>
            {children || label || email}
        </a>
    );
};
