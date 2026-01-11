import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLanguageChange, currentLanguage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const roleOptions = [
    { value: 'admin', label: currentLanguage === 'hi' ? 'प्रशासक' : 'Admin' },
    { value: 'manager', label: currentLanguage === 'hi' ? 'प्रबंधक' : 'Manager' },
    { value: 'driver', label: currentLanguage === 'hi' ? 'चालक' : 'Driver' }
  ];

  const mockCredentials = {
    admin: { email: 'admin@NexLogica.com', password: 'Admin@2025' },
    manager: { email: 'manager@NexLogica.com', password: 'Manager@2025' },
    driver: { email: 'driver@NexLogica.com', password: 'Driver@2025' }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePassword = (password) => {
    return password?.length >= 8;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = currentLanguage === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = currentLanguage === 'hi' ? 'अमान्य ईमेल प्रारूप' : 'Invalid email format';
    }

    if (!formData?.password) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड आवश्यक है' : 'Password is required';
    } else if (!validatePassword(formData?.password)) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए' : 'Password must be at least 8 characters';
    }

    if (!formData?.role) {
      newErrors.role = currentLanguage === 'hi' ? 'भूमिका चयन आवश्यक है' : 'Role selection is required';
    }

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const credentials = mockCredentials?.[formData?.role];


      if (formData?.email === credentials?.email && formData?.password === credentials?.password) {
        localStorage.setItem('userRole', formData?.role);
        localStorage.setItem('userEmail', formData?.email);
        localStorage.setItem('authToken', `mock-jwt-token-${formData?.role}-${Date.now()}`);


        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        const routeMap = {
          admin: '/admin-dashboard',
          manager: '/manager-dashboard',
          driver: '/driver-pwa-app'
        };

        navigate(routeMap?.[formData?.role]);
      } else {
        setErrors({
          submit: currentLanguage === 'hi'
            ? `अमान्य क्रेडेंशियल्स। सही क्रेडेंशियल्स: ${credentials?.email} / ${credentials?.password}`
            : `Invalid credentials. Correct credentials: ${credentials?.email} / ${credentials?.password}`
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          type="email"
          label={currentLanguage === 'hi' ? 'ईमेल पता' : 'Email Address'}
          placeholder={currentLanguage === 'hi' ? 'आपका ईमेल दर्ज करें' : 'Enter your email'}
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          disabled={isLoading}
        />
      </div>
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          label={currentLanguage === 'hi' ? 'पासवर्ड' : 'Password'}
          placeholder={currentLanguage === 'hi' ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password'}
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div>
        <Select
          label={currentLanguage === 'hi' ? 'भूमिका चुनें' : 'Select Role'}
          placeholder={currentLanguage === 'hi' ? 'अपनी भूमिका चुनें' : 'Choose your role'}
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          error={errors?.role}
          required
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label={currentLanguage === 'hi' ? 'मुझे याद रखें' : 'Remember Me'}
          checked={formData?.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
          disabled={isLoading}
        />
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
          onClick={() => alert(currentLanguage === 'hi' ? 'पासवर्ड रीसेट सुविधा जल्द आ रही है' : 'Password reset feature coming soon')}
        >
          {currentLanguage === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
        </button>
      </div>
      {errors?.submit && (
        <div className="bg-error/10 border border-error rounded-xl p-4 flex items-start gap-3">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{errors?.submit}</p>
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
      >
        {currentLanguage === 'hi' ? 'लॉगिन करें' : 'Login'}
      </Button>
      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          {currentLanguage === 'hi' ? 'खाता नहीं है?' : "Don't have an account?"}
        </span>{' '}
        <button
          type="button"
          onClick={() => navigate('/authentication-signup')}
          className="text-primary font-medium hover:underline transition-all"
        >
          {currentLanguage === 'hi' ? 'साइन अप करें' : 'Sign up'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;