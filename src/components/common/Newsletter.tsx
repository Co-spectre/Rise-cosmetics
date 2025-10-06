
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import '../../styles/smooth-transitions.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to RISE",
        description: "You'll receive our latest updates and exclusive offers.",
      });
      setEmail('');
    }
  };

  return (
    <section className="py-32 bg-white border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-playfair font-light text-black mb-8 tracking-wide">
          Stay Connected
        </h2>
        
        <div className="w-16 h-px bg-black mx-auto mb-8" />
        
        <p className="text-lg text-neutral-600 mb-16 max-w-2xl mx-auto font-light">
          Subscribe to receive updates on new collections, wellness insights, 
          and exclusive offers from our conscious beauty community.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-0 border border-black smooth-card">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 border-0 focus:outline-none bg-white font-light text-sm smooth-focus"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-black text-white border-l border-black hover:bg-neutral-800 transition-all duration-200 flex items-center justify-center space-x-2 smooth-button"
            >
              <Send className="w-4 h-4" strokeWidth={1} />
              <span className="font-light text-sm tracking-wide uppercase">Subscribe</span>
            </button>
          </div>
        </form>

        <p className="text-xs text-neutral-500 mt-6 tracking-wide">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
