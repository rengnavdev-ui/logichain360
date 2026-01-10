import React from 'react';
import { X, TrendingUp, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InsightDetailModal = ({ isOpen, onClose, insight }) => {
  if (!isOpen || !insight) return null;

  const chartData = [
    { day: 'Mon', value: 400 },
    { day: 'Tue', value: 300 },
    { day: 'Wed', value: 550 },
    { day: 'Thu', value: 450 },
    { day: 'Fri', value: 600 },
    { day: 'Sat', value: 700 },
    { day: 'Sun', value: 650 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {insight.title}
              <span className={`px-2 py-0.5 rounded-full text-xs border ${
                insight.priority === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                'bg-blue-500/10 text-blue-500 border-blue-500/20'
              }`}>
                {insight.priority} Priority
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">AI Confidence: <span className="text-primary font-bold">{insight.confidence || '92%'}</span></p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Left Col */}
           <div className="lg:col-span-2 space-y-6">
                <div className="bg-muted/20 border border-border rounded-xl p-6 h-80">
                    <h3 className="font-semibold mb-4">Historical Trend Validation</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                            <YAxis stroke="var(--color-muted-foreground)" />
                            <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }} />
                            <Line type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={3} dot={{r: 4}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface border border-border rounded-xl">
                        <h4 className="text-sm text-muted-foreground mb-1">Potential Savings</h4>
                        <p className="text-2xl font-bold">₹24,500<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                    </div>
                     <div className="p-4 bg-surface border border-border rounded-xl">
                        <h4 className="text-sm text-muted-foreground mb-1">Efficiency Gain</h4>
                        <p className="text-2xl font-bold text-green-500">+18.5%</p>
                    </div>
                </div>
           </div>

           {/* Right Col */}
           <div className="space-y-6">
                <div className="bg-surface border border-border rounded-xl p-6">
                    <h3 className="font-semibold mb-4 flex gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" /> 
                        Risk Analysis
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1"><span>Implementation Risk</span> <span className="font-bold">Low</span></div>
                            <div className="w-full bg-muted h-2 rounded-full overflow-hidden"><div className="w-[20%] bg-green-500 h-full"/></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1"><span>Data Reliability</span> <span className="font-bold">High</span></div>
                            <div className="w-full bg-muted h-2 rounded-full overflow-hidden"><div className="w-[95%] bg-blue-500 h-full"/></div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                        This insight is based on 3 months of historical data and correlates with external weather patterns.
                    </p>
                </div>

                <div className="p-4 border border-border rounded-xl bg-primary/5">
                    <h4 className="font-semibold text-primary mb-2">AI Reasoning</h4>
                    <p className="text-sm text-muted-foreground">
                        "Route congestion on NH44 has increased by 15% due to ongoing construction. Shift to NH48 is recommended."
                    </p>
                </div>
           </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/30 flex justify-end gap-3">
             <Button variant="outline" onClick={onClose}>Close Detail</Button>
             <Button variant="default">Generate PDF Report</Button>
        </div>
      </div>
    </div>
  );
};

export default InsightDetailModal;
