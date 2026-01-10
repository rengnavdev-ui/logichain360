import { motion } from 'framer-motion';

const LogisticsAnimation = () => {
    const modes = [
        { name: 'Air', color: 'bg-primary', progress: 35, delay: 0.1 },
        { name: 'Sea', color: 'bg-primary', progress: 65, delay: 0.2 },
        { name: 'Rail', color: 'bg-secondary', progress: 85, delay: 0.3 },
        { name: 'Road', color: 'bg-secondary', progress: 55, delay: 0.4 }
    ];

    return (
        <section className="py-24 bg-[#0A0D14] relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[3rem] bg-[#121829]/50 border border-white/5 p-12 md:p-20 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full"></div>

                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8 relative z-10">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter">
                                Global Flux <br />
                                <span className="text-gray-500 lowercase">visualization</span>
                            </h2>
                        </div>
                        <span className="text-[11px] font-black text-primary uppercase tracking-[0.4em] mb-2">Modes flowing across lanes</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {modes.map((mode, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-10 rounded-3xl bg-[#0A0D14]/80 border border-white/5 space-y-8 backdrop-blur-xl group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${mode.color} shadow-[0_0_15px_rgba(59,130,246,0.5)]`}></div>
                                    <span className="text-2xl font-heading font-bold text-white uppercase tracking-tight">{mode.name}</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${mode.progress}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: mode.delay, ease: [0.16, 1, 0.3, 1] }}
                                        className={`h-full ${mode.color} rounded-full relative`}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LogisticsAnimation;
