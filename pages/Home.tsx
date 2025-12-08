import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Zap, Shield, BarChart2, Globe, Smartphone, Coffee, Utensils, Truck, Store, Cloud, Star, Headphones } from 'lucide-react';
import { ASSETS } from '../constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', restaurantName: '' });
  const [scrollY, setScrollY] = useState(0);
  const [outletsVisible, setOutletsVisible] = useState(false);
  const outletsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Observer for outlet section animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOutletsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (outletsRef.current) {
      observer.observe(outletsRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- WHATSAPP INTEGRATION ---
    // Replace this number with your actual business WhatsApp number
    const phoneNumber = "917862994486"; 
    
    const message = `*NEW DEMO REQUEST*
--------------------------------
*Name:* ${formData.name}
*Restaurant:* ${formData.restaurantName}
*City:* ${formData.city}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
--------------------------------
I am interested in scheduling a demo.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Reset form
    setFormData({ name: '', email: '', phone: '', city: '', restaurantName: '' });
  };

  const outletTypes = [
    { name: 'Cafe', icon: Coffee },
    { name: 'Fine Dine', icon: Utensils },
    { name: 'Food Truck', icon: Truck },
    { name: 'QSR', icon: Store },
    { name: 'Cloud Kitchen', icon: Cloud },
    { name: 'Bakery', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-khaoji-primary/20 selection:text-khaoji-primary">
      <Navbar />

      {/* Modern Centered Hero with 3D Dashboard Effect */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients & Blobs with Parallax */}
        <div 
          className="absolute -top-[20%] left-0 w-full h-[140%] pointer-events-none -z-10 transition-transform duration-75 ease-out"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
           {/* Subtle Grid Pattern for reference */}
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

           <div className="absolute top-[20%] left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
           <div className="absolute top-[20%] right-1/4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>
           <div className="absolute bottom-[20%] left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-violet-100/50 via-blue-50/30 to-transparent rounded-[100%] blur-3xl -z-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-600">Now with WhatsApp Billing</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 leading-[1.1]">
            The POS that runs <br className="hidden md:block"/>
            <span className="text-khaoji-primary">itself.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Hardware-free. Cloud-based. Limitless. Manage your restaurant from your pocket with the most advanced POS system ever built.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <button 
              onClick={() => document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-slate-900/20 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              Start Free Trial
            </button>
            <Link 
              to="/features"
              className="px-8 py-4 bg-white text-slate-900 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              View Features
            </Link>
          </div>

          {/* 3D Dashboard Preview */}
          <div className="perspective-container max-w-5xl mx-auto px-4 animate-float">
            <div className="tilted-card relative rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-xl shadow-2xl p-2 md:p-4 group">
              <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-tr from-violet-500/10 to-blue-500/10 rounded-2xl z-0"></div>
              
              {/* Image Container with Shimmer Overlay */}
              <div className="relative rounded-xl overflow-hidden shadow-inner border border-gray-100">
                <img 
                  src={ASSETS.PLACEHOLDER_ANALYTICS} 
                  alt="Dashboard" 
                  className="relative z-10 w-full"
                />
                {/* Shimmer Effect */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shimmer"></div>
                </div>
              </div>

              {/* Floating UI Elements */}
              <div className="absolute -right-8 top-20 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg text-green-600"><BarChart2 size={20}/></div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Revenue Today</p>
                    <p className="text-lg font-bold text-gray-900">$2,450.00</p>
                  </div>
                </div>
              </div>
              <div className="absolute -left-8 bottom-20 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block animate-float" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Smartphone size={20}/></div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Active Orders</p>
                    <p className="text-lg font-bold text-gray-900">12 Tables</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stable Animated Outlet Types Section */}
      <section ref={outletsRef} className="py-20 border-y border-gray-100 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-sm font-bold text-khaoji-primary uppercase tracking-widest mb-2 transition-all duration-1000 ${outletsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Built For Everyone
            </h2>
            <h3 className={`text-3xl font-bold text-slate-900 transition-all duration-1000 delay-100 ${outletsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Tailored for every food business
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {outletTypes.map((type, index) => {
              // Items coming from "outside"
              // First 3 from Left (-100px), Last 3 from Right (100px)
              const isLeft = index < 3;
              const translateX = isLeft ? '-150%' : '150%';
              
              // Add delay based on index for staggering effect
              const transitionDelay = `${index * 150}ms`;

              return (
                <div 
                  key={index} 
                  className={`flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 transition-all duration-1000 ease-out group`}
                  style={{ 
                    transitionDelay,
                    opacity: outletsVisible ? 1 : 0,
                    transform: outletsVisible ? 'translateX(0)' : `translateX(${translateX})`
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-khaoji-primary group-hover:text-white transition-colors duration-300">
                    <type.icon size={24} />
                  </div>
                  <span className="text-lg font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                    {type.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Everything you need.<br/>Nothing you don't.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">We stripped away the complexity of traditional POS systems to bring you something elegant and powerful.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            
            {/* Item 1: Large Left - Billing */}
            <div className="group md:col-span-2 relative overflow-hidden rounded-[2rem] bg-slate-50 border border-gray-100 hover:shadow-2xl transition-all duration-300 min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8 md:p-10 flex flex-col md:flex-row h-full items-center gap-8">
                <div className="flex-1 space-y-4 z-10">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-violet-600 mb-4">
                    <Smartphone size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Zero Hardware Billing</h3>
                  <p className="text-slate-500 leading-relaxed">Run your entire operation from a smartphone or tablet. No expensive terminals, no thermal printers. Send digital receipts instantly via WhatsApp.</p>
                </div>
                {/* Updated Image Container for Billing UI */}
                <div className="flex-1 w-full h-64 md:h-full bg-gradient-to-tr from-gray-100 to-gray-50 rounded-2xl shadow-inner border border-gray-100 p-4 flex items-center justify-center transform rotate-1 group-hover:-rotate-1 transition-transform duration-500 overflow-hidden relative">
                   {/* Background pattern to fill blank space */}
                   <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                   
                   {/* Changed to object-contain with adjustments for potentially wider image */}
                  <img src={ASSETS.PLACEHOLDER_BILLING} className="w-auto h-auto max-w-full max-h-full object-contain rounded-xl shadow-lg relative z-10" alt="Billing UI" />
                </div>
              </div>
            </div>

            {/* Item 2: Support (Modified to full image) */}
            <div className="group md:col-span-1 relative overflow-hidden rounded-[2rem] bg-slate-50 border border-gray-100 hover:shadow-2xl transition-all duration-300 min-h-[400px]">
               {/* Use the new full image with object-contain to avoid clipping */}
               <img 
                 src={ASSETS.SUPPORT_CARD_UI} 
                 alt="24/7 Support Dashboard" 
                 className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
               />
               
               {/* Optional overlay gradient to ensure card legibility if text was needed, but here image is the main content. */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Item 3: Analytics */}
            <div className="group md:col-span-1 relative overflow-hidden rounded-[2rem] bg-slate-900 text-white hover:shadow-2xl transition-all duration-300 min-h-[400px]">
              <div className="p-8 h-full flex flex-col relative z-10">
                <div>
                  <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                    <BarChart2 size={24} className="text-green-400"/>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Real-time Analytics</h3>
                  <p className="text-slate-400 text-sm max-w-[80%]">20+ live reports on sales, staff, and inventory.</p>
                </div>
              </div>
              
              {/* Analytics Image positioned at bottom right */}
              <div className="absolute -right-4 -bottom-4 w-2/3 h-2/3 rounded-tl-2xl overflow-hidden border-t border-l border-slate-700 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                 <img src={ASSETS.PLACEHOLDER_ANALYTICS} className="w-full h-full object-cover object-left-top" alt="Analytics Dashboard" />
              </div>
            </div>

            {/* Item 4: Table Mgmt */}
            <div className="group md:col-span-1 relative overflow-hidden rounded-[2rem] bg-blue-600 text-white hover:shadow-2xl transition-all duration-300 min-h-[400px]">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
               <div className="p-8 h-full flex flex-col">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <Globe size={24} className="text-white"/>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Visual Table Layout</h3>
                  <p className="text-blue-100 text-sm mb-6">Drag, drop, and manage reservations.</p>
                  
                  {/* Updated to use Image instead of CSS grid - Increased size and changed to object-contain */}
                  <div className="mt-auto relative h-72 w-full rounded-xl overflow-hidden shadow-lg border border-white/20 group-hover:scale-105 transition-transform duration-500 bg-blue-700/30">
                    <img src={ASSETS.PLACEHOLDER_TABLE} alt="Table Layout" className="w-full h-full object-contain" />
                  </div>
               </div>
            </div>

            {/* Item 5: Tax (Modified to 1 col) */}
            <div className="group md:col-span-1 relative overflow-hidden rounded-[2rem] bg-slate-50 border border-gray-100 hover:shadow-2xl transition-all duration-300 min-h-[400px]">
               <div className="p-8 h-full flex flex-col relative z-10">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-violet-600 mb-6">
                    <Shield size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Automated Tax</h3>
                  <p className="text-slate-500 text-sm mb-6">Auto-calculate GST and export audit-ready reports.</p>
                  
                  {/* Updated image size and fit */}
                  <div className="mt-auto relative h-72 w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 group-hover:scale-105 transition-transform duration-500 bg-white">
                    <img src={ASSETS.PLACEHOLDER_TAX} className="w-full h-full object-contain" alt="Tax UI" />
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Split CTA Section */}
      <section id="book-demo" className="py-20 px-4">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl relative">
          {/* Abstract blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Content */}
            <div className="p-12 lg:p-20 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-2 text-violet-400 font-semibold mb-6">
                <Sparkles size={20}/>
                <span>Transform your business today</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to ditch the hardware?
              </h2>
              <p className="text-slate-400 text-lg mb-12">
                Join 1000+ modern food businesses running on Khaoji. No credit card required for the demo.
              </p>
              
              <div className="flex items-center gap-4 text-white">
                <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor"/>)}
                  </div>
                  <span className="text-sm text-slate-400">Trusted by top chefs</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white p-12 lg:p-20">
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Book your free demo</h3>
                
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Full Name</label>
                    <input type="text" name="name" onChange={handleInputChange} value={formData.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all" placeholder="Chef Ramsay" required />
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Restaurant</label>
                    <input type="text" name="restaurantName" onChange={handleInputChange} value={formData.restaurantName} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all" placeholder="Hell's Kitchen" required />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Email Address</label>
                  <input type="email" name="email" onChange={handleInputChange} value={formData.email} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all" placeholder="gordon@example.com" required />
                </div>

                <div className="grid grid-cols-2 gap-5">
                   <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Phone</label>
                    <input type="tel" name="phone" onChange={handleInputChange} value={formData.phone} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all" placeholder="+1 234 567 890" required />
                  </div>
                   <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">City</label>
                    <input type="text" name="city" onChange={handleInputChange} value={formData.city} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all" placeholder="New York" required />
                  </div>
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center gap-2 group">
                  Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform"/>
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">No credit card required. Free 14-day trial.</p>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;