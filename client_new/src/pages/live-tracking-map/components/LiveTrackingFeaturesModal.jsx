import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const LiveTrackingFeaturesModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-surface border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-surface/95 backdrop-blur z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Icon name="Activity" size={24} className="text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Live Tracking Operational Intelligence</h2>
                                <p className="text-sm text-muted-foreground">NexLogica • Designed for India</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <Icon name="X" size={24} />
                        </button>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                        {/* Hero Vision */}
                        <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-xl border border-primary/20">
                            <p className="text-lg font-medium leading-relaxed">
                                "NexLogica enables logistics companies to move from reactive tracking to <span className="text-primary">predictive, transparent, and sustainable</span> fleet management."
                            </p>
                        </div>

                        {/* Key Features Grid */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Icon name="Search" size={20} className="text-primary" /> Key Features
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { title: "Real-Time Tracking", desc: "GPS-based live map view with sub-second updates.", icon: "MapPin" },
                                    { title: "Fleet Overview", desc: "Instant visibility of On-Route, Idle, and Maintenance vehicles.", icon: "Truck" },
                                    { title: "Smart Alerts", desc: "Geofence breaches & low fuel notifications.", icon: "Bell" },
                                    { title: "Driver Monitoring", desc: "Live status (Connected/Idle) & instant communication.", icon: "UserCheck" },
                                    { title: "Live Telemetry", desc: "Real-time speed, fuel levels, and dynamic ETA updates.", icon: "Gauge" },
                                    { title: "Dynamic Routing", desc: "AI-powered redirection for delay handling.", icon: "Navigation" }
                                ].map((feature, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <Icon name={feature.icon} size={20} className="mt-1 text-primary" />
                                            <div>
                                                <h4 className="font-semibold text-sm">{feature.title}</h4>
                                                <p className="text-sm text-gray-400 mt-1">{feature.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tech & Sustainability */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Icon name="Cpu" size={20} className="text-purple-400" /> Technology Highlights
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "React + Leaflet Maps for scalable visualization",
                                        "Integrated with AI Insights for route optimization",
                                        "Blockchain-ready for immutable audit trails",
                                        "Scalable architecture for Pan-India operations"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Icon name="Leaf" size={20} className="text-green-400" /> Sustainability Impact
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Fuel monitoring reduces wastage and emissions",
                                        "Smart routing lowers fleet carbon footprint",
                                        "Supports India’s green logistics vision 🇮🇳"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LiveTrackingFeaturesModal;
