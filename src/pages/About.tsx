import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import About from '@/components/About';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;