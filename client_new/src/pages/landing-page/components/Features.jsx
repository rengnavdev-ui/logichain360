import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const Features = () => {
    const features = [
        {
            title: 'Backend-first flow',
            description: 'Auto-generate secure APIs with validation and persistence.',
            icon: 'Layers',
            color: 'from-blue-500/20 to-cyan-500/20'
        },
        {
            title: 'Beautiful UI',
            description: 'Tailwind-powered components with modern motion and polish.',
            icon: 'Layout',
            color: 'from-violet-500/20 to-purple-500/20'
        },
        {
            title: 'Live preview',
            description: 'See every change instantly. Iterate fast with confidence.',
            icon: 'Eye',
            color: 'from-emerald-500/20 to-teal-500/20'
        },
        {
            title: 'Database ready',
            description: 'Mongo persistence out of the box for anything that needs storage.',
            icon: 'Database',
            color: 'from-orange-500/20 to-amber-500/20'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    return (
        <section id="features" className="py-32 relative overflow-hidden bg-[#0A0D14]">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-h1 font-heading font-black text-white tracking-tighter uppercase"
                    >
                        Everything you need to ship
                    </motion.h2>
                    <p className="text-lg md:text-xl text-gray-400 font-body max-w-2xl mx-auto">
                        From idea to live app in minutes, not weeks.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group p-10 rounded-[2.5rem] bg-[#0F1420]/30 border border-white/5 hover:border-primary/20 transition-all duration-500 relative overflow-hidden flex flex-col items-start"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-primary/50 transition-colors duration-500">
                                    <Icon name={feature.icon} className="w-7 h-7 text-white group-hover:text-primary transition-colors" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-body">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
