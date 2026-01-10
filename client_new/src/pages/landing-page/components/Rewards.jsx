import React from 'react';
import Icon from '../../../components/AppIcon';

const Rewards = () => {
    return (
        <section id="rewards" className="py-24 bg-[#0A0D14] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-h1 font-heading font-black text-white tracking-tighter uppercase">
                        Earn-as-you-Explore (Polygon)
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 font-body max-w-2xl mx-auto leading-relaxed">
                        Get tokens for searches, tracking, and analytics.
                        Redeem for discounts, upgrades, or partner services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Search & Track',
                            desc: 'Earn tokens by using logistics search and shipment tracking.',
                            icon: 'GraduationCap'
                        },
                        {
                            title: 'Analyze & Optimize',
                            desc: 'Rewards for diving into analytics and route optimization.',
                            icon: 'GraduationCap'
                        },
                        {
                            title: 'Redeem & Save',
                            desc: 'Use tokens for premium features or partner marketplace benefits.',
                            icon: 'GraduationCap'
                        }
                    ].map((card, i) => (
                        <div key={i} className="group p-10 rounded-[2rem] bg-[#0F1420]/50 border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col items-start">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                                <Icon name={card.icon} className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-white mb-4 tracking-tight">{card.title}</h3>
                            <p className="text-gray-400 leading-relaxed font-body text-[16px]">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rewards;
