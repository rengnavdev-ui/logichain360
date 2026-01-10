import React from 'react';
import Icon from '../../../components/AppIcon';

const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'en', label: 'English', icon: 'Globe' },
    { code: 'hi', label: 'हिंदी', icon: 'Languages' }
  ];

  return (
    <div className="flex items-center justify-center gap-2 p-1 bg-muted rounded-xl">
      {languages?.map((lang) => (
        <button
          key={lang?.code}
          onClick={() => onLanguageChange(lang?.code)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 ${
            currentLanguage === lang?.code
              ? 'bg-primary text-primary-foreground shadow-glow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-surface'
          }`}
          aria-label={`Switch to ${lang?.label}`}
        >
          <Icon name={lang?.icon} size={16} />
          <span>{lang?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;