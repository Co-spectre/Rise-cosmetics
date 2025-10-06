import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  Lock, 
  Shield, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Edit3,
  Plus,
  Minus,
  X,
  Gift,
  Tag,
  MapPin,
  Phone,
  Mail,
  User,
  Banknote,
  Smartphone,
  Bitcoin,
  Check,
  Package
} from 'lucide-react';

const Checkout = () => {
  const { items, totalPrice, clearCart, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [guestCheckout, setGuestCheckout] = useState(false);

  const [shippingData, setShippingData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Italy'
  });

  const [billingData, setBillingData] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Italy'
  });

  const steps = [
    { id: 1, title: 'Information', icon: User, completed: currentStep > 1 },
    { id: 2, title: 'Shipping', icon: Truck, completed: currentStep > 2 },
    { id: 3, title: 'Payment', icon: CreditCard, completed: currentStep > 3 },
    { id: 4, title: 'Review', icon: CheckCircle, completed: false }
  ];

  const paymentMethods = [
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Pay with Touch ID or Face ID',
      color: 'bg-black text-white'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">P</div>,
      description: 'Pay with your PayPal account',
      color: 'bg-blue-600 text-white'
    },
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Visa, Mastercard, American Express',
      color: 'bg-gray-800 text-white'
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: <Banknote className="w-5 h-5" />,
      description: 'Direct bank transfer (SEPA)',
      color: 'bg-green-600 text-white'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <Bitcoin className="w-5 h-5" />,
      description: 'Bitcoin, Ethereum, USDC',
      color: 'bg-orange-500 text-white'
    }
  ];

  const shippingOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 5.99, time: '5-7 business days' },
    { id: 'express', name: 'Express Delivery', price: 12.99, time: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Express', price: 24.99, time: 'Next business day' }
  ];

  const [selectedShipping, setSelectedShipping] = useState('standard');

  const subtotal = totalPrice;
  const shippingCost = shippingOptions.find(opt => opt.id === selectedShipping)?.price || 5.99;
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
  const tax = (subtotal - discount + shippingCost) * 0.09; // 9% tax
  const finalTotal = subtotal - discount + shippingCost + tax;

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setOrderPlaced(true);
    clearCart();
    setLoading(false);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'rise10') {
      setPromoApplied(true);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Success Page
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rice-50/50 to-olive-50/30">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl font-light text-olive-900 mb-4 tracking-wide">Order Confirmed!</h1>
            <p className="text-xl text-olive-700/80 mb-8 leading-relaxed">
              Thank you for choosing RISE Cosmetics. Your order is being prepared with love and care.
            </p>
            <div className="bg-white/70 backdrop-blur-sm border border-olive-100 rounded-xl p-6 mb-8">
              <p className="text-olive-800 font-medium mb-2">Order #RISE-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p className="text-olive-700/80">We've sent a confirmation email to {shippingData.email}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-olive-600 hover:bg-olive-700 text-white px-8 py-3">
                <Link to="/products">Continue Shopping</Link>
              </Button>
              <Button variant="outline" className="border-olive-300 text-olive-700 hover:bg-olive-50 px-8 py-3">
                Track Your Order
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Empty Cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rice-50/50 to-olive-50/30">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-olive-600" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-light text-olive-900 mb-4 tracking-wide">Your cart is empty</h1>
            <p className="text-olive-700/80 mb-8 leading-relaxed">
              Discover our premium skincare collection and add some products to your cart.
            </p>
            <Button asChild className="bg-olive-600 hover:bg-olive-700 text-white px-8 py-3">
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice-50/30 to-white">
      <Header />
      
      {/* Progress Bar */}
      <div className="border-b border-olive-100/50 bg-white/70 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <Link to="/cart" className="flex items-center gap-2 text-olive-700 hover:text-olive-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Cart</span>
            </Link>
            
            <div className="flex items-center gap-6">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center gap-3 ${
                    currentStep === step.id ? 'text-olive-900' : 
                    step.completed ? 'text-olive-600' : 'text-olive-400'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentStep === step.id ? 'bg-olive-600 text-white scale-110' :
                      step.completed ? 'bg-olive-100 text-olive-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.completed ? <CheckCircle className="w-5 h-5" /> : 
                       currentStep === step.id ? step.id : 
                       <step.icon className="w-5 h-5" />}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium">{step.title}</p>
                      <p className="text-xs text-olive-500">
                        {step.id === 1 ? 'Personal details' :
                         step.id === 2 ? 'Delivery options' :
                         step.id === 3 ? 'Payment method' :
                         'Order confirmation'}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 transition-colors duration-300 ${
                      step.completed ? 'bg-olive-300' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <div className="text-right">
              <p className="text-sm text-olive-600">Total</p>
              <p className="font-medium text-olive-900 text-lg">€{finalTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Checkout Form */}
            <div className="lg:col-span-2">
              
              {/* Step 1: Customer Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Express Checkout */}
                  <Card className="border-olive-100/50 bg-white/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl font-light text-olive-900 tracking-wide">Express Checkout</CardTitle>
                      <p className="text-olive-600">Choose a quick payment option or continue below</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 p-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                          <Smartphone className="w-5 h-5" />
                          <span className="font-medium">Apple Pay</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105">
                          <div className="w-5 h-5 bg-white rounded text-blue-600 flex items-center justify-center text-xs font-bold">P</div>
                          <span className="font-medium">PayPal</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-olive-200"></div>
                        <span className="text-sm text-olive-600 px-4">OR CONTINUE WITH</span>
                        <div className="flex-1 h-px bg-olive-200"></div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personal Information */}
                  <Card className="border-olive-100/50 bg-white/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl font-light text-olive-900 tracking-wide">
                        <div className="w-10 h-10 bg-olive-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-olive-600" />
                        </div>
                        Personal Information
                      </CardTitle>
                      <p className="text-olive-600 ml-13">We'll use this information to contact you about your order</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-olive-800 mb-3">First Name *</label>
                          <Input
                            value={shippingData.firstName}
                            onChange={(e) => setShippingData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-olive-800 mb-3">Last Name *</label>
                          <Input
                            value={shippingData.lastName}
                            onChange={(e) => setShippingData(prev => ({ ...prev, lastName: e.target.value }))}
                            className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-olive-800 mb-3">Email Address *</label>
                        <Input
                          type="email"
                          value={shippingData.email}
                          onChange={(e) => setShippingData(prev => ({ ...prev, email: e.target.value }))}
                          className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                          placeholder="your@email.com"
                          required
                        />
                        <p className="text-sm text-olive-600 mt-2">We'll send your order confirmation here</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-olive-800 mb-3">Phone Number</label>
                        <Input
                          type="tel"
                          value={shippingData.phone}
                          onChange={(e) => setShippingData(prev => ({ ...prev, phone: e.target.value }))}
                          className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                          placeholder="+39 XXX XXX XXXX"
                        />
                        <p className="text-sm text-olive-600 mt-2">For delivery updates (optional)</p>
                      </div>
                      
                      <div className="pt-6 border-t border-olive-200">
                        <h3 className="flex items-center gap-3 text-xl font-light text-olive-900 mb-6">
                          <div className="w-8 h-8 bg-olive-100 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-olive-600" />
                          </div>
                          Delivery Address
                        </h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold text-olive-800 mb-3">Street Address *</label>
                            <Input
                              value={shippingData.address}
                              onChange={(e) => setShippingData(prev => ({ ...prev, address: e.target.value }))}
                              className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                              placeholder="123 Via Roma"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-olive-800 mb-3">Apartment, Suite, etc.</label>
                            <Input
                              value={shippingData.apartment}
                              onChange={(e) => setShippingData(prev => ({ ...prev, apartment: e.target.value }))}
                              className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                              placeholder="Apt 4B, Suite 100"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="block text-sm font-semibold text-olive-800 mb-3">City *</label>
                              <Input
                                value={shippingData.city}
                                onChange={(e) => setShippingData(prev => ({ ...prev, city: e.target.value }))}
                                className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                                placeholder="Milano"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-olive-800 mb-3">State/Province</label>
                              <Input
                                value={shippingData.state}
                                onChange={(e) => setShippingData(prev => ({ ...prev, state: e.target.value }))}
                                className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                                placeholder="Lombardy"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-olive-800 mb-3">Postal Code *</label>
                              <Input
                                value={shippingData.zipCode}
                                onChange={(e) => setShippingData(prev => ({ ...prev, zipCode: e.target.value }))}
                                className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                                placeholder="20121"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-8">
                        <Button onClick={handleNextStep} className="bg-olive-600 hover:bg-olive-700 text-white px-12 py-3 text-lg h-14 rounded-xl">
                          Continue to Shipping
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 2: Shipping Options */}
              {currentStep === 2 && (
                <Card className="border-olive-100/50 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-light text-olive-900 tracking-wide">
                      <div className="w-10 h-10 bg-olive-100 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-olive-600" />
                      </div>
                      Shipping Method
                    </CardTitle>
                    <p className="text-olive-600 ml-13">Choose how you'd like to receive your order</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {shippingOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          selectedShipping === option.id
                            ? 'border-olive-400 bg-olive-50/50 shadow-md'
                            : 'border-olive-200 hover:border-olive-300'
                        }`}
                        onClick={() => setSelectedShipping(option.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                              selectedShipping === option.id ? 'border-olive-600 bg-olive-600' : 'border-gray-300'
                            }`}>
                              {selectedShipping === option.id && (
                                <div className="w-3 h-3 bg-white rounded-full m-0.5"></div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-olive-900 text-lg">{option.name}</p>
                              <p className="text-olive-600">{option.time}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-olive-900 text-xl">€{option.price.toFixed(2)}</span>
                            {option.id === 'standard' && (
                              <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mt-1">
                                Most Popular
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4 pt-8">
                      <Button variant="outline" onClick={handlePrevStep} className="border-olive-200 px-8 py-3 h-12">
                        Back to Information
                      </Button>
                      <Button onClick={handleNextStep} className="flex-1 bg-olive-600 hover:bg-olive-700 text-white px-12 py-3 text-lg h-12">
                        Continue to Payment
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Payment Methods */}
              {currentStep === 3 && (
                <Card className="border-olive-100/50 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-light text-olive-900 tracking-wide">
                      <div className="w-10 h-10 bg-olive-100 rounded-full flex items-center justify-center">
                        <Lock className="w-5 h-5 text-olive-600" />
                      </div>
                      Payment Method
                    </CardTitle>
                    <p className="text-olive-600 ml-13">Select your preferred payment option</p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            selectedPaymentMethod === method.id
                              ? 'border-olive-400 bg-olive-50/50 shadow-md'
                              : 'border-olive-200 hover:border-olive-300'
                          }`}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                                selectedPaymentMethod === method.id ? 'border-olive-600 bg-olive-600' : 'border-gray-300'
                              }`}>
                                {selectedPaymentMethod === method.id && (
                                  <div className="w-3 h-3 bg-white rounded-full m-0.5"></div>
                                )}
                              </div>
                              <div className={`p-3 rounded-xl ${method.color} shadow-md`}>
                                {method.icon}
                              </div>
                              <div>
                                <p className="font-semibold text-olive-900 text-lg">{method.name}</p>
                                <p className="text-olive-600">{method.description}</p>
                              </div>
                            </div>
                            {method.id === 'apple-pay' && (
                              <div className="text-xs bg-olive-100 text-olive-700 px-3 py-1 rounded-full font-medium">
                                Express
                              </div>
                            )}
                          </div>

                          {/* Enhanced Payment Forms */}
                          {selectedPaymentMethod === method.id && (
                            <div className="mt-6 pt-6 border-t border-olive-200">
                              {method.id === 'credit-card' && (
                                <div className="space-y-6">
                                  <div>
                                    <label className="block text-sm font-semibold text-olive-800 mb-3">Card Number *</label>
                                    <Input 
                                      placeholder="1234 5678 9012 3456" 
                                      className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl text-lg tracking-wider"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-semibold text-olive-800 mb-3">Cardholder Name *</label>
                                    <Input 
                                      placeholder="Name on card" 
                                      className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-6">
                                    <div>
                                      <label className="block text-sm font-semibold text-olive-800 mb-3">Expiry Date *</label>
                                      <Input 
                                        placeholder="MM/YY" 
                                        className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-semibold text-olive-800 mb-3">CVC *</label>
                                      <Input 
                                        placeholder="123" 
                                        className="border-2 border-olive-200 focus:border-olive-400 h-12 rounded-xl"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {method.id === 'bank-transfer' && (
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                                  <div className="flex items-start gap-3">
                                    <Banknote className="w-6 h-6 text-blue-600 mt-1" />
                                    <div>
                                      <p className="font-semibold text-blue-800 mb-2">Bank Transfer Details</p>
                                      <p className="text-blue-700 text-sm leading-relaxed">
                                        You will receive detailed bank transfer instructions after placing your order. 
                                        Payment must be completed within 3 business days.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {method.id === 'crypto' && (
                                <div className="space-y-6">
                                  <div>
                                    <label className="block text-sm font-semibold text-olive-800 mb-3">Select Cryptocurrency</label>
                                    <div className="grid grid-cols-3 gap-3">
                                      <button className="p-4 border-2 border-orange-200 rounded-xl text-sm hover:bg-orange-50 hover:border-orange-300 transition-colors">
                                        <Bitcoin className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                                        Bitcoin
                                      </button>
                                      <button className="p-4 border-2 border-orange-200 rounded-xl text-sm hover:bg-orange-50 hover:border-orange-300 transition-colors">
                                        <div className="w-6 h-6 bg-purple-500 rounded-full mx-auto mb-2"></div>
                                        Ethereum
                                      </button>
                                      <button className="p-4 border-2 border-orange-200 rounded-xl text-sm hover:bg-orange-50 hover:border-orange-300 transition-colors">
                                        <div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-2"></div>
                                        USDC
                                      </button>
                                    </div>
                                  </div>
                                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200">
                                    <div className="flex items-start gap-3">
                                      <Bitcoin className="w-6 h-6 text-orange-500 mt-1" />
                                      <div>
                                        <p className="font-semibold text-orange-800 mb-2">Crypto Payment Process</p>
                                        <p className="text-orange-700 text-sm leading-relaxed">
                                          After order confirmation, you'll receive a secure wallet address and QR code 
                                          for payment. Transaction must be completed within 15 minutes.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {(method.id === 'apple-pay' || method.id === 'paypal') && (
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                                  <div className="flex items-start gap-3">
                                    {method.id === 'apple-pay' ? <Smartphone className="w-6 h-6 text-gray-600 mt-1" /> : <div className="w-6 h-6 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold mt-1">P</div>}
                                    <div>
                                      <p className="font-semibold text-gray-800 mb-2">Secure Redirect</p>
                                      <p className="text-gray-700 text-sm leading-relaxed">
                                        You will be securely redirected to complete your payment. 
                                        Your information is protected and never stored on our servers.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Security Notice */}
                    <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <Shield className="w-8 h-8 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-lg font-semibold text-green-800 mb-2">Your Payment is Secure</p>
                        <p className="text-green-700 leading-relaxed">
                          All transactions are encrypted with 256-bit SSL security. We use industry-standard 
                          security measures and never store your payment information on our servers.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-8">
                      <Button variant="outline" onClick={handlePrevStep} className="border-olive-200 px-8 py-3 h-12">
                        Back to Shipping
                      </Button>
                      <Button 
                        onClick={handleNextStep}
                        disabled={!selectedPaymentMethod}
                        className="flex-1 bg-olive-600 hover:bg-olive-700 text-white px-12 py-3 text-lg h-12 disabled:bg-gray-400"
                      >
                        Review Order
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Order Review & Summary */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  {/* Order Summary Header */}
                  <Card className="border-olive-100/50 bg-gradient-to-r from-olive-50/50 to-rice-50/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-3xl font-light text-olive-900 tracking-wide">
                        <div className="w-12 h-12 bg-olive-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        Review Your Order
                      </CardTitle>
                      <p className="text-olive-600 ml-15 text-lg">Please review all details before completing your purchase</p>
                    </CardHeader>
                  </Card>

                  {/* Customer Information Summary */}
                  <Card className="border-olive-100/50 bg-white/70 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-xl font-light text-olive-900">
                        <User className="w-5 h-5 text-olive-600" />
                        Contact Information
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="text-olive-600 hover:text-olive-800">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-olive-50/50 rounded-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm font-medium text-olive-600 mb-1">Name</p>
                            <p className="text-olive-900 text-lg">{shippingData.firstName} {shippingData.lastName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-olive-600 mb-1">Email</p>
                            <p className="text-olive-900 text-lg">{shippingData.email}</p>
                          </div>
                          {shippingData.phone && (
                            <div>
                              <p className="text-sm font-medium text-olive-600 mb-1">Phone</p>
                              <p className="text-olive-900 text-lg">{shippingData.phone}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Information Summary */}
                  <Card className="border-olive-100/50 bg-white/70 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-xl font-light text-olive-900">
                        <MapPin className="w-5 h-5 text-olive-600" />
                        Shipping Address
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="text-olive-600 hover:text-olive-800">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-rice-50/50 rounded-xl p-6">
                        <p className="text-olive-900 text-lg leading-relaxed">
                          {shippingData.address}
                          {shippingData.apartment && <><br />{shippingData.apartment}</>}
                          <br />
                          {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                          <br />
                          {shippingData.country}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Method Summary */}
                  <Card className="border-olive-100/50 bg-white/70 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-xl font-light text-olive-900">
                        <Truck className="w-5 h-5 text-olive-600" />
                        Shipping Method
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} className="text-olive-600 hover:text-olive-800">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-olive-50/50 rounded-xl p-6">
                        {(() => {
                          const selectedOption = shippingOptions.find(opt => opt.id === selectedShipping);
                          return (
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-olive-900 text-lg font-medium">{selectedOption?.name}</p>
                                <p className="text-olive-600">{selectedOption?.time}</p>
                              </div>
                              <span className="text-olive-900 text-xl font-semibold">€{selectedOption?.price.toFixed(2)}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Method Summary */}
                  <Card className="border-olive-100/50 bg-white/70 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-xl font-light text-olive-900">
                        <CreditCard className="w-5 h-5 text-olive-600" />
                        Payment Method
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)} className="text-olive-600 hover:text-olive-800">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-rice-50/50 rounded-xl p-6">
                        {(() => {
                          const selectedMethod = paymentMethods.find(method => method.id === selectedPaymentMethod);
                          return (
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl ${selectedMethod?.color} shadow-md`}>
                                {selectedMethod?.icon}
                              </div>
                              <div>
                                <p className="text-olive-900 text-lg font-medium">{selectedMethod?.name}</p>
                                <p className="text-olive-600">{selectedMethod?.description}</p>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Items Summary */}
                  <Card className="border-olive-100/50 bg-white/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-xl font-light text-olive-900">
                        <ShoppingBag className="w-5 h-5 text-olive-600" />
                        Order Items ({items.length} {items.length === 1 ? 'item' : 'items'})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex gap-4 p-4 bg-gradient-to-r from-olive-50/30 to-rice-50/30 rounded-xl border border-olive-100/50">
                            <div className="relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-xl shadow-md"
                              />
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-olive-600 text-white text-sm rounded-full flex items-center justify-center font-medium">
                                {item.quantity}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-olive-900 text-lg mb-1">{item.name}</h4>
                              <p className="text-olive-600 mb-2">{item.subtitle}</p>
                              <div className="flex items-center justify-between">
                                <p className="text-olive-700">Qty: {item.quantity}</p>
                                <p className="font-bold text-olive-900 text-xl">€{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Final Actions */}
                  <Card className="border-olive-100/50 bg-gradient-to-r from-olive-600 to-olive-700 text-white">
                    <CardContent className="pt-8">
                      <div className="flex items-center justify-center mb-6">
                        <Lock className="w-6 h-6 mr-3" />
                        <p className="text-lg">Your order is secured with SSL encryption</p>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button 
                          variant="outline" 
                          onClick={handlePrevStep} 
                          className="border-white text-olive-700 bg-white hover:bg-gray-50 px-8 py-3 h-14"
                        >
                          Back to Payment
                        </Button>
                        <Button 
                          onClick={handlePlaceOrder}
                          disabled={loading}
                          className="flex-1 bg-white text-olive-700 hover:bg-gray-50 px-12 py-3 text-xl font-semibold h-14 shadow-lg"
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-olive-600 mr-3"></div>
                              Processing Your Order...
                            </>
                          ) : (
                            <>
                              Complete Purchase • €{finalTotal.toFixed(2)}
                              <CheckCircle className="w-6 h-6 ml-3" />
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32 border-olive-100/50 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-light text-olive-900 tracking-wide">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Cart Items */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 bg-olive-50/30 rounded-lg">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-olive-600 text-white text-xs rounded-full flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-olive-900 text-sm truncate">{item.name}</h4>
                          <p className="text-sm text-olive-600">{item.subtitle}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-6 h-6 flex items-center justify-center rounded border border-olive-300 hover:bg-olive-100"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center rounded border border-olive-300 hover:bg-olive-100"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-olive-900">€{(item.price * item.quantity).toFixed(2)}</span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="border-olive-200"
                      />
                      <Button
                        variant="outline"
                        onClick={applyPromoCode}
                        className="border-olive-200"
                      >
                        <Tag className="w-4 h-4" />
                      </Button>
                    </div>
                    {promoApplied && (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Promo code "RISE10" applied!</span>
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 pt-4 border-t border-olive-200">
                    <div className="flex justify-between text-olive-700">
                      <span>Subtotal</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-€{discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-olive-700">
                      <span>Shipping</span>
                      <span>€{shippingCost.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-olive-700">
                      <span>Tax (9%)</span>
                      <span>€{tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between font-bold text-lg text-olive-900 pt-3 border-t border-olive-300">
                      <span>Total</span>
                      <span>€{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-olive-200">
                    <div className="flex items-center gap-2 text-xs text-olive-600">
                      <Lock className="w-4 h-4" />
                      <span>SSL Secure</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-olive-600">
                      <Shield className="w-4 h-4" />
                      <span>Money Back</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-olive-600">
                      <Truck className="w-4 h-4" />
                      <span>Free Returns</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-olive-600">
                      <Gift className="w-4 h-4" />
                      <span>Gift Wrapping</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
