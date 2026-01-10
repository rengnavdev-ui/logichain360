import React from 'react';
import Icon from '../../../components/AppIcon';

import { motion } from 'framer-motion';

const Partners = () => {
    const categories = [
        { name: 'ERP Integration', icon: 'Database', color: 'bg-blue-500' },
        { name: 'WMS Connectivity', icon: 'Layers', color: 'bg-emerald-500' },
        { name: 'TMS Optimization', icon: 'Zap', color: 'bg-amber-500' },
        { name: 'Global Tracking', icon: 'Globe', color: 'bg-purple-500' },
        { name: 'Finance & Payments', icon: 'CreditCard', color: 'bg-rose-500' },
        { name: 'Industrial Security', icon: 'Shield', color: 'bg-cyan-500' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <section id="partners" className="py-32 bg-[#0A0D14] border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-h1 font-heading font-black text-white tracking-tighter uppercase"
                    >
                        Partner Ecosystem & Marketplace
                    </motion.h2>
                    <p className="text-lg md:text-xl text-gray-400 font-body max-w-2xl mx-auto">
                        Connect your existing tools to our intelligent logistics network.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                >
                    {categories.map((category, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="group p-10 rounded-[2rem] bg-[#121829]/50 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col items-center gap-8 backdrop-blur-md"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${category.color} bg-opacity-20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                                <Icon name={category.icon} className={`w-7 h-7 ${category.color === 'bg-blue-500' ? 'text-blue-500' : category.color === 'bg-emerald-500' ? 'text-emerald-500' : category.color === 'bg-amber-500' ? 'text-amber-500' : category.color === 'bg-purple-500' ? 'text-purple-500' : category.color === 'bg-rose-500' ? 'text-rose-500' : 'text-cyan-500'}`} />
                            </div>
                            <span className="text-[11px] font-heading font-black text-gray-400 group-hover:text-white uppercase tracking-[0.2em] transition-colors text-center">{category.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Partners;
