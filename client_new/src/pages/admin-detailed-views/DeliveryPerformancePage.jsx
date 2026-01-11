import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';

const DeliveryPerformancePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background p-6">
            <Helmet><title>Delivery Performance - NexLogica</title></Helmet>
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></Button>
                    <h1 className="text-2xl font-bold">Delivery Performance</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">On-Time Performance</h3>
                        <div className="flex items-center justify-center h-48">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-500">94.2%</div>
                                <div className="text-sm text-muted-foreground">Overall Compliance</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Active vs In-Transit Breakdown</h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center p-3 border border-border rounded-lg">
                                <span>Active Vehicles (On Delivery)</span>
                                <span className="font-bold text-blue-500">312</span>
                            </li>
                            <li className="flex justify-between items-center p-3 border border-border rounded-lg">
                                <span>Idle / Not on Delivery</span>
                                <span className="font-bold text-orange-500">30</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryPerformancePage;
