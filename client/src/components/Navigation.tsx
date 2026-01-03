import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, LogOut, User as UserIcon, Terminal, ShieldCheck } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLocation, Link } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/lib/rbac';
import { cn } from '@/lib/utils';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const [location, setLocation] = useLocation();
    const { user, logout } = useAuth();
    const userIsAdmin = isAdmin(user);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Products', href: '/products' },
        { label: 'Categories', href: '/categories' },
        { label: 'Verification', href: '/verification' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Contact', href: '/contact' },
        { label: 'About', href: '/about' },
    ];

    return (
        <nav 
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled 
                    ? "bg-background/95 backdrop-blur-md border-border py-4" 
                    : "bg-background/40 backdrop-blur-sm border-transparent py-5 hover:bg-background/90 hover:backdrop-blur-md hover:border-border"
            )}
        >
            <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
                {/* Branding - Left */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground font-black text-[10px] tracking-tighter">PE</span>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex items-baseline gap-1.5">
                            <span className="font-bold text-lg tracking-tight text-foreground">
                                PANORA
                            </span>
                            <span className="font-serif italic text-foreground text-base font-light">
                                exports
                            </span>
                        </div>
                        <span className="text-[7px] text-muted-foreground uppercase tracking-[0.3em] font-bold leading-none mt-1">
                            Global Exports
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden xl:flex items-center gap-14">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-[9px] tracking-[0.2em] uppercase font-bold transition-all duration-300 relative py-1",
                                location === item.href
                                    ? "text-foreground"
                                    : "text-muted-foreground/70 hover:text-foreground"
                            )}
                        >
                            {item.label}
                            {location === item.href && (
                                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {/* Admin Dashboard Button */}
                    {userIsAdmin && (
                        <Link
                            href="/admin"
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary border border-transparent hover:border-border transition-all rounded-sm group"
                        >
                            <ShieldCheck className="w-3 h-3 text-secondary-foreground opacity-70 group-hover:opacity-100" />
                            <span className="text-[9px] text-secondary-foreground uppercase tracking-[0.2em] font-bold transition-colors">Dashboard</span>
                        </Link>
                    )}

                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="w-8 h-8 items-center justify-center text-muted-foreground hover:text-primary transition-colors flex"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                        </button>
                    )}

                    {/* User Profile */}
                    {user ? (
                        <div className="hidden md:flex items-center gap-3">
                            <div className="flex items-center bg-secondary rounded-sm p-1 pr-3 gap-2 border border-transparent">
                                <div className="w-6 h-6 bg-background rounded-sm flex items-center justify-center border border-border">
                                    <UserIcon className="w-3 h-3 text-muted-foreground" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-secondary-foreground tracking-tight">{user.name}</span>
                                    {user.verification_status === 'VERIFIED' && (
                                        <div className="bg-primary/10 px-1.5 py-0.5 rounded-sm border border-primary/20">
                                            <span className="text-[7px] font-black text-primary uppercase tracking-widest leading-none">Verified</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={async () => {
                                    await logout();
                                    setLocation('/');
                                }}
                                className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/auth/login"
                            className="hidden md:flex items-center gap-2 text-[9px] font-bold text-primary-foreground tracking-[0.2em] bg-primary px-5 py-2 hover:opacity-90 transition-all rounded-sm uppercase"
                        >
                            Login
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="xl:hidden text-primary p-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="xl:hidden bg-background h-[calc(100vh-88px)] overflow-y-auto">
                    <div className="flex flex-col p-8 gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-2xl uppercase tracking-[0.2em] font-black text-muted-foreground hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}

                        {userIsAdmin && (
                            <Link
                                href="/admin"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm uppercase tracking-[0.3em] font-black text-primary"
                            >
                                Admin Terminal ⚡
                            </Link>
                        )}

                        <div className="h-[1px] bg-primary/10 my-4" />

                        {user ? (
                            <button
                                onClick={async () => {
                                    await logout();
                                    setIsMenuOpen(false);
                                    setLocation('/');
                                }}
                                className="flex items-center gap-3 text-primary"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="text-sm uppercase tracking-[0.2em] font-black">Logout</span>
                            </button>
                        ) : (
                            <Link
                                href="/auth/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm uppercase tracking-[0.2em] font-black text-primary-foreground bg-primary p-5 text-center rounded-sm"
                            >
                                Access Account
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
