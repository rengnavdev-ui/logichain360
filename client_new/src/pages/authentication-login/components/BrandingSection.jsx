import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

import { Link } from 'react-router-dom';

const BrandingSection = ({ currentLanguage }) => {
  return (
    <div className="relative h-full min-h-[400px] lg:min-h-screen flex flex-col items-center justify-center p-6 md:p-8 lg:p-12 bg-gradient-to-br from-surface via-background to-surface overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <Image
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1031f59ea-1764660301435.png"
          alt="Modern logistics warehouse with organized shipping containers and automated sorting systems in blue ambient lighting"
          className="w-full h-full object-cover" />

      </div>
      <div className="relative z-10 max-w-lg text-center">
        <Link to="/" className="flex items-center justify-center gap-3 mb-6 md:mb-8 hover:opacity-80 transition-opacity">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/20">
            <img src="/logo.png" alt="NexLogica Logo" className="w-full h-full object-cover p-2" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            NexLogica
          </h1>
        </Link>

        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
            {currentLanguage === 'hi' ? 'AI + ब्लॉकचेन + रियल-टाइम' : 'AI + Blockchain + Real-Time'}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
            {currentLanguage === 'hi' ? 'अगली पीढ़ी के लॉजिस्टिक्स प्लेटफॉर्म के साथ अपने आपूर्ति श्रृंखला को रूपांतरित करें। AI-संचालित अंतर्दृष्टि, ब्लॉकचेन सत्यापन, और रियल-टाइम ट्रैकिंग।' : 'Transform your supply chain with next-generation logistics platform. AI-powered insights, blockchain verification, and real-time tracking.'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {[
            { icon: 'Brain', label: currentLanguage === 'hi' ? 'AI अंतर्दृष्टि' : 'AI Insights' },
            { icon: 'Shield', label: currentLanguage === 'hi' ? 'ब्लॉकचेन' : 'Blockchain' },
            { icon: 'MapPin', label: currentLanguage === 'hi' ? 'लाइव ट्रैकिंग' : 'Live Tracking' }]?.
            map((item, index) =>
              <div key={index} className="flex flex-col items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                  <Icon name={item?.icon} size={20} color="var(--color-primary)" />
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground">{item?.label}</span>
              </div>
            )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>);

};

export default BrandingSection;