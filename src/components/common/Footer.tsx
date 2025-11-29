
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Send, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
  ];

  const quickLinks = [
    { name: 'Shop All', href: '/products' },
    { name: 'Collections', href: '/collections' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const supportLinks = [
    { name: 'FAQ', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Size Guide', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#F5F0EA] to-[#EDE8E0] text-stone-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-stone-200/30 to-amber-100/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-amber-100/20 to-stone-200/30 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -90, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-200/40"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <motion.h3 
              className="text-3xl font-playfair font-light mb-4 tracking-wider text-stone-800"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              RISE
            </motion.h3>
            <p className="text-xs text-stone-500 mb-8 tracking-widest">COSMETICS</p>
            <p className="text-stone-600 mb-8 font-light leading-relaxed text-sm">
              Natural and vegan cosmetics based on sprouted rice. 
              Crafted in Italy with intention for conscious beauty rituals.
            </p>
            
            {/* Enhanced Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 border border-stone-300 hover:border-transparent transition-all duration-300 text-stone-600 hover:text-white rounded-lg group relative overflow-hidden ${social.color}`}
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <social.icon className="w-5 h-5 relative z-10" strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-light mb-8 tracking-widest uppercase text-stone-700">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="text-stone-500 hover:text-stone-800 transition-colors duration-200 font-light text-sm group inline-flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-amber-600 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm font-light mb-8 tracking-widest uppercase text-stone-700">Support</h4>
            <ul className="space-y-4">
              {supportLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-stone-500 hover:text-stone-800 transition-colors duration-200 font-light text-sm group inline-flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-amber-600 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-sm font-light mb-8 tracking-widest uppercase text-stone-700">Contact</h4>
            <div className="space-y-5">
              {[
                { icon: Mail, text: 'hello@risecosmetics.com', href: 'mailto:hello@risecosmetics.com' },
                { icon: Phone, text: '+39 02 1234 5678', href: 'tel:+390212345678' },
                { icon: MapPin, text: 'Milano, Italy', href: '#' }
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-stone-200/50 group-hover:bg-amber-100 transition-colors duration-200">
                    <contact.icon className="w-4 h-4 text-stone-500 group-hover:text-amber-600 transition-colors duration-200" strokeWidth={1.5} />
                  </div>
                  <span className="text-stone-600 group-hover:text-stone-800 font-light text-sm transition-colors duration-200">
                    {contact.text}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section with Enhanced Design */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-stone-300/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-stone-500 text-xs tracking-wide flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <span>© 2024 RISE Cosmetics. Made with</span>
              <Heart className="w-3 h-3 text-amber-600" fill="currentColor" />
              <span>in Italy</span>
            </motion.p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Cookie Policy', href: '#' }
              ].map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={link.href}
                    className="text-stone-500 hover:text-stone-800 text-xs transition-colors duration-200 relative group"
                  >
                    <span>{link.name}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
