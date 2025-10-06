import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>Terms & Conditions</h1>
          <p className="lead">Last updated: January 2024</p>
          
          <h2>1. Introduction</h2>
          <p>Welcome to RISE Cosmetics. These terms and conditions outline the rules and regulations for the use of our website and services.</p>
          
          <h2>2. Products and Services</h2>
          <p>We offer premium cosmetic products designed to enhance your natural beauty. All products are crafted with the finest ingredients.</p>
          
          <h2>3. Orders and Payment</h2>
          <p>By placing an order, you agree to provide accurate information and authorize us to charge your selected payment method.</p>
          
          <h2>4. Shipping and Returns</h2>
          <p>We offer worldwide shipping. Returns are accepted within 30 days of purchase for unopened products.</p>
          
          <h2>5. Privacy Policy</h2>
          <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.</p>
          
          <h2>6. Contact Information</h2>
          <p>If you have any questions about these Terms & Conditions, please contact us at legal@risecosmetics.com</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
