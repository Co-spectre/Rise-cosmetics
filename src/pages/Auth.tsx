import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SocialLogin from '@/components/auth/SocialLogin';
import PasswordStrength from '@/components/auth/PasswordStrength';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    acceptTerms: false,
    newsletter: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Registration specific validation
    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Please accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          toast({
            title: "Welcome back!",
            description: "You've successfully signed in to RISE.",
          });
          navigate(from, { replace: true });
        }
      } else {
        const success = await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          acceptTerms: formData.acceptTerms,
          newsletter: formData.newsletter
        });
        if (success) {
          toast({
            title: "Account created!",
            description: "Welcome to RISE! Your account has been created successfully.",
          });
          navigate(from, { replace: true });
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: isLogin ? "Sign in failed" : "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive-50 via-white to-rice-50">
      <Header />
      
      <main className="pt-20 pb-20 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-olive-600 to-rice-600 rounded-full mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-olive-900 mb-2 tracking-wide">
              {isLogin ? 'Welcome Back' : 'Join RISE'}
            </h1>
            <p className="text-olive-700 font-light text-sm md:text-base">
              {isLogin 
                ? 'Sign in to continue your beauty journey' 
                : 'Create your account and discover natural beauty'
              }
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8 mx-auto max-w-xs">
            <button
              onClick={() => {
                setIsLogin(true);
                setErrors({});
                setFormData({
                  email: '',
                  password: '',
                  name: '',
                  phone: '',
                  acceptTerms: false,
                  newsletter: false
                });
              }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLogin 
                  ? 'bg-white text-olive-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setErrors({});
                setFormData({
                  email: '',
                  password: '',
                  name: '',
                  phone: '',
                  acceptTerms: false,
                  newsletter: false
                });
              }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                !isLogin 
                  ? 'bg-white text-olive-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              
              {/* Social Login Section */}
              <div className="mb-8">
                <SocialLogin mode={isLogin ? 'login' : 'register'} isLoading={loading} />
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-light">or continue with email</span>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name field for registration */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-olive-900 tracking-wide">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-olive-400" />
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`pl-10 h-12 border-gray-200 focus:border-olive-500 focus:ring-olive-500 rounded-lg font-light ${
                          errors.name ? 'border-red-300 focus:border-red-500' : ''
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && <p className="text-sm text-red-500 font-light">{errors.name}</p>}
                  </div>
                )}

                {/* Email field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-olive-900 tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-olive-400" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 h-12 border-gray-200 focus:border-olive-500 focus:ring-olive-500 rounded-lg font-light ${
                        errors.email ? 'border-red-300 focus:border-red-500' : ''
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500 font-light">{errors.email}</p>}
                </div>

                {/* Phone field for registration */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-olive-900 tracking-wide">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-olive-400" />
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-olive-500 focus:ring-olive-500 rounded-lg font-light"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                )}

                {/* Password field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-olive-900 tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-olive-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pl-10 pr-10 h-12 border-gray-200 focus:border-olive-500 focus:ring-olive-500 rounded-lg font-light ${
                        errors.password ? 'border-red-300 focus:border-red-500' : ''
                      }`}
                      placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-olive-400 hover:text-olive-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500 font-light">{errors.password}</p>}
                  
                  {/* Password strength indicator for registration */}
                  {!isLogin && formData.password && (
                    <div className="mt-2">
                      <PasswordStrength password={formData.password} />
                    </div>
                  )}
                </div>

                {/* Terms and Newsletter for registration */}
                {!isLogin && (
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-olive-600 focus:ring-olive-500"
                      />
                      <label htmlFor="acceptTerms" className="text-sm text-gray-700 font-light">
                        I agree to the{' '}
                        <a href="/terms" className="text-olive-600 hover:text-olive-700 underline">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-olive-600 hover:text-olive-700 underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    {errors.acceptTerms && <p className="text-sm text-red-500 font-light">{errors.acceptTerms}</p>}
                    
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="newsletter"
                        checked={formData.newsletter}
                        onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-olive-600 focus:ring-olive-500"
                      />
                      <label htmlFor="newsletter" className="text-sm text-gray-700 font-light">
                        Subscribe to our newsletter for beauty tips and exclusive offers
                      </label>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-olive-600 to-rice-600 hover:from-olive-700 hover:to-rice-700 text-white font-medium tracking-wide rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>

                {/* Forgot Password for login */}
                {isLogin && (
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-olive-600 hover:text-olive-700 font-light underline"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
                
              </form>
            </CardContent>
          </Card>

          {/* Admin Login Section */}
          <div className="mt-12 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Admin Access</h3>
              <p className="text-sm text-gray-600 mb-4">
                Administrative dashboard for website management
              </p>
              <button
                onClick={() => navigate('/admin')}
                className="inline-flex items-center px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
              >
                <Lock className="w-4 h-4 mr-2" />
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
