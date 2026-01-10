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

    const [simulatedRole, setSimulatedRole] = useState(localStorage.getItem('userRole') || 'visitor');

    const handleRoleSimulation = (role) => {
        setSimulatedRole(role);
        if (role === 'visitor') {
            localStorage.removeItem('userRole');
            localStorage.removeItem('authToken');
        } else {
            localStorage.setItem('userRole', role);
            localStorage.setItem('authToken', `simulated-token-${role}`);
        }
    };

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How it works', href: '#how-it-works' },
        { name: 'Get started', href: '#get-started' }
    ];

    const getDashboardPath = () => {
        const paths = {
            admin: '/admin-dashboard',
            manager: '/manager-dashboard',
            driver: '/driver-pwa-app'
        };
        return paths[simulatedRole] || '/authentication-login';
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled ? 'bg-[#0B0F1A]/70 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.3)] group-hover:rotate-12 transition-transform duration-500">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-heading font-black text-white tracking-tighter uppercase whitespace-nowrap">LogiChain360</span>
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
                    {/* Role Simulator - Styled Subtly */}
                    <div className="hidden xl:block">
                        <select
                            value={simulatedRole}
                            onChange={(e) => handleRoleSimulation(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-full px-5 py-2 text-[10px] font-black text-gray-500 uppercase tracking-widest outline-none focus:border-primary/50 transition-colors cursor-pointer backdrop-blur-md"
                        >
                            <option value="visitor" className="bg-[#0B0F1A]">Visitor</option>
                            <option value="driver" className="bg-[#0B0F1A]">Driver</option>
                            <option value="manager" className="bg-[#0B0F1A]">Manager</option>
                            <option value="admin" className="bg-[#0B0F1A]">Admin</option>
                        </select>
                    </div>

                    <button
                        className="text-[11px] font-black text-gray-400 hover:text-white uppercase tracking-[0.2em] transition-colors"
                        onClick={() => navigate(simulatedRole === 'visitor' ? '/authentication-login' : getDashboardPath())}
                    >
                        {simulatedRole === 'visitor' ? 'Sign in' : 'Dashboard'}
                    </button>

                    {simulatedRole === 'visitor' && (
                        <button
                            className="px-6 py-3 bg-primary text-white font-heading font-black rounded-xl text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
                            onClick={() => navigate('/authentication-signup')}
                        >
                            Start building
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
