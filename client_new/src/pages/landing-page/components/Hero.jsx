import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section className="relative pt-48 pb-24 overflow-hidden bg-[#0A0D14]">
            {/* Advanced Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-primary/15 blur-[140px] rounded-full animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/15 blur-[140px] rounded-full animate-blob animation-delay-3000"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto text-center space-y-10"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl md:text-h1-hero font-heading font-black text-white tracking-tighter uppercase"
                    >
                        Build complete apps<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            by talking
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-body"
                    >
                        Describe what you want. Watch NexLogica assemble your shipments,
                        optimize your routes, and manage your fleet in seconds.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
                    >
                        <button
                            className="group relative px-10 py-5 bg-primary text-white font-black rounded-2xl transition-all hover:scale-105 shadow-[0_20px_60px_rgba(59,130,246,0.3)] overflow-hidden"
                            onClick={() => navigate('/authentication-signup')}
                        >
                            <span className="relative z-10 uppercase tracking-wider">Start building</span>
                        </button>
                        <button
                            className="px-10 py-5 rounded-2xl bg-[#121829] text-white border border-white/10 font-bold transition-all hover:bg-white/5 uppercase tracking-widest text-sm"
                            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            See features
                        </button>
                    </motion.div>

                    {/* Floating Video Preview Container */}
                    <motion.div
                        initial={{ y: 100, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="pt-24 relative"
                    >
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative mx-auto max-w-6xl aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-[#0B0F1A] group"
                        >
                            {/* Logistic Video Wrapper */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <video
                                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    poster="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
                                >
                                    <source src="https://assets.mixkit.co/videos/preview/mixkit-business-people-working-at-a-logistics-center-44165-large.mp4" type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-transparent"></div>

                                {/* Overlay Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-500">
                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-white font-black uppercase tracking-[0.3em] text-xs">Full Preview Enabled</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative Rings around Video */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none opacity-20"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full pointer-events-none opacity-10"></div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
