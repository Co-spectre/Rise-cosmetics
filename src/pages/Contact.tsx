import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-olive-50 to-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-6xl sm:text-7xl font-light text-olive-900 mb-8 tracking-wider">
              Contact Us
            </h1>
            <div className="w-24 h-px bg-olive-600 mx-auto mb-8" />
            <p className="text-xl text-olive-700 max-w-3xl mx-auto font-light leading-relaxed">
              We'd love to hear from you. Reach out with any questions about our products or skincare advice.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Contact Information */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-light text-olive-900 mb-8 tracking-wide">
                    Get in Touch
                  </h2>
                  <p className="text-olive-800 leading-relaxed mb-8">
                    Our team is here to help you discover the perfect skincare routine. 
                    Whether you have questions about ingredients, need application advice, 
                    or want to learn more about our rice-based formulations, we're here for you.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-olive-100 p-3 rounded-full">
                      <MapPin className="w-5 h-5 text-olive-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-olive-900 mb-2">Visit Our Boutique</h3>
                      <p className="text-olive-700">
                        123 Beauty Lane<br />
                        Cosmetics District<br />
                        Milan, Italy 20121
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-olive-100 p-3 rounded-full">
                      <Phone className="w-5 h-5 text-olive-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-olive-900 mb-2">Call Us</h3>
                      <p className="text-olive-700">+39 02 1234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-olive-100 p-3 rounded-full">
                      <Mail className="w-5 h-5 text-olive-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-olive-900 mb-2">Email Us</h3>
                      <p className="text-olive-700">hello@risecosmetics.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-olive-100 p-3 rounded-full">
                      <Clock className="w-5 h-5 text-olive-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-olive-900 mb-2">Business Hours</h3>
                      <p className="text-olive-700">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-olive-50/30 p-8">
                <h2 className="text-3xl font-light text-olive-900 mb-8 tracking-wide">
                  Send us a Message
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-olive-100 border border-olive-300 text-olive-800">
                    Thank you for your message! We'll get back to you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-olive-900 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-olive-200 focus:border-olive-600 focus:outline-none transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-olive-900 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-olive-200 focus:border-olive-600 focus:outline-none transition-colors bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-olive-900 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-olive-200 focus:border-olive-600 focus:outline-none transition-colors bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-olive-900 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-olive-200 focus:border-olive-600 focus:outline-none transition-colors bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-olive-600 text-white py-4 px-6 hover:bg-olive-700 disabled:bg-olive-400 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-16 bg-olive-50/20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-light text-olive-900 mb-8 tracking-wide">
              Skincare Consultation
            </h2>
            <p className="text-olive-800 max-w-2xl mx-auto leading-relaxed mb-8">
              Book a complimentary 30-minute consultation with our skincare experts to create 
              a personalized routine tailored to your skin's unique needs.
            </p>
            <button className="bg-olive-600 text-white py-3 px-8 hover:bg-olive-700 transition-colors duration-200">
              Book Consultation
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
