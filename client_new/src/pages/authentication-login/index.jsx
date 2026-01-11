import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import LanguageToggle from './components/LanguageToggle';
import SecurityFeatures from './components/SecurityFeatures';
import BrandingSection from './components/BrandingSection';

const AuthenticationLogin = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('appLanguage', lang);
  };

  return (
    <>
      <Helmet>
        <title>Login - NexLogica | AI-Powered Logistics Platform</title>
        <meta name="description" content="Secure login to NexLogica - Enterprise logistics platform with AI insights, blockchain verification, and real-time tracking" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="grid lg:grid-cols-2 min-h-screen">
          <div className="hidden lg:block">
            <BrandingSection currentLanguage={currentLanguage} />
          </div>

          <div className="flex items-center justify-center p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-md space-y-6 md:space-y-8">
              <div className="lg:hidden mb-6 md:mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">NexLogica</h1>
                </div>
                <p className="text-center text-sm md:text-base text-muted-foreground">
                  {currentLanguage === 'hi' ? 'AI + ब्लॉकचेन + रियल-टाइम लॉजिस्टिक्स' : 'AI + Blockchain + Real-Time Logistics'}
                </p>
              </div>

              <div className="card">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {currentLanguage === 'hi' ? 'स्वागत है' : 'Welcome Back'}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {currentLanguage === 'hi' ? 'अपने खाते में लॉगिन करें' : 'Login to your account'}
                  </p>
                </div>

                <LoginForm
                  onLanguageChange={handleLanguageChange}
                  currentLanguage={currentLanguage}
                />


              </div>

              <div className="mt-6 md:mt-8">
                <SecurityFeatures currentLanguage={currentLanguage} />
              </div>

              <div className="text-center text-xs md:text-sm text-muted-foreground mt-6 md:mt-8">
                <p>
                  {currentLanguage === 'hi' ? '© 2025 NexLogica. सर्वाधिकार सुरक्षित।'
                    : `© ${new Date()?.getFullYear()} NexLogica. All rights reserved.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticationLogin;