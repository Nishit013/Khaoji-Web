import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { DETAILED_FEATURES } from '../constants';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Store, 
  CheckCircle2, 
  Receipt,
  Calculator,
  CreditCard,
  Printer
} from 'lucide-react';

const Contact: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    city: '', 
    restaurantName: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly'); // Default yearly
  const [includeBranding, setIncludeBranding] = useState(false);

  // Initialize state from navigation if available
  useEffect(() => {
    if (location.state?.billingCycle) {
      setBillingCycle(location.state.billingCycle);
    }
    if (location.state?.includeBranding !== undefined) {
      setIncludeBranding(location.state.includeBranding);
    }
  }, [location.state]);

  // Pricing Constants
  const POS_PRICE_MONTHLY = 600;
  const POS_PRICE_YEARLY = 6000;
  const API_COST_MONTHLY = 499;
  const API_COST_YEARLY = 4700; // Updated to 4700

  const BRANDING_COST_MONTHLY = 149;
  const BRANDING_COST_YEARLY = 1099;

  // Retrieve Whatsapp selection from previous state or default to included (web)
  const whatsappType = location.state?.whatsappType || 'web';

  const currentBasePrice = billingCycle === 'monthly' ? POS_PRICE_MONTHLY : POS_PRICE_YEARLY;
  const currentAddonPrice = whatsappType === 'api' 
    ? (billingCycle === 'monthly' ? API_COST_MONTHLY : API_COST_YEARLY) 
    : 0;
  
  const currentBrandingPrice = includeBranding
    ? (billingCycle === 'monthly' ? BRANDING_COST_MONTHLY : BRANDING_COST_YEARLY)
    : 0;

  const subtotal = currentBasePrice + currentAddonPrice + currentBrandingPrice;
  const tax = Math.round(subtotal * 0.18);
  const totalPayable = subtotal + tax;

  // Calculate total number of features
  const totalFeatures = DETAILED_FEATURES.reduce((acc, category) => acc + category.items.length, 0);

  const formatPrice = (price: number) => `₹${price.toLocaleString()}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // --- WHATSAPP INTEGRATION ---
    // Replace this number with your actual business WhatsApp number
    const phoneNumber = "917862994486"; 
    
    const message = `*NEW SUBSCRIPTION INQUIRY*
--------------------------------
*Customer Details*
Name: ${formData.name}
Restaurant: ${formData.restaurantName}
City: ${formData.city}
Phone: ${formData.phone}
Email: ${formData.email}

*Plan Details*
Cycle: ${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
WhatsApp: ${whatsappType === 'api' ? 'Official API' : 'Web/App Sharing'}
Branding: ${includeBranding ? 'Yes (White-label)' : 'No'}

*Financials*
Total Payable: ${formatPrice(totalPayable)}
--------------------------------
Please process my inquiry.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setSubmitted(false);
      // Optional: Redirect or clear form
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-12 px-4 md:px-6 flex items-center justify-center">
        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col lg:flex-row h-auto lg:h-[800px]">
          
          {/* LEFT SIDE: CUSTOMER DETAILS (Form) */}
          <div className="w-full lg:w-3/5 p-8 lg:p-12 bg-white flex flex-col relative overflow-y-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 text-slate-400 mb-2">
                <Store size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">New Customer Registration</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Guest Details</h1>
              <p className="text-slate-500 mt-2">Enter your information to finalize the inquiry.</p>
            </div>

            {submitted ? (
               <div className="flex-grow flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                <p className="text-slate-500 text-lg max-w-md">
                  Thank you, <strong>{formData.name}</strong>. We have opened WhatsApp to complete your request. Our team will contact you at <strong>{formData.phone}</strong> shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-sm font-semibold"
                >
                  Start New Inquiry
                </button>
              </div>
            ) : (
              <form id="settlement-form" onSubmit={handleSubmit} className="flex-grow space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                      <User size={14} /> Full Name
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-khaoji-primary focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                      <Phone size={14} /> Mobile Number
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-khaoji-primary focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                      placeholder="+91 00000 00000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                    <Mail size={14} /> Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-khaoji-primary focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                    placeholder="name@restaurant.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                      <Store size={14} /> Restaurant Name
                    </label>
                    <input 
                      type="text" 
                      name="restaurantName" 
                      value={formData.restaurantName} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-khaoji-primary focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                      placeholder="My Awesome Cafe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                      <MapPin size={14} /> City
                    </label>
                    <input 
                      type="text" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-khaoji-primary focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                      placeholder="Mumbai, Delhi, etc."
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4 text-slate-400 text-sm">
                   <div className="flex-1 h-px bg-slate-100"></div>
                   <span>Secure Inquiry</span>
                   <div className="flex-1 h-px bg-slate-100"></div>
                </div>
              </form>
            )}

            {/* Added Contact Details Section */}
            <div className="mt-10 pt-10 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Contact Us Directly</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-khaoji-primary shadow-sm border border-slate-100 shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">24/7 Support Line</p>
                    <a href="tel:+917862994486" className="text-lg font-bold text-slate-900 hover:text-khaoji-primary transition-colors block leading-tight">
                      +91 7862994486
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-khaoji-primary shadow-sm border border-slate-100 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Email Us</p>
                    <a href="mailto:contactkhaoji@gmail.com" className="text-lg font-bold text-slate-900 hover:text-khaoji-primary transition-colors block leading-tight">
                      contactkhaoji@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: BILL SUMMARY (POS Style) */}
          <div className="w-full lg:w-2/5 bg-slate-50 border-l border-gray-200 flex flex-col">
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 shadow-md z-10">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Receipt size={20} className="text-emerald-400"/> Order Summary
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded font-mono">#ORD-2025-001</span>
              </div>
              <p className="text-slate-400 text-xs">Table: Registration • Server: Web</p>
            </div>

            {/* Scrollable List */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              
              {/* Item 1 */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">Khaoji POS License</h4>
                  <p className="text-xs text-slate-500">{billingCycle === 'monthly' ? 'Monthly' : 'Annual'} Plan</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{formatPrice(currentBasePrice)}</p>
                  <p className="text-xs text-slate-400">× 1</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex justify-between items-start pt-2 border-t border-slate-200 border-dashed">
                <div>
                  <h4 className="font-bold text-slate-900">WhatsApp Integration</h4>
                  <p className="text-xs text-slate-500">
                    {whatsappType === 'api' 
                      ? `Official API (${billingCycle === 'monthly' ? '2,999' : '3,499'} free msgs)` 
                      : 'Web/App Sharing'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{currentAddonPrice > 0 ? formatPrice(currentAddonPrice) : 'Included'}</p>
                  <p className="text-xs text-slate-400">× 1</p>
                </div>
              </div>

              {/* Item 3: Branding */}
              {includeBranding && (
                <div className="flex justify-between items-start pt-2 border-t border-slate-200 border-dashed animate-in slide-in-from-top-2">
                  <div>
                    <h4 className="font-bold text-slate-900">Restaurant Branding</h4>
                    <p className="text-xs text-slate-500">White-label Addon</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{formatPrice(currentBrandingPrice)}</p>
                    <p className="text-xs text-slate-400">× 1</p>
                  </div>
                </div>
              )}

              {/* Item 4 (Feature Summary) */}
              <div className="flex justify-between items-start pt-2 border-t border-slate-200 border-dashed opacity-70">
                <div>
                  <h4 className="font-medium text-slate-700">All Premium Features</h4>
                  <p className="text-xs text-slate-400">Includes {totalFeatures}+ Modules</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-700">Free</p>
                </div>
              </div>

            </div>

            {/* Toggle Section (Replacing Discount/Flat buttons) */}
            <div className="p-6 bg-white border-t border-slate-200 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] z-10">
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Billing Cycle</label>
                <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                  <button 
                    onClick={() => setBillingCycle('monthly')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setBillingCycle('yearly')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Yearly <span className="text-[10px] text-emerald-600 ml-1">(-17%)</span>
                  </button>
                </div>
              </div>

              {/* Calculation Area */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tax (GST 18%)</span>
                  <span className="font-medium text-slate-900">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-2">
                  <span className="text-base font-bold text-slate-900 uppercase">Payable Amount</span>
                  <span className="text-2xl font-extrabold text-emerald-600">{formatPrice(totalPayable)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-3">
                 <button 
                  onClick={(e) => {
                     const form = document.getElementById('settlement-form') as HTMLFormElement;
                     if(form) form.requestSubmit();
                  }}
                  disabled={submitted}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl py-3 shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                   {submitted ? (
                     <span className="animate-pulse">Processing...</span>
                   ) : (
                     <>
                      <CheckCircle2 size={20} />
                      Settle & Inquiry
                     </>
                   )}
                 </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;