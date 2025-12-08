import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, X, Check, ChevronDown, ChevronUp, Receipt } from 'lucide-react';
import { DETAILED_FEATURES } from '../constants';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [whatsappType, setWhatsappType] = useState<'web' | 'api'>('web');
  const [includeBranding, setIncludeBranding] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  // Constants
  const POS_PRICE_MONTHLY = 600;
  const POS_PRICE_YEARLY = 6000;
  
  const API_COST_MONTHLY = 499;
  const API_COST_YEARLY = 4700; // Updated to 4700 as per user request

  const BRANDING_COST_MONTHLY = 149;
  const BRANDING_COST_YEARLY = 1099;

  const currentBasePrice = billingCycle === 'monthly' ? POS_PRICE_MONTHLY : POS_PRICE_YEARLY;
  
  const currentAddonPrice = whatsappType === 'api' 
    ? (billingCycle === 'monthly' ? API_COST_MONTHLY : API_COST_YEARLY) 
    : 0;

  const brandingPrice = includeBranding
    ? (billingCycle === 'monthly' ? BRANDING_COST_MONTHLY : BRANDING_COST_YEARLY)
    : 0;

  const total = currentBasePrice + currentAddonPrice + brandingPrice;
  const subtotal = total; // Assuming tax is inclusive
  const tax = Math.round(total * 0.18); // 18% tax
  const totalPayable = total + tax;

  const formatPrice = (price: number) => `₹${price.toLocaleString()}`;

  const HIGHLIGHTED_FEATURE_NAMES = [
    "Instant Menu Management",
    "Role-based Access Control",
    "Secure PIN Authentication",
    "20+ Business Reports",
    "Export Tax calculation in Excel and PDF",
    "Customer Profiles & History",
    "Points-based Loyalty System",
    "24/7 Support via Mail & Call"
  ];

  // Split features into highlighted (visible cards) and remaining (dropdown)
  const { highlightedFeatures, remainingFeatures } = useMemo(() => {
    const highlighted: {name: string, category: string}[] = [];
    const remaining: {name: string, category: string}[] = [];

    DETAILED_FEATURES.forEach(cat => {
      cat.items.forEach(item => {
        const featureObj = { name: item.name, category: cat.category };
        if (HIGHLIGHTED_FEATURE_NAMES.includes(item.name)) {
          highlighted.push(featureObj);
        } else {
          remaining.push(featureObj);
        }
      });
    });

    return { highlightedFeatures: highlighted, remainingFeatures: remaining };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20 px-4 md:px-6 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-2xl space-y-8">
          
          {/* Header & Toggle */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Choose your plan</h1>
              <p className="text-slate-500 text-lg">Simple pricing for powerful features.</p>
            </div>
            
            <div className="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  billingCycle === 'monthly' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  billingCycle === 'yearly' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                Yearly
                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">Save 17%</span>
              </button>
            </div>
          </div>

          {/* Billing Card Module */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 relative">
            
            {/* Card Header */}
            <div className="bg-slate-50/50 p-6 flex justify-between items-start border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Billing</h2>
                <p className="text-sm text-slate-400 font-medium">New Order</p>
              </div>
              <div className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm">
                Table 1
              </div>
            </div>

            {/* List Items */}
            <div className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-4">CURRENT SELECTION (NOT SENT)</h3>

              {/* Item 1: POS License */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-[#f0fdf4] border border-[#dcfce7] rounded-xl gap-4 sm:gap-0">
                <div>
                  <h4 className="font-medium text-slate-900 text-lg">Khaoji POS License</h4>
                  <div className="text-sm text-slate-500">{billingCycle === 'monthly' ? 'Monthly Subscription' : 'Annual Subscription'}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{formatPrice(currentBasePrice)} × 1</div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded text-slate-400 hover:text-slate-600 transition-colors shadow-sm" disabled>
                    <Minus size={14} strokeWidth={3} />
                  </button>
                  <span className="w-6 text-center font-bold text-slate-800">1</span>
                  <button className="w-8 h-8 flex items-center justify-center bg-indigo-50 border border-indigo-100 rounded text-indigo-600 hover:bg-indigo-100 transition-colors shadow-sm" disabled>
                    <Plus size={14} strokeWidth={3} />
                  </button>
                  <button className="text-slate-300 hover:text-red-400 ml-2">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Item 2: WhatsApp Integration */}
              <div className="flex flex-col p-4 bg-[#f0fdf4] border border-[#dcfce7] rounded-xl gap-3">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
                  <div>
                    <h4 className="font-medium text-slate-900 text-lg">WhatsApp Service</h4>
                    <div className="text-sm text-slate-500">Digital Receipts & Updates</div>
                     <div className="text-sm text-slate-400 mt-0.5">{currentAddonPrice > 0 ? `${formatPrice(currentAddonPrice)} × 1` : 'Included'}</div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded text-slate-400 hover:text-slate-600 transition-colors shadow-sm" disabled>
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="w-6 text-center font-bold text-slate-800">1</span>
                    <button className="w-8 h-8 flex items-center justify-center bg-indigo-50 border border-indigo-100 rounded text-indigo-600 hover:bg-indigo-100 transition-colors shadow-sm" disabled>
                      <Plus size={14} strokeWidth={3} />
                    </button>
                    <button className="text-slate-300 hover:text-red-400 ml-2">
                      <X size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Variant Selector inside the card */}
                <div className="mt-1 pt-3 border-t border-emerald-100/50">
                   <select 
                    value={whatsappType}
                    onChange={(e) => setWhatsappType(e.target.value as 'web' | 'api')}
                    className="w-full bg-white border border-emerald-100 text-slate-700 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer"
                  >
                    <option value="web">Web/App Sharing (Free)</option>
                    <option value="api">
                      Official API ({formatPrice(billingCycle === 'monthly' ? 499 : 4700)}) - {billingCycle === 'monthly' ? '2999' : '3499'} free msgs/mo
                    </option>
                  </select>
                  {whatsappType === 'api' && (
                    <p className="text-[10px] text-slate-400 mt-1 italic">
                      Includes {billingCycle === 'monthly' ? '2,999' : '3,499'} free messages/month. Overages are chargeable.
                    </p>
                  )}
                </div>
              </div>

              {/* Item 3: Branding Addon */}
              <div className={`flex flex-col p-4 border rounded-xl gap-3 transition-colors ${includeBranding ? 'bg-[#f0fdf4] border-[#dcfce7]' : 'bg-white border-gray-200'}`}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
                  <div>
                    <h4 className="font-medium text-slate-900 text-lg">Restaurant Branding</h4>
                    <div className="text-sm text-slate-500">Remove 'Powered by Khaoji'</div>
                    <div className="text-sm text-slate-400 mt-0.5">
                      {formatPrice(billingCycle === 'monthly' ? BRANDING_COST_MONTHLY : BRANDING_COST_YEARLY)} × 1
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button 
                      onClick={() => setIncludeBranding(!includeBranding)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all shadow-sm ${
                        includeBranding 
                          ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                          : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'
                      }`}
                    >
                      {includeBranding ? 'Remove' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Highlighted Features as Individual Cards */}
              {highlightedFeatures.map((feature, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-[#f0fdf4] border border-[#dcfce7] rounded-xl gap-4 sm:gap-0">
                  <div>
                    <h4 className="font-medium text-slate-900 text-lg">{feature.name}</h4>
                    <div className="text-sm text-slate-500">{feature.category}</div>
                    <div className="text-sm text-slate-400 mt-0.5">Included</div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded text-slate-400 hover:text-slate-600 transition-colors shadow-sm" disabled>
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="w-6 text-center font-bold text-slate-800">1</span>
                    <button className="w-8 h-8 flex items-center justify-center bg-indigo-50 border border-indigo-100 rounded text-indigo-600 hover:bg-indigo-100 transition-colors shadow-sm" disabled>
                      <Plus size={14} strokeWidth={3} />
                    </button>
                    <button className="text-slate-300 hover:text-red-400 ml-2">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Collapsible Remaining Features */}
              <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50">
                <button 
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors border ${showAllFeatures ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-300 text-transparent'}`}>
                      <Check size={12} strokeWidth={4}/>
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      Include {remainingFeatures.length} more features
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 uppercase">
                    {showAllFeatures ? 'Hide' : 'Show'}
                    {showAllFeatures ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                  </div>
                </button>

                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showAllFeatures ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-4 pt-0 space-y-2 border-t border-gray-100">
                     <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold py-2">More Included Features</p>
                     {remainingFeatures.map((feature, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs py-2 px-3 bg-[#f0fdf4] border border-[#dcfce7] rounded-lg group hover:border-red-200 transition-colors">
                        <div>
                          <span className="text-slate-900 font-medium block">{feature.name}</span>
                          <span className="text-[10px] text-slate-500">{feature.category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 font-mono">₹0</span>
                          <button className="text-slate-400 hover:text-red-500 opacity-50 group-hover:opacity-100 transition-opacity">
                             <X size={14} />
                          </button>
                        </div>
                      </div>
                     ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Footer / Total */}
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="flex justify-between items-end mb-6">
                <div className="text-slate-500 space-y-1">
                  <p className="text-base text-slate-500">Subtotal: {formatPrice(subtotal)}</p>
                  <p className="text-base text-slate-500">Tax (18%): {formatPrice(tax)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Payable</p>
                  <p className="text-3xl font-extrabold text-slate-900">{formatPrice(totalPayable)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {/* Send to Kitchen Button (Visual only as per screenshot, redirects to features for now) */}
                 <button 
                  className="bg-[#fd7e14] hover:bg-[#e6700d] text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center cursor-default opacity-90"
                 >
                   <span className="text-lg">Send to Kitchen</span>
                   <span className="text-xs opacity-90 font-medium">({highlightedFeatures.length + remainingFeatures.length} items included)</span>
                 </button>

                 {/* Settle Bill Button */}
                 <button 
                  onClick={() => navigate('/contact', { state: { billingCycle, whatsappType, includeBranding } })}
                  className="bg-[#0ca678] hover:bg-[#099268] text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-colors flex flex-col items-center justify-center"
                 >
                   <span className="text-lg">Settle Bill</span>
                   <span className="text-xs opacity-90 font-medium">Print & Close</span>
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

export default Pricing;