import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const Sustainability = () => {
    return (
        <section id="sustainability" className="py-24 relative bg-[#0A0D14]">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-h1 font-heading font-black text-white tracking-tighter uppercase">
                        Sustainability & Carbon Emission Tracking
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 font-body">
                        Real-time visibility into CO₂ impact with ESG badges and green route suggestions.
                    </p>
                </div>

                {/* Stat Cards Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: 'CO₂ saved per shipment', value: '32%', color: 'text-primary' },
                        { label: 'ESG compliance score', value: 'A+', color: 'text-primary' },
                        { label: 'Green routes suggested', value: '12 this week', color: 'text-primary' }
                    ].map((stat, i) => (
                        <div key={i} className="p-8 rounded-[2rem] bg-[#0F1420]/50 border border-white/5 space-y-2">
                            <p className="text-xs font-heading font-bold text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
                            <h4 className={`text-4xl font-heading font-black ${stat.color}`}>{stat.value}</h4>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center rounded-[3rem] bg-[#0F1420]/30 border border-white/5 p-8 md:p-16 overflow-hidden relative">
                    <div className="space-y-10 z-10">
                        <p className="text-xl text-gray-300 leading-relaxed font-body max-w-md">
                            Our AI suggests greener lanes based on distance, mode mix, and fuel profile.
                            Track your footprint and share progress with stakeholders.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A2521] border border-primary/20">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-xs font-heading font-black text-primary uppercase tracking-[0.2em]">ESG Compliant</span>
                            </div>
                            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/10 border border-secondary/20">
                                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                                <span className="text-xs font-heading font-black text-secondary uppercase tracking-[0.2em]">Carbon Offset Ready</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[300px] md:h-[450px] rounded-[2.5rem] overflow-hidden bg-[#0A0D14] border border-white/10 flex items-center justify-center group">
                        <div className="text-center space-y-4">
                            <h4 className="text-gray-500 font-heading font-bold uppercase tracking-[0.3em] text-xs">Carbon dashboard preview</h4>
                            <p className="text-primary text-[10px] font-heading font-black tracking-[0.4em] uppercase">Interactive charts in the full product</p>
                        </div>

                        {/* Interactive Sparklines Mockup */}
                        <div className="absolute inset-x-8 bottom-12 flex items-end gap-1.5 h-32 opacity-20">
                            {[40, 70, 45, 90, 65, 85, 50, 75, 55, 95, 60, 80].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 1 }}
                                    className="flex-grow bg-primary rounded-t-md"
                                ></motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sustainability;
