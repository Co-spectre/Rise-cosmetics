import React from 'react';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import ReviewOrder from './ReviewOrder';

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface CheckoutFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  shippingInfo: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;
  paymentInfo: PaymentInfo;
  setPaymentInfo: (info: PaymentInfo) => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  currentStep,
  setCurrentStep,
  shippingInfo,
  setShippingInfo,
  paymentInfo,
  setPaymentInfo,
  onPlaceOrder,
  isProcessing
}) => {
  const validateShipping = () => {
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    return Boolean(required.every(field => shippingInfo[field as keyof ShippingInfo]?.trim()));
  };

  const validatePayment = () => {
    const { cardNumber, expiryDate, cvv, cardholderName } = paymentInfo;
    return Boolean(cardNumber?.trim() && expiryDate?.trim() && cvv?.trim() && cardholderName?.trim());
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateShipping()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validatePayment()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {currentStep === 1 && (
        <ShippingForm
          shippingInfo={shippingInfo}
          setShippingInfo={setShippingInfo}
          onNext={handleNextStep}
          isValid={validateShipping()}
        />
      )}

      {currentStep === 2 && (
        <PaymentForm
          paymentInfo={paymentInfo}
          setPaymentInfo={setPaymentInfo}
          shippingInfo={shippingInfo}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
          isValid={validatePayment()}
        />
      )}

      {currentStep === 3 && (
        <ReviewOrder
          shippingInfo={shippingInfo}
          paymentInfo={paymentInfo}
          onPlaceOrder={onPlaceOrder}
          onPrevious={handlePreviousStep}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default CheckoutForm;
