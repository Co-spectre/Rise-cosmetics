import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const FeatureStatus = () => {
  const features = [
    {
      name: 'User Authentication',
      status: 'completed',
      description: 'User registration, login, and profile management'
    },
    {
      name: 'Product Catalog',
      status: 'completed',
      description: 'Product browsing, search, and detailed views'
    },
    {
      name: 'Shopping Cart',
      status: 'completed',
      description: 'Add to cart, quantity management, and cart persistence'
    },
    {
      name: 'Checkout Process',
      status: 'in-progress',
      description: 'Order placement and shipping information collection'
    },
    {
      name: 'Payment Integration',
      status: 'planned',
      description: 'Stripe and PayPal payment processing'
    },
    {
      name: 'Order Management',
      status: 'in-progress',
      description: 'Order tracking, status updates, and history'
    },
    {
      name: 'Admin Dashboard',
      status: 'in-progress',
      description: 'Product management and order administration'
    },
    {
      name: 'Email Notifications',
      status: 'planned',
      description: 'Order confirmations and shipping updates'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'planned':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Feature Status</h1>
          <p className="text-xl text-gray-600">Current development progress and upcoming features</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(feature.status)}
                      <span>{feature.name}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feature.status)}`}>
                      {feature.status.replace('-', ' ')}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Have suggestions for new features? Contact us at{' '}
              <a href="mailto:feedback@risecosmetics.com" className="text-rose-600 hover:underline">
                feedback@risecosmetics.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FeatureStatus;
