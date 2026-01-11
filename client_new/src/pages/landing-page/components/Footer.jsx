import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0A0D14] pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto mb-32 rounded-[3.5rem] bg-gradient-to-br from-[#121829] to-[#0A0D14] border border-white/5 p-16 md:p-24 text-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10 space-y-10">
                        <h2 className="text-4xl md:text-h2 font-heading font-black text-white tracking-tighter leading-tight max-w-3xl mx-auto uppercase">
                            Ready to turn <br />
                            <span className="text-primary italic">ideas into apps?</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 font-body max-w-xl mx-auto leading-relaxed">
                            No setup required, try it today.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                            <Link to="/authentication-signup" className="px-12 py-6 bg-primary text-white font-black rounded-2xl hover:scale-105 transition-all text-lg shadow-[0_20px_60px_rgba(59,130,246,0.3)] uppercase tracking-wider">
                                Start building
                            </Link>
                        </div>
                        <p className="text-[12px] font-black text-gray-600 uppercase tracking-[0.4em] pt-8">
                            Free forever for small projects • Live preview included
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center gap-3">
                            <span className="text-2xl font-heading font-black text-white tracking-tighter uppercase">NexLogica</span>
                        </Link>
                        <p className="text-gray-500 leading-relaxed font-body text-[16px]">
                            Industrial-grade logistics intelligence,
                            blockchain persistence, and real-time
                            AI optimization.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-10">Products</h4>
                        <ul className="space-y-6">
                            {['AI Insights', 'Blockchain', 'Tracking'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 hover:text-white transition-colors text-[15px] font-body font-bold">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-10">Company</h4>
                        <ul className="space-y-6">
                            {['About', 'Careers', 'Contact'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 hover:text-white transition-colors text-[15px] font-body font-bold">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-10">Social</h4>
                        <div className="flex flex-col space-y-6">
                            {['Twitter', 'LinkedIn', 'Github'].map((social) => (
                                <a key={social} href="#" className="text-gray-500 hover:text-white transition-colors text-[15px] font-body font-bold">{social}</a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[13px] text-gray-600 font-bold uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} NexLogica. All rights reserved.</p>
                    <div className="flex items-center gap-10">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
