import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck } from 'lucide-react';
import Button from '../../components/ui/Button';

const VehiclesPage = () => {
    const navigate = useNavigate();
    const vehicles = Array.from({ length: 12 }).map((_, i) => ({
        id: `VEH-${100 + i}`,
        type: 'Heavy Truck',
        status: i % 4 === 0 ? 'Maintenance' : 'Active',
        location: 'Mumbai Hub'
    }));

    return (
        <div className="min-h-screen bg-background p-6">
            <Helmet><title>Fleet Vehicles - NexLogica</title></Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></Button>
                    <h1 className="text-2xl font-bold">Fleet Overview</h1>
                </div>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr className="text-left">
                                <th className="p-4 font-medium">Vehicle ID</th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Current Location</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {vehicles.map((v) => (
                                <tr key={v.id} className="hover:bg-muted/10">
                                    <td className="p-4 font-medium">{v.id}</td>
                                    <td className="p-4">{v.type}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                                                'bg-red-500/10 text-red-500'
                                            }`}>{v.status}</span>
                                    </td>
                                    <td className="p-4">{v.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VehiclesPage;
