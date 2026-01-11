import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Sustainability from './components/Sustainability';
import Rewards from './components/Rewards';
import SystemArchitecture from './components/SystemArchitecture';
import Partners from './components/Partners';
import LogisticsAnimation from './components/LogisticsAnimation';
import Footer from './components/Footer';

import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#0A0D14] relative overflow-hidden font-body selection:bg-primary selection:text-black">
            <Helmet>
                <title>NexLogica | Global Logistics Intelligence</title>
                <meta name="description" content="Industrial-grade logistics intelligence, blockchain persistence, and real-time AI optimization. Built for the future of global trade." />
            </Helmet>

            {/* Decorative Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-accent/10 blur-[100px] rounded-full animate-blob animation-delay-4000"></div>

                {/* Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
            </div>

            <Header />

            <main className="relative z-10">
                <Hero />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-0"
                >
                    <Features />
                    <Sustainability />
                    <Rewards />
                    <SystemArchitecture />
                    <Partners />
                    <LogisticsAnimation />
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
