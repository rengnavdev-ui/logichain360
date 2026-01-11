import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import Button from '../../components/ui/Button';

const DriversPage = () => {
    const navigate = useNavigate();
    const drivers = Array.from({ length: 12 }).map((_, i) => ({
        id: `DRV-${300 + i}`,
        name: `Driver ${i + 1}`,
        rating: (4 + Math.random()).toFixed(1),
        status: i % 5 === 0 ? 'On Leave' : 'On Duty'
    }));

    return (
        <div className="min-h-screen bg-background p-6">
            <Helmet><title>Drivers - NexLogica</title></Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></Button>
                    <h1 className="text-2xl font-bold">Driver Roster</h1>
                </div>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr className="text-left">
                                <th className="p-4 font-medium">Driver ID</th>
                                <th className="p-4 font-medium">Name</th>
                                <th className="p-4 font-medium">Rating</th>
                                <th className="p-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {drivers.map((d) => (
                                <tr key={d.id} className="hover:bg-muted/10">
                                    <td className="p-4 font-medium">{d.id}</td>
                                    <td className="p-4">{d.name}</td>
                                    <td className="p-4 font-bold text-yellow-500">★ {d.rating}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${d.status === 'On Duty' ? 'bg-green-500/10 text-green-500' :
                                                'bg-gray-500/10 text-gray-500'
                                            }`}>{d.status}</span>
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

export default DriversPage;
