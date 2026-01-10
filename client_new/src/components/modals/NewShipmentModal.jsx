import React, { useState, useEffect } from 'react';
import { X, Package, Calendar, Truck, Check, ChevronRight, ChevronLeft, User, FileText, AlertCircle, Clock } from 'lucide-react';
import Button from '../ui/Button';

const NewShipmentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    priority: 'Standard',
    cargoType: 'General Cargo',
    weight: '',
    volume: '',
    pickupDate: '',
    deliveryDate: '',
    sla: 'Standard Delivery',
    vehicleId: 1,
    driverId: 1
  });

  const [errors, setErrors] = useState({});

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrors({});
    }
  }, [isOpen]);

  const validateStep = (currentStep) => {
    const newErrors = {};
    let isValid = true;

    if (currentStep === 1) {
        if (!formData.origin.trim()) newErrors.origin = 'Origin is required';
        if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
        if (!formData.weight || parseFloat(formData.weight) <= 0) newErrors.weight = 'Valid weight is required';
    }
    
    if (currentStep === 2) {
        if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
        if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
        if (formData.pickupDate && formData.deliveryDate && new Date(formData.pickupDate) >= new Date(formData.deliveryDate)) {
          newErrors.deliveryDate = 'Delivery date must be after pickup date';
        }
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        isValid = false;
    } else {
        setErrors({});
    }

    return isValid;
  };

  const handleNext = () => {
      if (validateStep(step)) {
          setStep(Math.min(step + 1, 4));
      }
  };

  const handleBack = () => setStep(Math.max(step - 1, 1));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field if it exists
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const steps = [
    { id: 1, title: 'Details', icon: Package },
    { id: 2, title: 'Scheduling', icon: Calendar },
    { id: 3, title: 'Resources', icon: Truck },
    { id: 4, title: 'Review', icon: Check }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Full Screen Modal Container */}
      <div className="relative w-full h-full max-w-7xl max-h-[95vh] bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30 shrink-0">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Package className="w-6 h-6 text-primary" />
              New Shipment Entry
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Create and schedule a new logistics order</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stepper - Horizontal */}
        <div className="px-12 py-6 bg-surface border-b border-border shrink-0">
          <div className="flex items-center justify-between relative max-w-4xl mx-auto">
             <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted -z-10" />
             <div className="absolute left-0 top-1/2 h-0.5 bg-primary -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }} />
             
             {steps.map((s) => (
               <div key={s.id} className={`flex flex-col items-center gap-3 bg-surface px-4 transition-colors duration-300 ${step >= s.id ? 'text-primary' : 'text-muted-foreground'}`}>
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm ${
                   step >= s.id ? 'border-primary bg-primary text-primary-foreground scale-110' : 'border-muted bg-surface'
                 }`}>
                   <s.icon className="w-6 h-6" />
                 </div>
                 <span className="text-sm font-bold tracking-wide">{s.title}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Body Content - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-surface/50">
           <div className="max-w-5xl mx-auto p-8 md:p-12">
            
            {/* Step 1: Shipment Details */}
            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-8 fade-in duration-300">
                    <div className="col-span-2 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Auto-Generated ID</span>
                            <div className="text-xl font-mono font-bold">SHP-2026-X892</div>
                        </div>
                        <div className="text-sm text-muted-foreground">Draft • Created Just Now</div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-foreground/80">Origin Location <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input 
                                name="origin"
                                value={formData.origin}
                                onChange={handleInputChange}
                                type="text" 
                                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-background border outline-none transition-all ${errors.origin ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-2 focus:ring-primary/20'}`} 
                                placeholder="Enter pickup address or hub code" 
                            />
                            <div className="absolute left-3 top-3.5 text-muted-foreground"><Package className="w-4 h-4" /></div>
                        </div>
                        {errors.origin && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.origin}</p>}
                    </div>
                     <div className="space-y-4">
                        <label className="text-sm font-semibold text-foreground/80">Destination Location <span className="text-red-500">*</span></label>
                         <div className="relative">
                            <input 
                                name="destination"
                                value={formData.destination}
                                onChange={handleInputChange}
                                type="text" 
                                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-background border outline-none transition-all ${errors.destination ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-2 focus:ring-primary/20'}`} 
                                placeholder="Enter delivery address or hub code" 
                            />
                            <div className="absolute left-3 top-3.5 text-muted-foreground"><Package className="w-4 h-4" /></div>
                        </div>
                        {errors.destination && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.destination}</p>}
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-foreground/80">Priority Level</label>
                        <select 
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        >
                            <option>Standard</option>
                            <option>High Priority</option>
                            <option>Critical / Emergency</option>
                        </select>
                    </div>

                     <div className="space-y-4">
                        <label className="text-sm font-semibold text-foreground/80">Cargo Type</label>
                        <select 
                            name="cargoType"
                            value={formData.cargoType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        >
                            <option>General Cargo</option>
                            <option>Perishable Goods</option>
                            <option>Fragile Electronics</option>
                            <option>Hazardous Material</option>
                        </select>
                    </div>

                     <div className="space-y-4">
                        <label className="text-sm font-semibold text-foreground/80">Total Weight (kg) <span className="text-red-500">*</span></label>
                        <input 
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            type="number" 
                            className={`w-full px-4 py-3 rounded-xl bg-background border outline-none transition-all ${errors.weight ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-2 focus:ring-primary/20'}`} 
                            placeholder="0.00" 
                        />
                        {errors.weight && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.weight}</p>}
                    </div>

                     <div className="space-y-4">
                        <label className="text-sm font-semibold text-foreground/80">Volume (m³)</label>
                        <input 
                            name="volume"
                            value={formData.volume}
                            onChange={handleInputChange}
                            type="number" 
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                            placeholder="0.00" 
                        />
                    </div>
                </div>
            )}

            {/* Step 2: Scheduling */}
            {step === 2 && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-8 fade-in duration-300">
                    <div className="col-span-2">
                        <h3 className="text-lg font-bold mb-4">Pickup & Delivery Window</h3>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-foreground/80">Pickup Date & Time <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input 
                                name="pickupDate"
                                value={formData.pickupDate}
                                onChange={handleInputChange}
                                type="datetime-local" 
                                className={`w-full px-4 py-3 rounded-xl bg-background border outline-none transition-all ${errors.pickupDate ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-2 focus:ring-primary/20'}`} 
                            />
                             {errors.pickupDate && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.pickupDate}</p>}
                        </div>
                    </div>

                     <div className="space-y-4">
                        <label className="text-sm font-semibold text-foreground/80">Expected Delivery (ETA) <span className="text-red-500">*</span></label>
                         <div className="relative">
                             <input 
                                name="deliveryDate"
                                value={formData.deliveryDate}
                                onChange={handleInputChange}
                                type="datetime-local" 
                                className={`w-full px-4 py-3 rounded-xl bg-background border outline-none transition-all ${errors.deliveryDate ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:ring-2 focus:ring-primary/20'}`} 
                             />
                             {errors.deliveryDate && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.deliveryDate}</p>}
                         </div>
                    </div>

                     <div className="col-span-2 space-y-4 mt-4">
                        <label className="text-sm font-semibold text-foreground/80">Service Level Agreement (SLA)</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['Standard Delivery', 'Express (24h)', 'Same Day'].map((p, idx) => (
                                <label key={p} className="cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="sla" 
                                        value={p}
                                        checked={formData.sla === p}
                                        onChange={handleInputChange}
                                        className="peer hidden" 
                                    />
                                    <div className="h-full p-6 rounded-xl border-2 border-border text-center peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 transition-all">
                                        <div className="font-bold text-lg mb-1">{p}</div>
                                        <div className="text-xs text-muted-foreground">{idx === 0 ? 'Within 3-5 days' : idx === 1 ? 'Guaranteed next day' : 'Immediate dispatch'}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                 </div>
            )}

            {/* Step 3: Vehicle & Driver */}
            {step === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
                    
                    {/* Vehicle Selection */}
                    <div className="space-y-4">
                         <div className="flex items-center justify-between">
                            <label className="text-lg font-bold flex items-center gap-2">
                                <Truck className="w-5 h-5 text-primary" /> Vehicle Assignment
                            </label>
                            <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">AI Suggested</span>
                         </div>
                         
                         <div className="grid gap-3">
                             {[1,2,3].map(i => (
                                 <label key={i} className="cursor-pointer group">
                                     <input 
                                        type="radio" 
                                        name="vehicleId" 
                                        value={i}
                                        checked={parseInt(formData.vehicleId) === i}
                                        onChange={handleInputChange}
                                        className="peer hidden" 
                                     />
                                     <div className="flex items-center justify-between p-4 border-2 border-border rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/30 transition-all">
                                         <div className="flex items-center gap-4">
                                             <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center shadow-sm"><Truck className="w-6 h-6 text-foreground/70"/></div>
                                             <div>
                                                 <div className="font-bold text-base">Volvo FH16 (KA-01-EQ-22{i})</div>
                                                 <div className="text-xs text-muted-foreground flex gap-3 mt-1">
                                                     <span>Capacity: 20T</span>
                                                     <span>•</span>
                                                     <span>Current: Mumbai Hub</span>
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="text-right">
                                             <div className="text-green-600 font-bold">98% Match</div>
                                             <div className="text-xs text-muted-foreground">Optimal Choice</div>
                                         </div>
                                     </div>
                                 </label>
                             ))}
                         </div>
                    </div>

                    <div className="w-full h-px bg-border/50" />

                    {/* Driver Selection */}
                    <div className="space-y-4">
                         <div className="flex items-center justify-between">
                            <label className="text-lg font-bold flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" /> Driver Assignment
                            </label>
                         </div>
                         
                         <div className="grid gap-3">
                             {[1,2].map(i => (
                                 <label key={i} className="cursor-pointer group">
                                     <input 
                                        type="radio" 
                                        name="driverId" 
                                        value={i}
                                        checked={parseInt(formData.driverId) === i}
                                        onChange={handleInputChange}
                                        className="peer hidden" 
                                     />
                                     <div className="flex items-center justify-between p-4 border-2 border-border rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/30 transition-all">
                                         <div className="flex items-center gap-4">
                                             <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shadow-sm border border-border"><User className="w-6 h-6 text-foreground/70"/></div>
                                             <div>
                                                 <div className="font-bold text-base">{i === 1 ? 'Rajesh Kumar' : 'Vikram Singh'}</div>
                                                 <div className="text-xs text-muted-foreground flex gap-3 mt-1">
                                                     <span>Rating: 4.9 ★</span>
                                                     <span>•</span>
                                                     <span>Status: Available</span>
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="text-right">
                                              <div className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-600 rounded">HOS Compliant</div>
                                         </div>
                                     </div>
                                 </label>
                             ))}
                         </div>
                    </div>
                </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
                <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
                    
                    <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 rounded-2xl p-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                             <Check className="w-5 h-5 text-primary" /> AI Pre-Shipment Analysis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="bg-surface p-4 rounded-xl border border-border/50 shadow-sm text-center">
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Estimated Cost</div>
                                <div className="text-3xl font-bold text-foreground">₹{12000 + (Math.random() * 5000).toFixed(0)}</div>
                                <div className="text-xs text-green-600 mt-1">4% below average</div>
                            </div>
                            <div className="bg-surface p-4 rounded-xl border border-border/50 shadow-sm text-center">
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Risk Assessment</div>
                                <div className="text-3xl font-bold text-green-500">LOW</div>
                                <div className="text-xs text-muted-foreground mt-1">Safe weather conditions</div>
                            </div>
                            <div className="bg-surface p-4 rounded-xl border border-border/50 shadow-sm text-center">
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Carbon Footprint</div>
                                <div className="text-3xl font-bold text-foreground">{100 + parseInt(formData.weight || 0) * 0.5}<span className="text-sm text-muted-foreground">kg</span></div>
                                <div className="text-xs text-green-600 mt-1">Eco-optimized route</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/30 rounded-2xl p-6 border border-border">
                        <h3 className="text-lg font-bold mb-4">Shipment Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                            <div className="flex justify-between border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Shipment ID</span>
                                <span className="font-mono font-bold">SHP-2026-X892</span>
                            </div>
                             <div className="flex justify-between border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Origin</span>
                                <span className="font-medium text-foreground">{formData.origin || 'N/A'}</span>
                            </div>
                             <div className="flex justify-between border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Priority</span>
                                <span className="font-medium text-foreground">{formData.priority}</span>
                            </div>
                             <div className="flex justify-between border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Destination</span>
                                <span className="font-medium">Delhi (Gurgaon Hub)</span>
                            </div>
                             <div className="flex justify-between border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Pickup Time</span>
                                <span className="font-medium">12 Jan 2026, 10:00 AM</span>
                            </div>
                             <div className="flex justify-between border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Assigned Vehicle</span>
                                <span className="font-medium">Volvo FH16 (KA-01...)</span>
                            </div>
                             <div className="flex justify-between border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Delivery ETA</span>
                                <span className="font-medium text-primary font-bold">14 Jan 2026, 04:30 PM</span>
                            </div>
                             <div className="flex justify-between border-b border-border/50 pb-2">
                                <span className="text-muted-foreground">Assigned Driver</span>
                                <span className="font-medium">Rajesh Kumar</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
           </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-6 border-t border-border bg-surface shrink-0 flex justify-between items-center shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-20">
          <Button variant="ghost" onClick={step === 1 ? onClose : handleBack} className="text-muted-foreground hover:text-foreground">
             {step === 1 ? 'Cancel Operation' : <><ChevronLeft className="w-4 h-4 mr-2" /> Previous Step</>}
          </Button>
          
          <div className="flex gap-4">
             <Button variant="outline" onClick={onClose} className="border-border hover:bg-muted">
                <FileText className="w-4 h-4 mr-2" /> Save as Draft
             </Button>
             
             {step < 4 ? (
                 <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-lg shadow-primary/20">
                     Next Step <ChevronRight className="w-4 h-4 ml-2" />
                 </Button>
             ) : (
                 <Button onClick={onClose} className="bg-green-600 hover:bg-green-700 text-white px-8 shadow-lg shadow-green-500/20">
                     <Check className="w-4 h-4 mr-2" /> Confirm & Create
                 </Button>
             )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NewShipmentModal;
