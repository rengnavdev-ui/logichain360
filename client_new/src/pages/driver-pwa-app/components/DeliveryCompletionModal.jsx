import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DeliveryCompletionModal = ({ isOpen, onClose, onComplete, delivery }) => {
  const [signature, setSignature] = useState('');
  const [photo, setPhoto] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handlePhotoCapture = () => {
    setPhoto('https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (onComplete) {
        onComplete({
          signature,
          photo,
          feedback,
          timestamp: new Date()?.toISOString(),
        });
      }
      setIsSubmitting(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-2xl border border-border p-4 md:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-custom shadow-glow-lg">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">Complete Delivery</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Delivery ID: {delivery?.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Customer Signature
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter customer name for signature"
                value={signature}
                onChange={(e) => setSignature(e?.target?.value)}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Icon name="PenTool" size={18} color="var(--color-muted-foreground)" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Delivery Proof Photo
            </label>
            {photo ? (
              <div className="relative rounded-xl overflow-hidden border border-border">
                <img
                  src={photo}
                  alt="Delivery proof showing package at customer doorstep with visible address number"
                  className="w-full h-48 md:h-64 object-cover"
                />
                <button
                  onClick={() => setPhoto(null)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-error flex items-center justify-center"
                  aria-label="Remove photo"
                >
                  <Icon name="X" size={16} color="white" />
                </button>
              </div>
            ) : (
              <button
                onClick={handlePhotoCapture}
                className="w-full h-48 md:h-64 rounded-xl border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 flex flex-col items-center justify-center gap-3 transition-colors"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Camera" size={24} color="var(--color-primary)" />
                </div>
                <p className="text-sm md:text-base font-medium text-foreground">Capture Photo</p>
                <p className="text-xs text-muted-foreground">Take a photo of the delivered package</p>
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Customer Feedback (Optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e?.target?.value)}
              placeholder="Any additional notes or customer feedback..."
              rows={3}
              className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="p-3 md:p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-start gap-2 md:gap-3">
              <Icon name="Shield" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs md:text-sm text-foreground font-medium mb-1">Blockchain Verification</p>
                <p className="text-xs text-muted-foreground">
                  This delivery will be verified on blockchain with timestamp and proof of delivery.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
              disabled={isSubmitting}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="success"
              size="lg"
              iconName="CheckCircle"
              iconPosition="left"
              loading={isSubmitting}
              onClick={handleSubmit}
              disabled={!signature || !photo}
              fullWidth
            >
              Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCompletionModal;