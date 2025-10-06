import React from 'react';
import { ShippingInfo } from '@/pages/Checkout';
import '../../styles/smooth-transitions.css';

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;
  onNext: () => void;
  isValid: boolean;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingInfo,
  setShippingInfo,
  onNext,
  isValid
}) => {
  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo({
      ...shippingInfo,
      [field]: value
    });
  };

  const inputClasses = "w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors smooth-focus";
  const labelClasses = "block text-sm font-medium text-stone-700 mb-2";

  return (
    <div>
      <h2 className="text-xl font-playfair font-light text-stone-800 mb-6">
        Shipping Information
      </h2>

      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={labelClasses}>
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={shippingInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClasses}>
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={shippingInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={shippingInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={shippingInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className={labelClasses}>
            Address *
          </label>
          <input
            type="text"
            id="address"
            value={shippingInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={inputClasses}
            placeholder="Street address, apartment, suite, etc."
            required
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className={labelClasses}>
              City *
            </label>
            <input
              type="text"
              id="city"
              value={shippingInfo.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label htmlFor="state" className={labelClasses}>
              State *
            </label>
            <input
              type="text"
              id="state"
              value={shippingInfo.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label htmlFor="zipCode" className={labelClasses}>
              ZIP Code *
            </label>
            <input
              type="text"
              id="zipCode"
              value={shippingInfo.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className={inputClasses}
              required
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className={labelClasses}>
            Country *
          </label>
          <select
            id="country"
            value={shippingInfo.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className={inputClasses}
            required
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Italy">Italy</option>
            <option value="Spain">Spain</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <button
            onClick={onNext}
            disabled={!isValid}
            className={`w-full py-3 px-6 text-white font-light text-sm tracking-wider uppercase transition-colors smooth-button ${
              isValid
                ? 'bg-stone-800 hover:bg-stone-700'
                : 'bg-stone-400 cursor-not-allowed'
            }`}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
