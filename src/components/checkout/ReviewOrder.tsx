import React from 'react';
import { PaymentInfo, ShippingInfo } from '@/pages/Checkout';
import { useCart } from '@/contexts/CartContext';
import '../../styles/smooth-transitions.css';

interface ReviewOrderProps {
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  onPlaceOrder: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
}

const ReviewOrder: React.FC<ReviewOrderProps> = ({
  shippingInfo,
  paymentInfo,
  onPlaceOrder,
  onPrevious,
  isProcessing
}) => {
  const { totalPrice } = useCart();
  const shipping = 5.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  const billingAddress = paymentInfo.sameAsShipping ? shippingInfo : paymentInfo.billingAddress;

  return (
    <div>
      <h2 className="text-xl font-playfair font-light text-stone-800 mb-6">
        Review Your Order
      </h2>

      <div className="space-y-6">
        {/* Shipping Information */}
        <div className="p-4 bg-stone-50 rounded-lg">
          <h3 className="font-medium text-stone-800 mb-3">Shipping Address</h3>
          <div className="text-sm text-stone-600 space-y-1">
            <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
            <p>{shippingInfo.address}</p>
            <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
            <p>{shippingInfo.country}</p>
            <p>{shippingInfo.email}</p>
            {shippingInfo.phone && <p>{shippingInfo.phone}</p>}
          </div>
        </div>

        {/* Payment Information */}
        <div className="p-4 bg-stone-50 rounded-lg">
          <h3 className="font-medium text-stone-800 mb-3">Payment Method</h3>
          <div className="text-sm text-stone-600 space-y-1">
            <p>Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
            <p>Expires {paymentInfo.expiryDate}</p>
            <p>Cardholder: {paymentInfo.cardholderName}</p>
          </div>
        </div>

        {/* Billing Address */}
        <div className="p-4 bg-stone-50 rounded-lg">
          <h3 className="font-medium text-stone-800 mb-3">Billing Address</h3>
          <div className="text-sm text-stone-600 space-y-1">
            {paymentInfo.sameAsShipping ? (
              <p className="italic">Same as shipping address</p>
            ) : (
              <>
                <p>{billingAddress.firstName} {billingAddress.lastName}</p>
                <p>{billingAddress.address}</p>
                <p>{billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}</p>
                <p>{billingAddress.country}</p>
              </>
            )}
          </div>
        </div>

        {/* Order Total */}
        <div className="p-4 bg-stone-50 rounded-lg">
          <h3 className="font-medium text-stone-800 mb-3">Order Total</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-600">Subtotal</span>
              <span className="text-stone-800">€{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Shipping</span>
              <span className="text-stone-800">€{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Tax</span>
              <span className="text-stone-800">€{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-base pt-2 border-t border-stone-200">
              <span className="text-stone-800">Total</span>
              <span className="text-stone-800">€{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">
              <p className="text-amber-800 font-medium mb-1">Please review your order carefully</p>
              <p className="text-amber-700">
                By placing this order, you agree to our{' '}
                <a href="/terms" className="underline hover:text-amber-900">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="underline hover:text-amber-900">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            onClick={onPrevious}
            disabled={isProcessing}
            className="flex-1 py-3 px-6 border border-stone-300 text-stone-700 font-light text-sm tracking-wider uppercase hover:bg-stone-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed smooth-button"
          >
            Back to Payment
          </button>
          <button
            onClick={onPlaceOrder}
            disabled={isProcessing}
            className="flex-1 py-3 px-6 bg-green-600 text-white font-light text-sm tracking-wider uppercase hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center smooth-button"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
