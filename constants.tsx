import { 
  Receipt, 
  Armchair, 
  BarChart3, 
  FileSpreadsheet, 
  Smartphone, 
  Users, 
  ChefHat, 
  CreditCard,
  History,
  QrCode,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Percent,
  UtensilsCrossed,
  Headphones
} from 'lucide-react';
import { DetailedFeature } from './types';

export const ASSETS = {
  LOGO: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765132368/Screenshot_2025-12-07_235410_oxtllj.png",
  HERO_ILLUSTRATION: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
  SUPPORT_AGENT: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1000", 
  
  PLACEHOLDER_BILLING: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765133636/Screenshot_2025-12-06_234728_rm7u3t.png",
  PLACEHOLDER_TABLE: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765134489/Screenshot_2025-12-06_232625_sss9ez.png",
  PLACEHOLDER_ANALYTICS: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765133183/Screenshot_2025-12-06_232917_dvdolb.png",
  PLACEHOLDER_TAX: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765134681/Screenshot_2025-12-06_233528_hvv40v.png",
  
  SUPPORT_CARD_UI: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765195212/Screenshot_2025-12-06_234438_aqxnhc.png"
};

export const DETAILED_FEATURES: DetailedFeature[] = [
  {
    category: "Menu & Kitchen",
    icon: UtensilsCrossed,
    items: [
      {
        name: "Instant Menu Management",
        description: "Effortlessly add or remove items, update prices, and manage dish variants (like size or toppings) in real-time without restarting the system.",
        benefits: ["Real-time menu updates", "Easy variant & price control", "No technical skill required"]
      },
      {
        name: "Chef's KOT Interface",
        description: "A dedicated screen for the kitchen staff to view incoming orders clearly. Chefs can toggle item availability (86ing items) with a single click if stock runs out.",
        benefits: ["One-tap item availability", "Clear digital order tickets", "Streamlined kitchen workflow"]
      }
    ]
  },
  {
    category: "Admin & Control",
    icon: ShieldCheck,
    items: [
      {
        name: "Restaurant Branding (White Label)",
        description: "Remove 'Powered by Khaoji' and put your restaurant's name on the software. (Add-on: ₹149/mo or ₹1099/yr).",
        benefits: ["Professional brand image", "Custom login screen", "Your logo on receipts"]
      },
      {
        name: "Role-based Access Control",
        description: "Secure your business data by assigning specific permissions and access levels to different staff members, ensuring everyone sees only what they need to.",
        benefits: ["Enhanced data security", "Customized workflow access", "Reduced internal fraud risk"]
      },
      {
        name: "Secure PIN Authentication",
        description: "Fast and secure login system for every staff member using unique PIN codes, allowing for rapid switching between users during busy shifts.",
        benefits: ["Quick staff switching", "Accurate activity tracking", "Prevent unauthorized access"]
      },
      {
        name: "Staff Shift & Audit Logs",
        description: "Keep a detailed history of staff clock-in times and system actions to ensure accountability and simplify payroll management.",
        benefits: ["Simplified payroll processing", "Full accountability", "Detailed operational history"]
      },
      {
        name: "Remote Management App",
        description: "Access your dashboard, sales data, and settings from anywhere in the world using our dedicated mobile management application.",
        benefits: ["Real-time business insights", "Manage from anywhere", "Immediate operational control"]
      },
      {
        name: "Real-time Activity Feed",
        description: "View a live stream of all activities happening in your restaurant, from order placements to bill settlements, as they occur.",
        benefits: ["Instant operational awareness", "Faster reaction times", "Complete transparency"]
      },
      {
        name: "24/7 Support via Mail & Call",
        description: "Get round-the-clock assistance via our dedicated phone line and email support to ensure your business never stops running.",
        benefits: ["Instant phone access", "Priority email resolution", "Always available"]
      }
    ]
  },
  {
    category: "Smart Tables",
    icon: Armchair,
    items: [
      {
        name: "Visual Floor Plan Editor",
        description: "Create a digital replica of your restaurant's layout. Drag and drop tables to match your physical space for intuitive management.",
        benefits: ["Accurate visual representation", "Easy table rearrangement", "Intuitive order management"]
      },
      {
        name: "Live Occupancy Tracking",
        description: "Monitor which tables are occupied, reserved, or free in real-time to optimize seating and reduce customer wait times.",
        benefits: ["Faster guest seating", "Optimized table turnover", "Improved customer service"]
      },
      {
        name: "Reservation Timeline",
        description: "A visual timeline view of all bookings to help hosts manage upcoming reservations and prevent conflicts effectively.",
        benefits: ["Prevent double bookings", "Efficient capacity planning", "Identify seating gaps"]
      },
      {
        name: "Turnover Rate Analytics",
        description: "Analyze how long customers stay at tables to optimize your seating policies and maximize revenue during peak hours.",
        benefits: ["Optimize seating policies", "Maximize peak hour revenue", "Track staff efficiency"]
      },
      {
        name: "Multi-room Support",
        description: "Manage distinct areas of your venue separately, such as the patio, bar, and main dining room, within a single interface.",
        benefits: ["Segmented area reporting", "Specialized area management", "Scalable for large venues"]
      }
    ]
  },
  {
    category: "Business Intelligence",
    icon: BarChart3,
    items: [
      {
        name: "20+ Business Reports",
        description: "Deep dive into your financial health with comprehensive reports on gross sales, net profit, and expense breakdowns.",
        benefits: ["Profitability insights", "Expense tracking", "Growth trend identification"]
      },
      {
        name: "Menu Engineering Analysis",
        description: "Identify your most profitable and popular dishes using the BCG matrix to optimize your menu offerings and pricing.",
        benefits: ["Optimize menu pricing", "Highlight star items", "Remove low-performing dishes"]
      },
      {
        name: "Peak Hour Heatmaps",
        description: "Visual heatmaps showing your busiest times of the day and week to help you schedule staff more effectively.",
        benefits: ["Smart staff scheduling", "Better preparation planning", "Targeted marketing opportunities"]
      },
      {
        name: "Tax Liability Calculator",
        description: "Automated calculation of collected taxes to ensure you are always compliant and ready for tax filing seasons.",
        benefits: ["Compliance made easy", "Reduce calculation errors", "Instant tax liability view"]
      },
      {
        name: "Export Tax calculation in Excel and PDF",
        description: "Generate and export detailed tax reports in standard formats compatible with accounting software and auditors.",
        benefits: ["Audit-ready file formats", "Seamless accounting integration", "Save time on manual entry"]
      }
    ]
  },
  {
    category: "CRM & Loyalty",
    icon: Users,
    items: [
      {
        name: "Customer Profiles & History",
        description: "Build a database of your customers with their order history and preferences to provide personalized service every time they visit.",
        benefits: ["Personalized guest service", "Track order history", "Record special preferences"]
      },
      {
        name: "Points-based Loyalty System",
        description: "Encourage repeat business with a built-in rewards program that lets customers earn and redeem points on their purchases.",
        benefits: ["Increase repeat visits", "Higher average spend", "Build brand loyalty"]
      }
    ]
  },
  {
    category: "Next-Gen Billing",
    icon: Smartphone,
    items: [
      {
        name: "WhatsApp Digital Receipts",
        description: "Free for Web/App sharing. Official API available: ₹499/mo (2999 free msgs) or ₹4700/yr (3499 free msgs/mo). Extra messages chargeable.",
        benefits: ["Eco-friendly & cost-saving", "Official API Integration", "Build customer database"]
      },
      {
        name: "Split Bill Functionality",
        description: "Easily split checks by item or seat, allowing large groups to pay individually without the usual hassle.",
        benefits: ["Better customer experience", "Faster checkout process", "Flexible payment options"]
      },
      {
        name: "Hardware-agnostic (Run on iPad/Android)",
        description: "Run the entire POS system on any standard tablet or smartphone you already own, eliminating proprietary hardware costs.",
        benefits: ["Low initial setup cost", "Device flexibility", "Easy hardware replacement"]
      }
    ]
  }
];