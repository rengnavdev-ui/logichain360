import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateShipmentModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    cargoType: '',
    weight: '',
    priority: '2',
    estimatedDelivery: '',
    specialInstructions: ''
  });

  const [errors, setErrors] = useState({});

  const cargoOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'perishables', label: 'Perishables' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'machinery', label: 'Machinery' },
    { value: 'chemicals', label: 'Chemicals' },
    { value: 'general', label: 'General Cargo' }
  ];

  const priorityOptions = [
    { value: '1', label: 'High Priority' },
    { value: '2', label: 'Medium Priority' },
    { value: '3', label: 'Low Priority' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.origin?.trim()) newErrors.origin = 'Origin is required';
    if (!formData?.destination?.trim()) newErrors.destination = 'Destination is required';
    if (!formData?.cargoType) newErrors.cargoType = 'Cargo type is required';
    if (!formData?.weight || parseFloat(formData?.weight) <= 0) newErrors.weight = 'Valid weight is required';
    if (!formData?.estimatedDelivery) newErrors.estimatedDelivery = 'Delivery date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        origin: '',
        destination: '',
        cargoType: '',
        weight: '',
        priority: '2',
        estimatedDelivery: '',
        specialInstructions: ''
      });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-custom">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="Package" size={20} color="var(--color-primary)" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">Create New Shipment</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Origin Location"
              type="text"
              placeholder="e.g., Mumbai Warehouse"
              value={formData?.origin}
              onChange={(e) => handleChange('origin', e?.target?.value)}
              error={errors?.origin}
              required
            />

            <Input
              label="Destination Location"
              type="text"
              placeholder="e.g., Delhi Distribution Center"
              value={formData?.destination}
              onChange={(e) => handleChange('destination', e?.target?.value)}
              error={errors?.destination}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Select
              label="Cargo Type"
              placeholder="Select cargo type"
              options={cargoOptions}
              value={formData?.cargoType}
              onChange={(value) => handleChange('cargoType', value)}
              error={errors?.cargoType}
              required
            />

            <Input
              label="Weight (kg)"
              type="number"
              placeholder="e.g., 500"
              value={formData?.weight}
              onChange={(e) => handleChange('weight', e?.target?.value)}
              error={errors?.weight}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Select
              label="Priority Level"
              options={priorityOptions}
              value={formData?.priority}
              onChange={(value) => handleChange('priority', value)}
              required
            />

            <Input
              label="Estimated Delivery Date"
              type="date"
              value={formData?.estimatedDelivery}
              onChange={(e) => handleChange('estimatedDelivery', e?.target?.value)}
              error={errors?.estimatedDelivery}
              required
              min={new Date()?.toISOString()?.split('T')?.[0]}
            />
          </div>

          <Input
            label="Special Instructions"
            type="text"
            placeholder="Any special handling requirements..."
            value={formData?.specialInstructions}
            onChange={(e) => handleChange('specialInstructions', e?.target?.value)}
            description="Optional: Add any special handling or delivery instructions"
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button 
              type="button"
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="default"
              iconName="Plus"
              iconPosition="left"
            >
              Create Shipment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShipmentModal;