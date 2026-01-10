import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VerificationWorkflow = ({ walletConnected, onNotification }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    shipmentId: '',
    photoHash: '',
    gpsCoordinates: '',
    signature: '',
  });

  const steps = [
    { id: 1, title: 'Scan QR Code', icon: 'QrCode', description: 'Scan shipment QR code for authentication' },
    { id: 2, title: 'Capture Photo', icon: 'Camera', description: 'Take delivery photo and store hash on IPFS' },
    { id: 3, title: 'GPS Verification', icon: 'MapPin', description: 'Verify GPS coordinates at delivery location' },
    { id: 4, title: 'Digital Signature', icon: 'PenTool', description: 'Collect digital signature for confirmation' },
    { id: 5, title: 'Blockchain Confirmation', icon: 'CheckCircle', description: 'Submit tamper-proof delivery confirmation' },
  ];

  const handleNext = () => {
    if (!walletConnected) {
      onNotification('Please connect your wallet first', 'warning');
      return;
    }
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
      onNotification(`Step ${currentStep} completed`, 'success');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!walletConnected) {
      onNotification('Please connect your wallet first', 'warning');
      return;
    }
    onNotification('Delivery confirmation submitted to blockchain', 'success');
    setCurrentStep(1);
    setFormData({ shipmentId: '', photoHash: '', gpsCoordinates: '', signature: '' });
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="bg-surface border border-border rounded-2xl p-8 shadow-lg backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-foreground mb-8 flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Workflow" className="w-5 h-5 text-primary" />
          </div>
          Verification Workflow
        </h2>

        <div className="relative mx-4">
          {/* Progress Bar */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-muted rounded-full">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.3)]"
              style={{ width: `${((currentStep - 1) / (steps?.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps?.map((step) => (
              <div key={step?.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 ${
                    currentStep >= step?.id
                      ? 'bg-primary border-primary text-primary-foreground shadow-[0_0_15px_rgba(14,165,233,0.4)]' 
                      : 'bg-surface border-muted text-muted-foreground'
                  }`}
                >
                  {currentStep > step?.id ? (
                    <Icon name="Check" className="w-5 h-5" />
                  ) : (
                    <Icon name={step?.icon} className="w-4 h-4" />
                  )}
                </div>
                <p className={`text-xs mt-3 text-center max-w-[80px] hidden md:block transition-colors font-medium ${
                    currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Current Step Content */}
      <div className="bg-surface border border-border rounded-2xl shadow-lg backdrop-blur-sm p-6 md:p-8">
        <div className="mb-6 pb-6 border-b border-border/50">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name={steps?.[currentStep - 1]?.icon} className="w-5 h-5 text-primary" />
            Step {currentStep}: {steps?.[currentStep - 1]?.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{steps?.[currentStep - 1]?.description}</p>
        </div>

        {/* Step-specific content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <Input
                label="Shipment ID"
                placeholder="Enter or scan shipment ID"
                value={formData?.shipmentId}
                onChange={(e) => setFormData({ ...formData, shipmentId: e?.target?.value })}
                className="bg-card border-border text-foreground"
              />
              <div className="p-8 bg-muted/20 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition-colors text-center group cursor-pointer">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="QrCode" className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-foreground font-medium">Click to activate QR scanner</p>
                <p className="text-xs text-muted-foreground mt-1">Camera permission required</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <Input
                label="IPFS Photo Hash"
                placeholder="Photo hash will be generated automatically"
                value={formData?.photoHash}
                onChange={(e) => setFormData({ ...formData, photoHash: e?.target?.value })}
                className="bg-card border-border text-foreground"
              />
              <div className="p-8 bg-muted/20 rounded-2xl border-2 border-dashed border-border text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Camera" className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-sm text-foreground font-medium mb-3">Click to capture delivery photo</p>
                <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10">
                  <Icon name="Upload" className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <Input
                label="GPS Coordinates"
                placeholder="Coordinates will be captured automatically"
                value={formData?.gpsCoordinates}
                onChange={(e) => setFormData({ ...formData, gpsCoordinates: e?.target?.value })}
                 className="bg-card border-border text-foreground"
              />
              <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Icon name="MapPin" className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-200">Current Location</p>
                    <p className="text-lg font-mono text-blue-100 mt-1">19.0760° N, 72.8777° E</p>
                    <Button variant="ghost" size="sm" className="mt-3 text-blue-300 hover:text-white hover:bg-blue-500/20 -ml-2">
                      <Icon name="Navigation" className="w-4 h-4 mr-2" />
                      Recapture GPS
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <Input
                label="Recipient Name"
                placeholder="Enter recipient name"
                value={formData?.signature}
                onChange={(e) => setFormData({ ...formData, signature: e?.target?.value })}
                className="bg-card border-border text-foreground"
              />
              <div className="p-8 bg-muted/20 rounded-2xl border-2 border-dashed border-border text-center">
                <Icon name="PenTool" className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Signature pad will appear here</p>
                <Button variant="outline" size="sm" className="mt-4 border-accent/50 text-accent hover:bg-accent/10">
                  <Icon name="Edit" className="w-4 h-4 mr-2" />
                  Capture Signature
                </Button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="p-6 bg-success/10 rounded-2xl border border-success/20 animate-in zoom-in-95">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-2 bg-success/20 rounded-full">
                      <Icon name="CheckCircle" className="w-8 h-8 text-success" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-success">Ready for Blockchain Submission</p>
                    <p className="text-sm text-success/80 mt-1">
                      All verification steps completed. Click submit to record on blockchain.
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-sm bg-black/20 p-4 rounded-xl border border-success/10">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-muted-foreground">Shipment ID:</span>
                    <span className="font-medium text-foreground">{formData?.shipmentId || 'SHP-1001'}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-muted-foreground">Photo Hash:</span>
                    <span className="font-mono text-xs text-foreground">QmYwAPJzv5CZ...</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-muted-foreground">GPS:</span>
                    <span className="text-foreground">19.0760° N, 72.8777° E</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Signature:</span>
                    <span className="text-success font-medium">Captured</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={currentStep === 1}
            className="border-border hover:bg-white/5 hover:text-white"
          >
            <Icon name="ChevronLeft" className="w-4 h-4 mr-2" />
            Previous
          </Button>
          {currentStep < steps?.length ? (
            <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-sm">
              Next
              <Icon name="ChevronRight" className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-success hover:bg-success/90 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] border-none">
              <Icon name="CheckCircle" className="w-4 h-4 mr-2" />
              Submit to Blockchain
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationWorkflow;