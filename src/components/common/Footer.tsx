
import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const quickLinks = [
    { name: 'Shop All', href: '#products' },
    { name: 'Collections', href: '#collections' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const supportLinks = [
    { name: 'FAQ', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Size Guide', href: '#' },
  ];

  return (
    <footer className="bg-holistic-100 text-holistic-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-playfair font-light mb-4 tracking-wider text-holistic-900">RISE</h3>
            <p className="text-xs text-holistic-600 mb-8 tracking-widest">COSMETICS</p>
            <p className="text-holistic-700 mb-8 font-light leading-relaxed">
              Natural and vegan cosmetics based on sprouted rice. 
              Crafted in Italy with intention for conscious beauty rituals.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 border border-holistic-300 hover:bg-holistic-200 hover:text-holistic-900 transition-all duration-200 text-holistic-700"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" strokeWidth={1} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-light mb-8 tracking-widest uppercase text-holistic-800">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-holistic-600 hover:text-holistic-900 transition-colors duration-200 font-light text-sm underline-effect"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-light mb-8 tracking-widest uppercase text-holistic-800">Support</h4>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-holistic-600 hover:text-holistic-900 transition-colors duration-200 font-light text-sm underline-effect"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-light mb-8 tracking-widest uppercase text-holistic-800">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-holistic-500" strokeWidth={1} />
                <span className="text-holistic-600 font-light text-sm">hello@risecosmetics.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-holistic-500" strokeWidth={1} />
                <span className="text-holistic-600 font-light text-sm">+39 02 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-holistic-500" strokeWidth={1} />
                <span className="text-holistic-600 font-light text-sm">Milano, Italy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-holistic-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-holistic-500 text-xs tracking-wide">
              © 2024 RISE Cosmetics. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="text-holistic-500 hover:text-holistic-900 text-xs transition-colors duration-200 underline-effect">
                Privacy Policy
              </a>
              <a href="#" className="text-holistic-500 hover:text-holistic-900 text-xs transition-colors duration-200 underline-effect">
                Terms of Service
              </a>
              <a href="#" className="text-holistic-500 hover:text-holistic-900 text-xs transition-colors duration-200 underline-effect">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
