import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Zap, TrendingUp, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DriverIntelligencePage = () => {
    const navigate = useNavigate();

    const driverData = [
        { name: 'Top 10%', efficiency: 92, color: 'var(--color-success)' },
        { name: 'Average', efficiency: 76, color: 'var(--color-primary)' },
        { name: 'Bottom 10%', efficiency: 60, color: 'var(--color-destructive)' },
    ];

    return (
        <div className="min-h-screen bg-background p-6">
            <Helmet>
                <title>Driver Intelligence - NexLogica</title>
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">Fleet Driver Performance Insights</h1>
                            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium border border-primary/20">Efficiency Gap: 32%</span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">Analyzing 486 Active Drivers • Last Updated: Today, 06:00 AM</p>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Award className="w-4 h-4" />
                            <span className="text-sm">Top Performers</span>
                        </div>
                        <div className="text-2xl font-bold">42 Drivers</div>
                        <div className="text-xs text-green-500">Avg Score: 9.4/10</div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Zap className="w-4 h-4" />
                            <span className="text-sm">Fuel Efficiency</span>
                        </div>
                        <div className="text-2xl font-bold text-green-500">+12%</div>
                        <div className="text-xs text-muted-foreground">vs Industry Avg</div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">Safety Score</span>
                        </div>
                        <div className="text-2xl font-bold">98.2%</div>
                        <div className="text-xs text-muted-foreground">Incident Free</div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">Training Needed</span>
                        </div>
                        <div className="text-2xl font-bold text-orange-500">28 Drivers</div>
                        <div className="text-xs text-muted-foreground">Priority High</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left & Middle: Charts and Coaching */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-6">Efficiency Benchmark</h3>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={driverData} layout="vertical" margin={{ left: 20 }}>
                                        <XAxis type="number" domain={[0, 100]} hide />
                                        <YAxis dataKey="name" type="category" width={80} tick={{ fill: 'var(--color-muted-foreground)' }} />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                                        />
                                        <Bar dataKey="efficiency" radius={[0, 4, 4, 0]} barSize={30}>
                                            {driverData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">AI Coaching Insights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-muted/30 border border-border rounded-lg">
                                    <h4 className="font-bold text-sm mb-2 text-primary">Why Top Drivers Win</h4>
                                    <p className="text-sm text-muted-foreground">They maintain consistent speeds of 65-75 km/h and use engine braking 40% more often than peers.</p>
                                </div>
                                <div className="p-4 bg-muted/30 border border-border rounded-lg">
                                    <h4 className="font-bold text-sm mb-2 text-destructive">Risk Patterns</h4>
                                    <p className="text-sm text-muted-foreground">Bottom 10% show sharp acceleration events (avg 5/trip) leading to 15% higher fuel burn.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actions */}
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">Training Recommendations</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">1</div>
                                    <div>
                                        <h4 className="font-medium text-sm">Eco-Driving Module</h4>
                                        <p className="text-xs text-muted-foreground">Assign to 28 drivers with low MPG.</p>
                                        <Button variant="link" size="xs" className="p-0 h-auto mt-1">Assign Now &rarr;</Button>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center text-secondary font-bold shrink-0">2</div>
                                    <div>
                                        <h4 className="font-medium text-sm">Defensive Driving</h4>
                                        <p className="text-xs text-muted-foreground">For drivers with harsh braking alerts.</p>
                                        <Button variant="link" size="xs" className="p-0 h-auto mt-1">Assign Now &rarr;</Button>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">Actions</h3>
                            <div className="space-y-3">
                                <Button className="w-full" variant="default">Create Incentive Program</Button>
                                <Button className="w-full" variant="outline">Export Performance Report</Button>
                                <Button className="w-full" variant="outline">Compare Drivers</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverIntelligencePage;
