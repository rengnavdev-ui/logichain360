import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, AlertTriangle, Truck, Zap } from 'lucide-react';
import Button from '../../components/ui/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DemandSurgePage = () => {
    const navigate = useNavigate();

    const forecastData = [
        { day: 'Mon', historical: 4000, predicted: 4200, confidence: [3800, 4600] },
        { day: 'Tue', historical: 3800, predicted: 4500, confidence: [4100, 4900] },
        { day: 'Wed', historical: 4200, predicted: 5100, confidence: [4700, 5500] },
        { day: 'Thu', historical: 4100, predicted: 5800, confidence: [5400, 6200] },
        { day: 'Fri', historical: 4500, predicted: 6400, confidence: [6000, 6800] },
        { day: 'Sat', historical: 4800, predicted: 7200, confidence: [6800, 7600] },
        { day: 'Sun', historical: 4300, predicted: 6900, confidence: [6500, 7300] },
    ];

    return (
        <div className="min-h-screen bg-background p-6">
            <Helmet>
                <title>Demand Surge Analysis - NexLogica</title>
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">Mumbai–Delhi Demand Surge</h1>
                            <span className="bg-red-500/10 text-red-500 text-xs px-2 py-1 rounded-full font-medium border border-red-500/20">High Priority</span>
                            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium border border-primary/20">AI Confidence: 92%</span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">Prediction Window: Next 7 Days • Updated: Just now</p>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">Volume Increase</span>
                        </div>
                        <div className="text-2xl font-bold text-primary">+28%</div>
                        <div className="text-xs text-muted-foreground">vs 30-day average</div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Zap className="w-4 h-4" />
                            <span className="text-sm">Expected Shipments</span>
                        </div>
                        <div className="text-2xl font-bold">1,240 → 1,587</div>
                        <div className="text-xs text-muted-foreground">Daily Avg Shift</div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Truck className="w-4 h-4" />
                            <span className="text-sm">Capacity Gap</span>
                        </div>
                        <div className="text-2xl font-bold text-red-500">-15 Vehicles</div>
                        <div className="text-xs text-muted-foreground">Shortfall projected</div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm">Risk Score</span>
                        </div>
                        <div className="text-2xl font-bold text-orange-500">High</div>
                        <div className="text-xs text-muted-foreground">SLA Breach Probable</div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Charts Section */}
                    <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-6">Demand Forecast Curve</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={forecastData}>
                                    <defs>
                                        <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                                    <YAxis stroke="var(--color-muted-foreground)" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                                    />
                                    <Area type="monotone" dataKey="historical" stroke="var(--color-muted-foreground)" fill="transparent" strokeDasharray="5 5" name="Historical" />
                                    <Area type="monotone" dataKey="predicted" stroke="var(--color-primary)" fill="url(#colorPredicted)" name="Predicted" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* AI Explanation & Actions */}
                    <div className="space-y-6">
                        {/* AI Explanation */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-500" />
                                AI Analysis
                            </h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-muted/50 rounded-lg">
                                    <h4 className="font-medium text-sm mb-1">Why this surge?</h4>
                                    <p className="text-sm text-muted-foreground">Detected correlation with upcoming Diwali festival stocking patterns in retail sector. Booking velocity increased 40% in last 48h.</p>
                                </div>
                                <div className="p-3 bg-muted/50 rounded-lg">
                                    <h4 className="font-medium text-sm mb-1">External Signals</h4>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="text-xs border border-border px-2 py-1 rounded bg-background">🎉 Festival Season</span>
                                        <span className="text-xs border border-border px-2 py-1 rounded bg-background">📉 Fuel Price Drop</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Actions */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">Recommended Actions</h3>
                            <div className="space-y-3">
                                <Button className="w-full justify-start" variant="default">
                                    Allocate Fleet (+15 Vehicles)
                                </Button>
                                <Button className="w-full justify-start" variant="secondary">
                                    Simulate Capacity Scenarios
                                </Button>
                                <Button className="w-full justify-start" variant="outline">
                                    Notify Ops Team
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Simulation */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Risk & What-If Simulation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border border-border rounded-lg bg-red-500/5">
                            <h4 className="font-medium mb-2 text-red-500">If No Action Taken</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex justify-between"><span>SLA Breach</span> <span className="font-bold">45%</span></li>
                                <li className="flex justify-between"><span>Lost Revenue</span> <span className="font-bold">₹2.4L</span></li>
                                <li className="flex justify-between"><span>Customer Churn Risk</span> <span className="font-bold">High</span></li>
                            </ul>
                        </div>
                        <div className="p-4 border border-border rounded-lg bg-green-500/5">
                            <h4 className="font-medium mb-2 text-green-500">With Recommended Allocation</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex justify-between"><span>SLA Breach</span> <span className="font-bold">2%</span></li>
                                <li className="flex justify-between"><span>Revenue Upside</span> <span className="font-bold">+₹5.1L</span></li>
                                <li className="flex justify-between"><span>Asset Utilization</span> <span className="font-bold">94%</span></li>
                            </ul>
                        </div>
                        <div className="p-4 border border-border rounded-lg bg-blue-500/5">
                            <h4 className="font-medium mb-2 text-blue-500">Conservative Plan</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex justify-between"><span>SLA Breach</span> <span className="font-bold">12%</span></li>
                                <li className="flex justify-between"><span>Revenue Upside</span> <span className="font-bold">+₹3.2L</span></li>
                                <li className="flex justify-between"><span>Asset Utilization</span> <span className="font-bold">98%</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemandSurgePage;
