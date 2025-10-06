import React, { useState } from 'react';
import { PaymentInfo, ShippingInfo } from '@/pages/Checkout';
import '../../styles/smooth-transitions.css';

interface PaymentFormProps {
  paymentInfo: PaymentInfo;
  setPaymentInfo: (info: PaymentInfo) => void;
  shippingInfo: ShippingInfo;
  onNext: () => void;
  onPrevious: () => void;
  isValid: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentInfo,
  setPaymentInfo,
  shippingInfo,
  onNext,
  onPrevious,
  isValid
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof PaymentInfo, value: string | boolean) => {
    if (field === 'sameAsShipping' && typeof value === 'boolean') {
      setPaymentInfo({
        ...paymentInfo,
        [field]: value,
        billingAddress: value ? { ...shippingInfo } : paymentInfo.billingAddress
      });
    } else {
      setPaymentInfo({
        ...paymentInfo,
        [field]: value
      });
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleBillingAddressChange = (field: keyof ShippingInfo, value: string) => {
    setPaymentInfo({
      ...paymentInfo,
      billingAddress: {
        ...paymentInfo.billingAddress,
        [field]: value
      }
    });
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substr(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return numbers.substr(0, 2) + '/' + numbers.substr(2, 2);
    }
    return numbers;
  };

  const validateCardNumber = (cardNumber: string) => {
    const numbers = cardNumber.replace(/\D/g, '');
    return numbers.length === 16;
  };

  const validateExpiryDate = (expiryDate: string) => {
    const [month, year] = expiryDate.split('/');
    if (!month || !year || month.length !== 2 || year.length !== 2) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
  };

  const validateCvv = (cvv: string) => {
    return cvv.length === 3 || cvv.length === 4;
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    handleInputChange('cardNumber', formatted);
  };

  const handleExpiryDateChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    handleInputChange('expiryDate', formatted);
  };

  const inputClasses = "w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors smooth-focus";
  const labelClasses = "block text-sm font-medium text-stone-700 mb-2";

  return (
    <div>
      <h2 className="text-xl font-playfair font-light text-stone-800 mb-6">
        Payment Information
      </h2>

      <div className="space-y-6">
        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className={labelClasses}>
            Card Number *
          </label>
          <input
            type="text"
            id="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            className={inputClasses}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
          />
          {!validateCardNumber(paymentInfo.cardNumber) && paymentInfo.cardNumber && (
            <p className="text-red-600 text-sm mt-1">Please enter a valid 16-digit card number</p>
          )}
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className={labelClasses}>
              Expiry Date *
            </label>
            <input
              type="text"
              id="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={(e) => handleExpiryDateChange(e.target.value)}
              className={inputClasses}
              placeholder="MM/YY"
              maxLength={5}
              required
            />
            {!validateExpiryDate(paymentInfo.expiryDate) && paymentInfo.expiryDate && (
              <p className="text-red-600 text-sm mt-1">Invalid expiry date</p>
            )}
          </div>
          <div>
            <label htmlFor="cvv" className={labelClasses}>
              CVV *
            </label>
            <input
              type="text"
              id="cvv"
              value={paymentInfo.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substr(0, 4))}
              className={inputClasses}
              placeholder="123"
              maxLength={4}
              required
            />
            {!validateCvv(paymentInfo.cvv) && paymentInfo.cvv && (
              <p className="text-red-600 text-sm mt-1">Invalid CVV</p>
            )}
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label htmlFor="cardholderName" className={labelClasses}>
            Cardholder Name *
          </label>
          <input
            type="text"
            id="cardholderName"
            value={paymentInfo.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        {/* Billing Address */}
        <div className="border-t border-stone-200 pt-6">
          <h3 className="text-lg font-playfair font-light text-stone-800 mb-4">
            Billing Address
          </h3>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={paymentInfo.sameAsShipping}
                onChange={(e) => handleInputChange('sameAsShipping', e.target.checked)}
                className="w-4 h-4 text-stone-600 bg-white border-stone-300 rounded focus:ring-stone-500"
              />
              <span className="ml-2 text-sm text-stone-700">
                Same as shipping address
              </span>
            </label>
          </div>

          {!paymentInfo.sameAsShipping && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="billingFirstName" className={labelClasses}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="billingFirstName"
                    value={paymentInfo.billingAddress.firstName}
                    onChange={(e) => handleBillingAddressChange('firstName', e.target.value)}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="billingLastName" className={labelClasses}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="billingLastName"
                    value={paymentInfo.billingAddress.lastName}
                    onChange={(e) => handleBillingAddressChange('lastName', e.target.value)}
                    className={inputClasses}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="billingAddress" className={labelClasses}>
                  Address *
                </label>
                <input
                  type="text"
                  id="billingAddress"
                  value={paymentInfo.billingAddress.address}
                  onChange={(e) => handleBillingAddressChange('address', e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="billingCity" className={labelClasses}>
                    City *
                  </label>
                  <input
                    type="text"
                    id="billingCity"
                    value={paymentInfo.billingAddress.city}
                    onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="billingState" className={labelClasses}>
                    State *
                  </label>
                  <input
                    type="text"
                    id="billingState"
                    value={paymentInfo.billingAddress.state}
                    onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="billingZipCode" className={labelClasses}>
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="billingZipCode"
                    value={paymentInfo.billingAddress.zipCode}
                    onChange={(e) => handleBillingAddressChange('zipCode', e.target.value)}
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            onClick={onPrevious}
            className="flex-1 py-3 px-6 border border-stone-300 text-stone-700 font-light text-sm tracking-wider uppercase hover:bg-stone-50 transition-colors smooth-button"
          >
            Back to Shipping
          </button>
          <button
            onClick={onNext}
            disabled={!isValid}
            className={`flex-1 py-3 px-6 text-white font-light text-sm tracking-wider uppercase transition-colors smooth-button ${
              isValid
                ? 'bg-stone-800 hover:bg-stone-700'
                : 'bg-stone-400 cursor-not-allowed'
            }`}
          >
            Review Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
