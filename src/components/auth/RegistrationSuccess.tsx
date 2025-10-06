import React from 'react';
import { CheckCircle, Sparkles, Gift, Bell } from 'lucide-react';

interface RegistrationSuccessProps {
  userName: string;
  email: string;
  onContinue: () => void;
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({ userName, email, onContinue }) => {
  return (
    <div className="text-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-800" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-playfair font-light text-black">
          Welcome to RISE, {userName}! 🌹
        </h2>
        <p className="text-neutral-600 font-light leading-relaxed">
          Your account has been successfully created. We've sent a confirmation email to{' '}
          <span className="font-medium text-black">{email}</span>
        </p>
      </div>

      <div className="bg-gradient-to-r from-stone-50 to-stone-100 rounded-lg p-6 space-y-4">
        <h3 className="font-playfair font-light text-lg text-black">What's Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-olive-100 rounded-full flex items-center justify-center">
              <Gift className="w-4 h-4 text-olive-600" />
            </div>
            <span className="text-neutral-700 font-light">
              Enjoy 15% off your first order
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-rose-600" />
            </div>
            <span className="text-neutral-700 font-light">
              Access exclusive collections
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-neutral-700 font-light">
              Get beauty tips & updates
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onContinue}
          className="px-8 py-3 bg-black text-white font-light text-sm tracking-widest uppercase hover:bg-neutral-800 transition-colors rounded"
        >
          Start Shopping
        </button>
        <button
          onClick={() => window.location.href = '/profile'}
          className="px-8 py-3 border border-neutral-300 text-neutral-700 font-light text-sm tracking-widest uppercase hover:bg-neutral-50 transition-colors rounded"
        >
          Complete Profile
        </button>
      </div>

      <p className="text-xs text-neutral-500 font-light">
        Check your email for account verification and exclusive welcome offers
      </p>
    </div>
  );
};

export default RegistrationSuccess;
