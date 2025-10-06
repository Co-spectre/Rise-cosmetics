import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const calculateStrength = (pwd: string): number => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score += 1;
    return score;
  };

  const getStrengthLabel = (score: number): { label: string; color: string } => {
    switch (score) {
      case 0:
      case 1:
        return { label: 'Very Weak', color: 'bg-red-500' };
      case 2:
        return { label: 'Weak', color: 'bg-orange-500' };
      case 3:
        return { label: 'Good', color: 'bg-yellow-500' };
      case 4:
        return { label: 'Strong', color: 'bg-green-500' };
      case 5:
        return { label: 'Very Strong', color: 'bg-green-600' };
      default:
        return { label: 'Very Weak', color: 'bg-red-500' };
    }
  };

  if (!password) return null;

  const strength = calculateStrength(password);
  const { label, color } = getStrengthLabel(strength);

  return (
    <div className="mt-2 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-neutral-600 font-light">Password Strength:</span>
        <span className={`text-xs font-medium ${
          strength <= 2 ? 'text-red-600' : strength === 3 ? 'text-yellow-600' : 'text-green-600'
        }`}>
          {label}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors ${
              level <= strength ? color : 'bg-neutral-200'
            }`}
          />
        ))}
      </div>
      <div className="text-xs text-neutral-500 font-light space-y-1">
        <div className={`flex items-center space-x-2 ${password.length >= 8 ? 'text-green-600' : ''}`}>
          <span>{password.length >= 8 ? '✓' : '○'}</span>
          <span>At least 8 characters</span>
        </div>
        <div className={`flex items-center space-x-2 ${/[a-z]/.test(password) ? 'text-green-600' : ''}`}>
          <span>{/[a-z]/.test(password) ? '✓' : '○'}</span>
          <span>One lowercase letter</span>
        </div>
        <div className={`flex items-center space-x-2 ${/[A-Z]/.test(password) ? 'text-green-600' : ''}`}>
          <span>{/[A-Z]/.test(password) ? '✓' : '○'}</span>
          <span>One uppercase letter</span>
        </div>
        <div className={`flex items-center space-x-2 ${/\d/.test(password) ? 'text-green-600' : ''}`}>
          <span>{/\d/.test(password) ? '✓' : '○'}</span>
          <span>One number</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
