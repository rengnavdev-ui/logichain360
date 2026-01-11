import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const Header = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How it works', href: '#how-it-works' },
        { name: 'Get started', href: '#get-started' }
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled ? 'bg-[#0B0F1A]/70 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 overflow-hidden">
                        <img src="/logo.png" alt="NexLogica" className="w-full h-full object-cover p-1" />
                    </div>
                    <span className="text-xl font-heading font-black text-white tracking-tighter uppercase whitespace-nowrap">NexLogica</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[11px] font-heading font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-[0.15em]"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-8">
                    <button
                        className="text-[11px] font-black text-gray-400 hover:text-white uppercase tracking-[0.2em] transition-colors"
                        onClick={() => navigate('/authentication-login')}
                    >
                        Sign in
                    </button>

                    <button
                        className="px-6 py-3 bg-primary text-white font-heading font-black rounded-xl text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
                        onClick={() => navigate('/authentication-signup')}
                    >
                        Start building
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
