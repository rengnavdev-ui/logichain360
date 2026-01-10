import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuditLogModal = ({ logs, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-xl w-full max-w-4xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-surface/95 backdrop-blur z-10">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
              <Icon name="Database" className="w-6 h-6 text-primary" />
              Immutable Audit Log
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Cryptographically verifiable record of all system actions</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground">
            <Icon name="X" className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-0">
            <table className="w-full text-left border-collapse">
                <thead className="bg-muted/30 sticky top-0 z-10 backdrop-blur-sm">
                    <tr>
                        <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">Timestamp</th>
                        <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">Action</th>
                        <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">Actor</th>
                        <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">Details</th>
                        <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">Hash</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                    {logs && logs.length > 0 ? (
                        logs.map((log, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4 text-sm text-foreground font-mono">{log.timestamp}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                        log.type === 'Deployment' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                        log.type === 'Verification' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        log.type === 'Transaction' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                    }`}>
                                        {log.type === 'Deployment' && <Icon name="Rocket" className="w-3 h-3" />}
                                        {log.type === 'Verification' && <Icon name="CheckCircle" className="w-3 h-3" />}
                                        {log.type === 'Transaction' && <Icon name="Activity" className="w-3 h-3" />}
                                        {log.action}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-muted-foreground">{log.actor}</td>
                                <td className="p-4 text-sm text-foreground">{log.details}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <code className="bg-black/20 px-2 py-1 rounded text-[10px] text-muted-foreground font-mono group-hover:text-primary transition-colors">
                                            {log.hash.substring(0, 16)}...
                                        </code>
                                        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Icon name="Copy" className="w-3 h-3" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="p-8 text-center text-muted-foreground">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Icon name="Database" className="w-8 h-8 text-muted-foreground/50" />
                                    <p>No actions logged yet.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/5 flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
                <span className="text-green-400">● Live</span> Syncing with Ethereum Mainnet Node #442a
            </p>
             <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground">
                <Icon name="Download" className="w-4 h-4 mr-2" />
                Export CSV
            </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogModal;
