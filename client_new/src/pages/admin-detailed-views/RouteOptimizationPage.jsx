import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Map, Navigation, Fuel, Clock, Leaf } from 'lucide-react';
import Button from '../../components/ui/Button';

const RouteOptimizationPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background p-6">
            <Helmet>
                <title>Route Optimization - NexLogica</title>
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">Mumbai → Delhi Route Optimization</h1>
                            <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded-full font-medium border border-yellow-500/20">Medium Priority</span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">Suggested via NH48 • Weekly Savings Projection: ₹12,500</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Stats & Comparison */}
                    <div className="space-y-6">
                        {/* Comparison Table */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">Route Comparison</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border text-left text-muted-foreground">
                                            <th className="py-2 font-medium">Metric</th>
                                            <th className="py-2 font-medium">Current Route</th>
                                            <th className="py-2 font-medium text-primary">AI Suggested</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        <tr>
                                            <td className="py-3 flex items-center gap-2"><Navigation className="w-4 h-4 text-muted-foreground" /> Distance</td>
                                            <td className="py-3">1,415 km</td>
                                            <td className="py-3 font-medium text-green-500">1,390 km</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> Avg Time</td>
                                            <td className="py-3">24h 10m</td>
                                            <td className="py-3 font-medium text-green-500">23h 25m</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 flex items-center gap-2"><Fuel className="w-4 h-4 text-muted-foreground" /> Fuel Cost</td>
                                            <td className="py-3">₹45,200</td>
                                            <td className="py-3 font-medium text-green-500">₹42,800</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 flex items-center gap-2"><Leaf className="w-4 h-4 text-muted-foreground" /> CO2</td>
                                            <td className="py-3">350 kg</td>
                                            <td className="py-3 font-medium text-green-500">310 kg</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* AI Reasoning */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">AI Reasoning</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span> Traffic pattern analysis shows consistent 45min delay on current route near Vadodara.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span> Newer NH48 section opened last week, offering better road quality (lower maintenance risk).
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary">•</span> Fuel stops on AI route have 2% lower average diesel prices.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Map & Actions */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Map Placeholder */}
                        <div className="bg-muted/30 border border-border rounded-xl h-[400px] flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/77.2090,28.6139,5,0,0/800x600?access_token=Pk.eyJ1IjoiZGVtb2JvdCIsImEiOiJjazJ5bmtqY3AwMDJmM2Ntdm15Z2Z5bGJpIn0.IBj_KkGgaG6_jC3gT5q6Zw')" }}></div>
                            <div className="z-10 text-center p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-border shadow-lg">
                                <Map className="w-12 h-12 text-primary mx-auto mb-3" />
                                <h3 className="font-semibold text-lg">Interactive Route Map</h3>
                                <p className="text-sm text-muted-foreground mb-4">Visualizing current vs suggested route...</p>
                                <Button variant="outline" size="sm">Enable Live Traffic Integration</Button>
                            </div>
                        </div>

                        {/* Savings Breakdown & Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-4">Projected Savings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1"><span>Fuel Savings</span> <span className="font-bold">₹2,400</span></div>
                                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[70%]" /></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1"><span>Time Saved</span> <span className="font-bold">45 mins</span></div>
                                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[40%]" /></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1"><span>CO2 Reduction</span> <span className="font-bold">40kg</span></div>
                                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-teal-500 w-[55%]" /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-center space-y-3">
                                <h3 className="text-lg font-semibold mb-2">Actions</h3>
                                <Button className="w-full" variant="default">Apply Route to Fleet</Button>
                                <Button className="w-full" variant="secondary">Test on Selected Shipments</Button>
                                <Button className="w-full" variant="outline">Schedule Route Review</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RouteOptimizationPage;
