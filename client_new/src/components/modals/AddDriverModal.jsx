import React, { useState } from 'react';
import { X, User, Shield, Briefcase, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import Button from '../ui/Button';

const AddDriverModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const steps = [
    { id: 1, title: 'Personal', icon: User },
    { id: 2, title: 'Operations', icon: Briefcase },
    { id: 3, title: 'Compliance', icon: Shield },
    { id: 4, title: 'Review', icon: Check }
  ];

  const handleNext = () => setStep(Math.min(step + 1, 4));
  const handleBack = () => setStep(Math.max(step - 1, 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
          <div>
            <h2 className="text-xl font-bold">Add New Driver</h2>
            <p className="text-sm text-muted-foreground">Onboard a new driver to the fleet</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper */}
         <div className="px-8 py-4 bg-surface border-b border-border">
          <div className="flex items-center justify-between relative">
             <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted -z-10" />
             {steps.map((s) => (
               <div key={s.id} className={`flex flex-col items-center gap-2 bg-surface px-2 ${step >= s.id ? 'text-primary' : 'text-muted-foreground'}`}>
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                   step >= s.id ? 'border-primary bg-primary text-primary-foreground' : 'border-muted bg-surface'
                 }`}>
                   <s.icon className="w-5 h-5" />
                 </div>
                 <span className="text-xs font-medium">{s.title}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8">
            {step === 1 && (
                <div className="grid grid-cols-2 gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
                    <div className="space-y-4">
                        <label className="text-sm font-medium">Full Name</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 outline-none" />
                    </div>
                     <div className="space-y-4">
                        <label className="text-sm font-medium">Phone Number</label>
                        <input type="tel" className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 outline-none" />
                    </div>
                     <div className="space-y-4">
                        <label className="text-sm font-medium">License Number</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 outline-none" />
                    </div>
                     <div className="space-y-4">
                        <label className="text-sm font-medium">Experience (Years)</label>
                        <input type="number" className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/50 outline-none" />
                    </div>
                </div>
            )}
             {/* ... Other steps logic (simplified for brevity) ... */}
              {step > 1 && (
                 <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in zoom-in duration-300">
                     <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                         {step === 2 ? <Briefcase className="w-8 h-8 text-muted-foreground" /> :
                          step === 3 ? <Shield className="w-8 h-8 text-muted-foreground" /> :
                          <Check className="w-8 h-8 text-green-500" />}
                     </div>
                     <h3 className="text-lg font-semibold">Step {step} Content Placeholder</h3>
                     <p className="text-muted-foreground max-w-md">
                         Full implementation of Operational Data, Compliance Checks, and Video KYC UI would go here in the complete version.
                     </p>
                 </div>
             )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30 flex justify-between items-center">
          <Button variant="ghost" onClick={handleBack} disabled={step === 1}>
             <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="flex gap-3">
             <Button variant="outline" onClick={onClose}>Save Draft</Button>
             {step < 4 ? (
                 <Button onClick={handleNext}>
                     Next <ChevronRight className="w-4 h-4 ml-2" />
                 </Button>
             ) : (
                 <Button onClick={onClose} className="bg-primary text-primary-foreground hover:bg-primary/90">
                     Add Driver
                 </Button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDriverModal;
