import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = ({ currentLanguage }) => {
  const features = [
    {
      icon: 'Shield',
      title: currentLanguage === 'hi' ? 'JWT प्रमाणीकरण' : 'JWT Authentication',
      description: currentLanguage === 'hi' ? 'सुरक्षित टोकन-आधारित प्रमाणीकरण' : 'Secure token-based authentication'
    },
    {
      icon: 'Lock',
      title: currentLanguage === 'hi' ? 'एन्क्रिप्टेड डेटा' : 'Encrypted Data',
      description: currentLanguage === 'hi' ? 'एंड-टू-एंड एन्क्रिप्शन' : 'End-to-end encryption'
    },
    {
      icon: 'UserCheck',
      title: currentLanguage === 'hi' ? 'भूमिका-आधारित पहुंच' : 'Role-Based Access',
      description: currentLanguage === 'hi' ? 'सुरक्षित अनुमति प्रबंधन' : 'Secure permission management'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {features?.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 md:p-6 bg-surface/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/30 transition-all duration-250"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
            <Icon name={feature?.icon} size={24} color="var(--color-primary)" />
          </div>
          <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">{feature?.title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground">{feature?.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SecurityFeatures;