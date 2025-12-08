import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DETAILED_FEATURES } from '../constants';
import { 
  Search, 
  ChevronDown, 
  Plus, 
  X, 
  CheckCircle2, 
} from 'lucide-react';

const Features: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedFeature, setSelectedFeature] = useState<{
    name: string; 
    category: string; 
    icon: any; 
    description: string;
    benefits: string[];
  } | null>(null);

  const flatFeatures = useMemo(() => {
    const features: { 
      id: string; 
      name: string; 
      category: string; 
      icon: any;
      description: string;
      benefits: string[];
    }[] = [];

    DETAILED_FEATURES.forEach((cat) => {
      cat.items.forEach((item, idx) => {
        features.push({
          id: `${cat.category}-${idx}`,
          name: item.name,
          category: cat.category,
          icon: cat.icon,
          description: item.description,
          benefits: item.benefits
        });
      });
    });
    return features;
  }, []);

  const filteredFeatures = flatFeatures.filter(feature => {
    const matchesCategory = activeCategory === 'All' || feature.category === activeCategory;
    const matchesSearch = feature.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', ...DETAILED_FEATURES.map(f => f.category)];

  const isAddon = (name: string) => {
    return name.toLowerCase().includes('branding') || name.toLowerCase().includes('official api');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-12 px-4 md:px-6 max-w-[1600px] mx-auto w-full flex flex-col h-full">
        
        {/* Aesthetic Header */}
        <div className="relative mb-16 py-10 px-6 md:px-12 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-khaoji-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-khaoji-primary uppercase bg-khaoji-primary/10 rounded-full">
                Features Overview
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                Everything you need to run a <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-khaoji-primary to-khaoji-secondary">world-class food business.</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-2xl">
                 From taking orders to analyzing profits, we've built the ultimate toolkit for your restaurant.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-3">
               <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-khaoji-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="block w-full md:w-80 pl-11 pr-4 py-4 border border-gray-200 rounded-2xl bg-slate-50 text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-khaoji-primary/20 focus:border-khaoji-primary transition-all shadow-sm"
                    placeholder="Find a feature..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-10 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex space-x-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300
                  ${activeCategory === cat 
                    ? 'bg-slate-900 text-white shadow-lg ring-2 ring-slate-900 ring-offset-2' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-gray-200'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-20">
          {filteredFeatures.map((feature) => {
            const Icon = feature.icon;
            
            return (
              <div 
                key={feature.id}
                onClick={() => setSelectedFeature(feature)}
                className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-[200px] relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-khaoji-primary group-hover:text-white transition-colors duration-300">
                    <Icon size={20} strokeWidth={2}/>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg leading-snug mb-1 pr-4">
                    {feature.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{feature.category}</p>
                </div>

                <div className="relative z-10 mt-auto flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-sm font-semibold text-khaoji-primary">View Details</span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-900">
                    <Plus size={16} />
                  </div>
                </div>
                
                {/* Decoration */}
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-br from-khaoji-primary/10 to-transparent rounded-full z-0 transition-transform duration-500 group-hover:scale-150"></div>
              </div>
            );
          })}
        </div>

        {filteredFeatures.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Search size={48} className="mb-4 opacity-20"/>
            <p className="text-lg">No features found matching "{searchQuery}"</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-4 text-khaoji-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedFeature(null)}
          ></div>
          
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="bg-slate-50 px-8 py-6 md:px-10 md:py-8 border-b border-gray-100 flex justify-between items-start shrink-0">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-khaoji-primary shrink-0">
                  {React.createElement(selectedFeature.icon, { size: 32 })}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                     {isAddon(selectedFeature.name) ? (
                        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Add-on</span>
                     ) : (
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Included</span>
                     )}
                     <span className="text-sm text-slate-500 font-semibold">{selectedFeature.category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight pr-4">{selectedFeature.name}</h2>
                </div>
              </div>
              <button 
                onClick={() => setSelectedFeature(null)}
                className="text-slate-400 hover:text-slate-900 bg-white hover:bg-slate-200 p-3 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 md:p-12 overflow-y-auto">
              <div className="max-w-none">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10">
                  {selectedFeature.description}
                </p>
                
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">Why you'll love it</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {selectedFeature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-khaoji-primary mt-1 flex-shrink-0"/>
                        <span className="text-slate-800 font-medium text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Features;