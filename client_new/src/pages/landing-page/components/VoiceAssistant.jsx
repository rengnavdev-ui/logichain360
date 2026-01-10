import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const VoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [selectedLang, setSelectedLang] = useState('en');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'mr', name: 'मराठी' },
        { code: 'bn', name: 'বাংলা' },
        { code: 'ta', name: 'தமிழ்' }
    ];

    const commands = [
        { cmd: "Track my shipment", lang: "en" },
        { cmd: "शिपमेंट ट्रैक करें", lang: "hi" },
        { cmd: "कार्बन रिपोर्ट दाखवा", lang: "mr" },
        { cmd: "নতুন রুট খুঁজুন", lang: "bn" }
    ];

    return (
        <section id="voice-assistant" className="py-40 bg-[#0A0D14] relative overflow-hidden">
            {/* Background Decorative Blurs */}
            <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-accent/10 blur-[140px] rounded-full animate-blob"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/5 border border-accent/10">
                            <Icon name="Mic" className="w-4 h-4 text-accent" />
                            <span className="text-[10px] font-black text-accent uppercase tracking-[0.4em]">Proprietary NLP</span>
                        </div>

                        <h2 className="text-4xl md:text-h1 font-heading font-black text-white tracking-tighter uppercase leading-[0.9]">
                            Voice Assistant in <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-500">
                                regional languages
                            </span>
                        </h2>

                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-body max-w-xl">
                            Ask for shipment status, generate carbon reports, or find new routes in your preferred language.
                            Built for truly inclusive global coordination.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {languages.map(lang => (
                                <motion.button
                                    key={lang.code}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedLang(lang.code)}
                                    className={`px-8 py-4 rounded-2xl border text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${selectedLang === lang.code
                                        ? 'bg-accent text-white border-accent shadow-[0_20px_40px_rgba(255,107,53,0.3)]'
                                        : 'bg-white/5 border-white/5 text-gray-500 hover:border-accent/40 hover:text-white'
                                        }`}
                                >
                                    {lang.name}
                                </motion.button>
                            ))}
                        </div>

                        <div className="space-y-8 pt-8 border-t border-white/5">
                            <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">Sample Protocols:</p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {commands.filter(c => c.lang === selectedLang || selectedLang === 'en').slice(0, 4).map((c, i) => (
                                    <motion.div
                                        key={i + selectedLang}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-6 rounded-3xl bg-white/5 border border-white/5 text-base text-white/90 italic font-medium backdrop-blur-md"
                                    >
                                        "{c.cmd}"
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 flex justify-center perspective-[2000px]"
                    >
                        <div className="relative">
                            {/* Listening Pulsar Effects */}
                            <AnimatePresence>
                                {isListening && (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 2.2, opacity: 0.4 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="absolute inset-0 rounded-full bg-accent/20 blur-[80px]"
                                    ></motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                onClick={() => setIsListening(!isListening)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                className={`relative z-10 w-80 h-80 rounded-[4rem] flex flex-col items-center justify-center gap-8 transition-all duration-700 ${isListening
                                    ? 'bg-accent shadow-[0_40px_100px_rgba(255,107,53,0.4)] border-white/20'
                                    : 'bg-[#121829]/80 border-2 border-white/5 hover:border-accent/30 backdrop-blur-2xl'
                                    }`}
                            >
                                <div className="relative">
                                    <Icon name={isListening ? "Mic" : "MicOff"} className={`w-20 h-20 transition-all duration-500 ${isListening ? 'text-white scale-110' : 'text-accent'}`} />
                                    {isListening && (
                                        <div className="absolute -inset-12 border border-white/20 rounded-[5rem] animate-ping opacity-40"></div>
                                    )}
                                </div>
                                <span className={`text-[12px] font-black uppercase tracking-[0.4em] ${isListening ? 'text-white' : 'text-gray-500'}`}>
                                    {isListening ? 'System Online' : 'Activate Voice'}
                                </span>
                            </motion.button>

                            {/* Complex Audio Spectrum */}
                            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 h-16">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            height: isListening ? [10, 40, 20, 60, 10] : 4,
                                            opacity: isListening ? 1 : 0.2
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            repeat: Infinity,
                                            delay: i * 0.05,
                                            ease: "easeInOut"
                                        }}
                                        className="w-2 bg-gradient-to-t from-accent to-yellow-500 rounded-full"
                                    ></motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default VoiceAssistant;
