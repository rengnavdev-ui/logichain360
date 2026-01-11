import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Search } from 'lucide-react';
import Button from '../../components/ui/Button';

const ShipmentsPage = () => {
    const navigate = useNavigate();
    // Placeholder data
    const shipments = Array.from({ length: 15 }).map((_, i) => ({
        id: `SHP-${2000 + i}`,
        origin: 'Mumbai',
        destination: 'Delhi',
        status: i % 3 === 0 ? 'In Transit' : i % 3 === 1 ? 'Pending' : 'Delivered',
        customer: `Customer ${i + 1}`
    }));

    return (
        <div className="min-h-screen bg-background p-6">
            <Helmet><title>Shipments - NexLogica</title></Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></Button>
                    <h1 className="text-2xl font-bold">All Shipments</h1>
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-border flex justify-between items-center">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input type="text" placeholder="Search shipments..." className="bg-background border border-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64" />
                        </div>
                        <Button>Export Data</Button>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr className="text-left">
                                <th className="p-4 font-medium">ID</th>
                                <th className="p-4 font-medium">Customer</th>
                                <th className="p-4 font-medium">Origin</th>
                                <th className="p-4 font-medium">Destination</th>
                                <th className="p-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {shipments.map((s) => (
                                <tr key={s.id} className="hover:bg-muted/10">
                                    <td className="p-4 font-medium">{s.id}</td>
                                    <td className="p-4">{s.customer}</td>
                                    <td className="p-4">{s.origin}</td>
                                    <td className="p-4">{s.destination}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.status === 'In Transit' ? 'bg-blue-500/10 text-blue-500' :
                                                s.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    'bg-green-500/10 text-green-500'
                                            }`}>{s.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShipmentsPage;
