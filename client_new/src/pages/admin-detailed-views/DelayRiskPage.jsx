import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CloudRain, Clock, Truck } from 'lucide-react';
import Button from '../../components/ui/Button';

const DelayRiskPage = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');

    const impactedShipments = [
        { id: 'SHP-9012', customer: 'Nexus Retail', eta: 'Today, 22:00', risk: 'High', penalty: '₹5,000' },
        { id: 'SHP-8834', customer: 'Global Foods', eta: 'Tomorrow, 08:00', risk: 'Medium', penalty: '₹2,500' },
        { id: 'SHP-9100', customer: 'TechSol Inc.', eta: 'Tomorrow, 14:00', risk: 'Low', penalty: '₹0' },
        { id: 'SHP-9255', customer: 'Urban Styles', eta: 'Today, 19:30', risk: 'High', penalty: '₹8,000' },
    ];

    return (
        <div className="min-h-screen bg-background p-6">
            <Helmet>
                <title>Delay Risk Management - NexLogica</title>
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">Bangalore–Chennai Corridor Risk</h1>
                            <span className="bg-red-500/10 text-red-500 text-xs px-2 py-1 rounded-full font-medium border border-red-500/20">High Risk</span>
                            <span className="bg-orange-500/10 text-orange-500 text-xs px-2 py-1 rounded-full font-medium border border-orange-500/20">Prob: 65%</span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">Risk Window: Next 48 Hours • Cause: Weather & Congestion</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm">Affected Shipments</p>
                            <h3 className="text-2xl font-bold">23</h3>
                        </div>
                        <Truck className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm">Potential Penalty</p>
                            <h3 className="text-2xl font-bold text-red-500">₹45.5K</h3>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-red-500/50" />
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm">Avg Delay Est.</p>
                            <h3 className="text-2xl font-bold">4.5 hrs</h3>
                        </div>
                        <Clock className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-muted-foreground text-sm">Weather Severity</p>
                            <h3 className="text-2xl font-bold text-orange-500">Heavy Rain</h3>
                        </div>
                        <CloudRain className="w-8 h-8 text-blue-500/50" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Impacted Shipments Table */}
                        <div className="bg-card border border-border rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-border flex justify-between items-center">
                                <h3 className="font-semibold text-lg">Impacted Shipments</h3>
                                <div className="flex gap-2">
                                    <Button size="xs" variant={filter === 'all' ? 'default' : 'ghost'} onClick={() => setFilter('all')}>All</Button>
                                    <Button size="xs" variant={filter === 'high' ? 'destructive' : 'ghost'} onClick={() => setFilter('high')}>High Risk</Button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50">
                                        <tr className="text-left">
                                            <th className="p-3 font-medium text-muted-foreground">Shipment ID</th>
                                            <th className="p-3 font-medium text-muted-foreground">Customer</th>
                                            <th className="p-3 font-medium text-muted-foreground">ETA</th>
                                            <th className="p-3 font-medium text-muted-foreground">Risk Level</th>
                                            <th className="p-3 font-medium text-muted-foreground">Penalty</th>
                                            <th className="p-3 font-medium text-muted-foreground">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {impactedShipments
                                            .filter(s => filter === 'all' || (filter === 'high' && s.risk === 'High'))
                                            .map((shipment) => (
                                                <tr key={shipment.id} className="hover:bg-muted/20">
                                                    <td className="p-3 font-medium">{shipment.id}</td>
                                                    <td className="p-3">{shipment.customer}</td>
                                                    <td className="p-3">{shipment.eta}</td>
                                                    <td className="p-3">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${shipment.risk === 'High' ? 'bg-red-500/10 text-red-500' :
                                                                shipment.risk === 'Medium' ? 'bg-orange-500/10 text-orange-500' :
                                                                    'bg-green-500/10 text-green-500'
                                                            }`}>
                                                            {shipment.risk}
                                                        </span>
                                                    </td>
                                                    <td className="p-3">{shipment.penalty}</td>
                                                    <td className="p-3">
                                                        <Button size="xs" variant="outline">Reschedule</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Risk Timeline (Placeholder) */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="font-semibold text-lg mb-4">Risk Escalation Timeline</h3>
                            <div className="h-48 flex items-end gap-2">
                                {/* Simple bars for visual */}
                                {[20, 35, 45, 65, 80, 70, 50, 40, 30, 20, 15, 10].map((h, i) => (
                                    <div key={i} className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t transition-all group relative" style={{ height: `${h}%` }}>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-popover text-popover-foreground text-xs p-2 rounded shadow border border-border">
                                            Prob: {h}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                <span>Now</span>
                                <span>+12h</span>
                                <span>+24h</span>
                                <span>+48h</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Root Cause Analysis */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">Root Cause Analysis</h3>
                            <div className="space-y-4">
                                <div className="p-3 rounded-lg border border-border bg-muted/30">
                                    <h4 className="text-sm font-medium mb-1">Weather Model</h4>
                                    <p className="text-xs text-muted-foreground">Cyclone formation in Bay of Bengal impacting coastal routes.</p>
                                </div>
                                <div className="p-3 rounded-lg border border-border bg-muted/30">
                                    <h4 className="text-sm font-medium mb-1">Traffic Volatility</h4>
                                    <p className="text-xs text-muted-foreground">Highway repairs on NH44 causing bottlenecks.</p>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Mitigations */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4 w-full">Mitigation Plan</h3>
                            <div className="space-y-3">
                                <Button className="w-full justify-start text-left h-auto py-3" variant="default">
                                    <div>
                                        <span className="block font-medium">Auto-Reschedule (23)</span>
                                        <span className="text-xs opacity-80">Shift to next available slot</span>
                                    </div>
                                </Button>
                                <Button className="w-full justify-start text-left h-auto py-3" variant="secondary">
                                    <div>
                                        <span className="block font-medium">Alternate Handover</span>
                                        <span className="text-xs opacity-80">Route via Hyderabad Hub</span>
                                    </div>
                                </Button>
                                <Button className="w-full justify-start text-left h-auto py-3" variant="outline">
                                    <div>
                                        <span className="block font-medium">Escalate to Control Tower</span>
                                        <span className="text-xs opacity-80">Manual Intervention</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DelayRiskPage;
