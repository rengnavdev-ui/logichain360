import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SystemArchitecture = () => {
    const modules = [
        {
            title: 'AI Engine',
            desc: 'Powerful deep learning models for multi-stop route planning and predictive analytics.',
            tech: 'Python AI',
            icon: 'Brain'
        },
        {
            title: 'Blockchain Layer',
            desc: 'Immutable record persistence and automated smart contract execution on Polygon.',
            tech: 'Solidity Layer',
            icon: 'Shield'
        },
        {
            title: 'Wallet',
            desc: 'Secure digital asset management for tokenized rewards and logistics payments.',
            tech: 'Web3 Wallet',
            icon: 'Wallet'
        },
        {
            title: 'API Gateway',
            desc: 'Low-latency event-driven architecture for real-time global network updates.',
            tech: 'Node.js Edge',
            icon: 'Server'
        }
    ];

    return (
        <section id="architecture" className="py-24 bg-[#0A0D14] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-h1 font-heading font-black text-white tracking-tighter uppercase">
                        Interactive System Architecture
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 font-body">
                        Explore the core layers of our industrial-grade logistics intelligence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {modules.map((module, i) => (
                        <div key={i} className="group p-8 rounded-[2rem] bg-[#0F1420]/50 border border-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                                <Icon name={module.icon} className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-white mb-2 tracking-tight">{module.title}</h3>
                            <p className="text-primary text-[10px] font-heading font-black uppercase tracking-[0.3em] mb-4">{module.tech}</p>
                            <p className="text-gray-400 leading-relaxed font-body text-[14px]">
                                {module.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Technical Visualization Placeholder */}
                <div className="mt-20 relative h-[400px] rounded-3xl overflow-hidden bg-[#0A0D14] border border-white/5 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4F95FF,transparent_70%)]"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <div className="flex -space-x-4">
                            {['Node', 'Python', 'Solidity', 'Polygon'].map((t, i) => (
                                <div key={i} className="w-20 h-20 rounded-2xl bg-[#0F1420] border-2 border-white/10 flex items-center justify-center shadow-2xl">
                                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">{t}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Full Stack Enterprise Persistence</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SystemArchitecture;
