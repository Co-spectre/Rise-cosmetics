import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialLoginProps {
  mode: 'login' | 'register';
  isLoading: boolean;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ mode, isLoading }) => {
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const { loginWithGoogle, loginWithInstagram } = useAuth();
  const { toast } = useToast();

  const handleSocialLogin = async (provider: 'google' | 'instagram' | 'apple') => {
    setSocialLoading(provider);
    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else if (provider === 'instagram') {
        await loginWithInstagram();
      } else if (provider === 'apple') {
        // Apple login simulation - in real app this would use Apple SDK
        console.log('Apple login initiated...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast({
          title: "Welcome to RISE!",
          description: `Successfully ${mode === 'login' ? 'signed in' : 'registered'} with Apple.`,
        });
        return;
      }
      
      toast({
        title: "Welcome to RISE!",
        description: `Successfully ${mode === 'login' ? 'signed in' : 'registered'} with ${provider}.`,
      });
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: `Failed to ${mode === 'login' ? 'sign in' : 'register'} with ${provider}. Please try again.`,
      });
    } finally {
      setSocialLoading(null);
    }
  };

  const isButtonLoading = (provider: string) => {
    return isLoading || socialLoading === provider;
  };

  return (
    <div className="space-y-3">
      
      {/* Google Login */}
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSocialLogin('google')}
        disabled={isButtonLoading('google')}
        className="w-full h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 rounded-lg"
      >
        <div className="flex items-center justify-center space-x-3">
          {isButtonLoading('google') ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285f4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34a853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#fbbc05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#ea4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </div>
      </Button>

      {/* Apple Login */}
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSocialLogin('apple')}
        disabled={isButtonLoading('apple')}
        className="w-full h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 rounded-lg"
      >
        <div className="flex items-center justify-center space-x-3">
          {isButtonLoading('apple') ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#000000"
                d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
              />
            </svg>
          )}
          <span className="text-gray-700 font-medium">Continue with Apple</span>
        </div>
      </Button>

      {/* Instagram Login */}
      <Button
        type="button"
        variant="outline"
        onClick={() => handleSocialLogin('instagram')}
        disabled={isButtonLoading('instagram')}
        className="w-full h-12 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 rounded-lg"
      >
        <div className="flex items-center justify-center space-x-3">
          {isButtonLoading('instagram') ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <defs>
                <radialGradient id="instagram-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fdf497" />
                  <stop offset="5%" stopColor="#fdf497" />
                  <stop offset="45%" stopColor="#fd5949" />
                  <stop offset="60%" stopColor="#d6249f" />
                  <stop offset="90%" stopColor="#285AEB" />
                </radialGradient>
              </defs>
              <path
                fill="url(#instagram-gradient)"
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
            </svg>
          )}
          <span className="text-gray-700 font-medium">Continue with Instagram</span>
        </div>
      </Button>

    </div>
  );
};

export default SocialLogin;
