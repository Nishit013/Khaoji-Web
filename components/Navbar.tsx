import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { ASSETS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <nav 
        className={`transition-all duration-300 w-full max-w-5xl rounded-full px-6 py-3 flex items-center justify-between ${
          scrolled || isOpen ? 'bg-white/90 backdrop-blur-xl shadow-lg border border-gray-200' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative overflow-hidden rounded-lg">
             <img src={ASSETS.LOGO} alt="Khaoji" className="w-10 h-10 object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-khaoji-primary transition-colors">
            Khaoji
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link 
            to="/contact"
            className="group relative px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold shadow-xl hover:shadow-2xl hover:bg-slate-800 transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Demo <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 md:hidden flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
           {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-700 py-2 border-b border-gray-50"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full bg-khaoji-primary text-white py-3 rounded-xl font-semibold text-center"
          >
            Book Free Demo
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;