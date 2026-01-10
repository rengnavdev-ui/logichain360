import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShipmentVerificationPanel = ({ walletConnected, onNotification, logAction }) => {
  const [verifications, setVerifications] = useState([
    {
      id: 'VER-1001',
      shipmentId: 'SHP-1001',
      status: 'verified',
      timestamp: '2025-01-28 10:30 AM',
      blockNumber: 18456789,
      txHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
      signatures: ['Shipper', 'Carrier', 'Receiver'],
      ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
      gpsCoordinates: '19.0760° N, 72.8777° E',
      confidence: 100,
      checks: { hash: true, gps: true, time: true }
    },
    {
      id: 'VER-1002',
      shipmentId: 'SHP-1002',
      status: 'pending',
      timestamp: '2025-01-28 11:45 AM',
      blockNumber: 18456812,
      txHash: '0x9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a',
      signatures: ['Shipper', 'Carrier'],
      ipfsHash: 'QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX',
      gpsCoordinates: '12.9716° N, 77.5946° E',
      confidence: 85,
      checks: { hash: true, gps: true, time: false }
    },
  ]);

  const [scanMode, setScanMode] = useState(false);
  const [shipmentIdInput, setShipmentIdInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyPoD = (id) => {
      // Mock Verification Logic
      // In a real app, this would fetch from chain and compare hashes
      if (id === 'SHP-1001') return { status: 'verified', score: 100, checks: { hash: true, gps: true, time: true } };
      if (id === 'SHP-1003') return { status: 'failed', score: 30, checks: { hash: false, gps: true, time: false } };
      return { status: 'verified', score: 92, checks: { hash: true, gps: true, time: true } };
  };

  const handleVerifyShipment = () => {
    if (!walletConnected) {
      onNotification('Please connect your wallet first', 'warning');
      return;
    }
    if (!shipmentIdInput) {
      onNotification('Please enter a shipment ID', 'warning');
      return;
    }

    setIsVerifying(true);
    // Simulate blockchain delay
    setTimeout(() => {
        const result = verifyPoD(shipmentIdInput);
        const newVerification = {
            id: `VER-${Date.now()}`,
            shipmentId: shipmentIdInput,
            status: result.status,
            timestamp: new Date().toLocaleString(),
            blockNumber: 18457000 + Math.floor(Math.random() * 100),
            txHash: '0x' + Math.random().toString(16).substr(2, 40),
            signatures: ['Validator_Node_1', 'Validator_Node_2'],
            ipfsHash: 'Qm' + Math.random().toString(16).substr(2, 30),
            gpsCoordinates: '19.0760° N, 72.8777° E',
            confidence: result.score,
            checks: result.checks
        };

        setVerifications([newVerification, ...verifications]);
        setIsVerifying(false);
        setShipmentIdInput('');
        
        if (result.status === 'verified') {
             onNotification(`Shipment ${shipmentIdInput} verified successfully (Confidence: ${result.score}%)`, 'success');
             logAction('Verification', `PoD Verification Success`, `ID: ${shipmentIdInput}, Score: ${result.score}%`);
        } else {
             onNotification(`Verification failed for ${shipmentIdInput} - Hash Mismatch`, 'error');
             logAction('Verification', `PoD Verification Failed`, `ID: ${shipmentIdInput}, Hash Mismatch`);
        }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Verification Input */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="ShieldCheck" className="w-5 h-5 text-primary" />
          Verify Shipment PoD
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter Shipment ID (e.g., SHP-1001)"
              value={shipmentIdInput}
              onChange={(e) => setShipmentIdInput(e?.target?.value)}
              disabled={!walletConnected || isVerifying}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setScanMode(!scanMode)}
              variant="outline"
              disabled={!walletConnected || isVerifying}
              className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
            >
              <Icon name="QrCode" className="w-4 h-4 mr-2" />
              Scan QR
            </Button>
            <Button
              onClick={handleVerifyShipment}
              disabled={!walletConnected || isVerifying}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-sm min-w-[100px]"
            >
              {isVerifying ? (
                 <Icon name="Loader" className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Icon name="Search" className="w-4 h-4 mr-2" />
                  Verify
                </>
              )}
            </Button>
          </div>
        </div>
        {scanMode && (
          <div className="mt-4 p-4 bg-muted/20 rounded-xl border-2 border-dashed border-border text-center animate-in fade-in zoom-in-95">
            <div className="p-3 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Icon name="Camera" className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-foreground font-medium">QR Code Scanner Active</p>
            <p className="text-xs text-muted-foreground mt-1">Point your camera at the shipment QR code</p>
          </div>
        )}
      </div>
      {/* Verification Records */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm">
        <div className="p-6 border-b border-border bg-card/50">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Icon name="FileCheck" className="w-5 h-5 text-accent" />
            Verification Records
          </h2>
        </div>

        <div className="divide-y divide-border/50">
          {verifications?.map((verification) => (
            <div key={verification?.id} className="p-6 hover:bg-white/5 transition-colors group">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      Shipment {verification?.shipmentId}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                         verification.status === 'verified' ? 'bg-success/10 text-success border-success/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]' :
                         verification.status === 'pending' ? 'bg-warning/10 text-warning border-warning/20' :
                         'bg-destructive/10 text-destructive border-destructive/20'
                    }`}>
                      {verification?.status}
                    </span>
                    {/* Confidence Score Display */}
                    <div className="flex items-center gap-1.5 ml-2 bg-muted/30 px-2 py-0.5 rounded-md border border-border/50">
                        <span className="text-[10px] text-muted-foreground uppercase">Confidence:</span>
                        <span className={`text-xs font-bold ${
                            verification.confidence >= 90 ? 'text-green-400' :
                            verification.confidence >= 70 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                            {verification.confidence}%
                        </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                    {/* Hash & Basic Info */}
                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="Hash" className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Transaction Hash</p>
                        <p className="font-mono text-xs text-foreground/80 break-all">
                          {verification?.txHash?.slice(0, 20)}...{verification?.txHash?.slice(-10)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="Activity" className="w-4 h-4 text-accent mt-0.5" />
                      <div>
                         <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Validation Checks</p>
                         <div className="flex gap-2 mt-1">
                             <span className={`text-[10px] px-1.5 rounded border ${verification.checks?.hash ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'}`}>
                                 Hash
                             </span>
                             <span className={`text-[10px] px-1.5 rounded border ${verification.checks?.gps ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'}`}>
                                 GPS
                             </span>
                             <span className={`text-[10px] px-1.5 rounded border ${verification.checks?.time ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'}`}>
                                 Time
                             </span>
                         </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="Clock" className="w-4 h-4 text-accent mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Timestamp</p>
                        <p className="text-sm text-foreground">{verification?.timestamp}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="MapPin" className="w-4 h-4 text-success mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">GPS Coordinates</p>
                        <p className="font-mono text-sm text-foreground">{verification?.gpsCoordinates}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="Database" className="w-4 h-4 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">IPFS Hash</p>
                        <p className="font-mono text-xs text-foreground/80 break-all">
                          {verification?.ipfsHash?.slice(0, 20)}...
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="Users" className="w-4 h-4 text-purple-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Digital Signatures</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {verification?.signatures?.map((sig, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded text-[10px] font-medium"
                            >
                              {sig}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[140px]">
                  <Button variant="outline" size="sm" className="w-full justify-start border-border hover:bg-primary/10 hover:text-primary hover:border-primary/50">
                    <Icon name="Download" className="w-4 h-4 mr-2" />
                    Certificate
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start border-border hover:bg-muted text-muted-foreground hover:text-foreground">
                    <Icon name="ExternalLink" className="w-4 h-4 mr-2" />
                    View on Chain
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShipmentVerificationPanel;