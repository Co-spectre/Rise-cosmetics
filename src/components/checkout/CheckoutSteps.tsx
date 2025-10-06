import React from 'react';

interface CheckoutStepsProps {
  currentStep: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, name: 'Shipping', description: 'Delivery information' },
    { number: 2, name: 'Payment', description: 'Payment details' },
    { number: 3, name: 'Review', description: 'Order confirmation' },
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                currentStep >= step.number
                  ? 'bg-stone-800 border-stone-800 text-white'
                  : 'bg-white border-stone-300 text-stone-500'
              }`}
            >
              {currentStep > step.number ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-stone-800' : 'text-stone-500'
                }`}
              >
                {step.name}
              </p>
              <p className="text-xs text-stone-500">{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 ${
                currentStep > step.number ? 'bg-stone-800' : 'bg-stone-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutSteps;
