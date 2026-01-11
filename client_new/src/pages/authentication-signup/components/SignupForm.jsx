import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SignupForm = ({ onLanguageChange, currentLanguage }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const roleOptions = [
        { value: 'admin', label: currentLanguage === 'hi' ? 'प्रशासक' : 'Admin' },
        { value: 'manager', label: currentLanguage === 'hi' ? 'प्रबंधक' : 'Manager' },
        { value: 'driver', label: currentLanguage === 'hi' ? 'चालक' : 'Driver' }
    ];

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

        // Name validation
        if (!formData?.fullName?.trim()) {
            newErrors.fullName = currentLanguage === 'hi' ? 'पूरा नाम आवश्यक है' : 'Full name is required';
        } else if (formData?.fullName?.trim()?.length < 3) {
            newErrors.fullName = currentLanguage === 'hi' ? 'नाम कम से कम 3 अक्षर का होना चाहिए' : 'Name must be at least 3 characters';
        }

        // Email validation
        if (!formData?.email) {
            newErrors.email = currentLanguage === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
        } else if (!validateEmail(formData?.email)) {
            newErrors.email = currentLanguage === 'hi' ? 'अमान्य ईमेल प्रारूप' : 'Invalid email format';
        }

        // Password validation
        if (!formData?.password) {
            newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड आवश्यक है' : 'Password is required';
        } else if (!validatePassword(formData?.password)) {
            newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए' : 'Password must be at least 8 characters';
        }

        // Confirm Password validation
        if (!formData?.confirmPassword) {
            newErrors.confirmPassword = currentLanguage === 'hi' ? 'पासवर्ड की पुष्टि आवश्यक है' : 'Password confirmation is required';
        } else if (formData?.password !== formData?.confirmPassword) {
            newErrors.confirmPassword = currentLanguage === 'hi' ? 'पासवर्ड मेल नहीं खाते' : 'Passwords do not match';
        }

        // Role validation
        if (!formData?.role) {
            newErrors.role = currentLanguage === 'hi' ? 'भूमिका चयन आवश्यक है' : 'Role selection is required';
        }

        if (Object.keys(newErrors)?.length > 0) {
            setErrors(newErrors);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsLoading(true);

        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            alert(currentLanguage === 'hi' ? 'खाता सफलतापूर्वक बनाया गया! अब आप लॉगिन कर सकते हैं।' : 'Account created successfully! You can now login.');
            navigate('/authentication-login');
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
                <Input
                    type="text"
                    label={currentLanguage === 'hi' ? 'पूरा नाम' : 'Full Name'}
                    placeholder={currentLanguage === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
                    value={formData?.fullName}
                    onChange={(e) => handleInputChange('fullName', e?.target?.value)}
                    error={errors?.fullName}
                    required
                    disabled={isLoading}
                />
            </div>

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
                <Input
                    type="password"
                    label={currentLanguage === 'hi' ? 'पासवर्ड की पुष्टि करें' : 'Confirm Password'}
                    placeholder={currentLanguage === 'hi' ? 'अपना पासवर्ड फिर से दर्ज करें' : 'Re-enter your password'}
                    value={formData?.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                    error={errors?.confirmPassword}
                    required
                    disabled={isLoading}
                />
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

            <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isLoading}
                iconName="UserPlus"
                iconPosition="right"
            >
                {currentLanguage === 'hi' ? 'खाता बनाएँ' : 'Create Account'}
            </Button>

            <div className="text-center text-sm">
                <span className="text-muted-foreground">
                    {currentLanguage === 'hi' ? 'पहले से ही एक खाता है?' : 'Already have an account?'}
                </span>{' '}
                <button
                    type="button"
                    onClick={() => navigate('/authentication-login')}
                    className="text-primary font-medium hover:underline transition-all"
                >
                    {currentLanguage === 'hi' ? 'लॉगिन करें' : 'Login'}
                </button>
            </div>
        </form>
    );
};

export default SignupForm;
