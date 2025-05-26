import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Bot, 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  FileText, 
  MessageSquare,
  Database,
  Save
} from 'lucide-react';
import { motion } from 'framer-motion';

// Sidebar item type
type SidebarItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
};

// Form data type
type MarketingFormData = {
  marketingStyle: 'intelligent' | 'blunt';
  productHighlights: string;
  promotionalMessages: string;
  offerFrequency: string;
};

const MarketingPage = () => {
  // Sidebar items
  const sidebarItems: SidebarItem[] = [
    { 
      icon: <LayoutDashboard size={20} />, 
      label: 'Dashboard', 
      path: '/dashboard'
    },
    { 
      icon: <Users size={20} />, 
      label: 'Users', 
      path: '/users'
    },
    { 
      icon: <Settings size={20} />, 
      label: 'Constraints', 
      path: '/constraints'
    },
    { 
      icon: <MessageSquare size={20} />, 
      label: 'Marketing', 
      path: '/marketing',
      active: true
    },
    { 
      icon: <Database size={20} />, 
      label: 'Knowledge', 
      path: '/knowledge'
    },
    { 
      icon: <FileText size={20} />, 
      label: 'Subscription', 
      path: '/subscription'
    }
  ];
  
  // Form setup
  const { register, handleSubmit } = useForm<MarketingFormData>({
    defaultValues: {
      marketingStyle: 'intelligent',
      productHighlights: '',
      promotionalMessages: '',
      offerFrequency: 'medium'
    }
  });
  
  // Form submission
  const onSubmit = (data: MarketingFormData) => {
    console.log('Marketing data:', data);
    // In a real app, this would save the marketing preferences to the backend
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <Bot size={24} className="text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">AI Assistant</span>
          </Link>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="pt-8 mt-8 border-t border-gray-200">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-full">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Marketing Preferences
            </h1>
          </div>
        </header>
        
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Configure Marketing Style</h2>
              <p className="text-gray-600">Define how your AI chatbot should handle marketing-related queries and promotions.</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Marketing Style */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Marketing Approach
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-blue-50`}>
                    <div className="flex items-start">
                      <input
                        id="intelligent"
                        type="radio"
                        value="intelligent"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 mt-1"
                        {...register('marketingStyle')}
                      />
                      <div className="ml-3">
                        <label htmlFor="intelligent" className="block text-sm font-medium text-gray-700">
                          Intelligent Promotion
                        </label>
                        <p className="text-sm text-gray-500 mt-1">
                          AI detects opportunities to subtly promote products based on conversation context, without being pushy.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-blue-50`}>
                    <div className="flex items-start">
                      <input
                        id="blunt"
                        type="radio"
                        value="blunt"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 mt-1"
                        {...register('marketingStyle')}
                      />
                      <div className="ml-3">
                        <label htmlFor="blunt" className="block text-sm font-medium text-gray-700">
                          Direct Promotion
                        </label>
                        <p className="text-sm text-gray-500 mt-1">
                          AI clearly presents promotional offers and products when appropriate, with more explicit marketing language.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product Highlights */}
              <div>
                <label htmlFor="productHighlights" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Highlights
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  List key products or services you want the AI to emphasize (one per line)
                </p>
                <textarea
                  id="productHighlights"
                  rows={4}
                  placeholder="Premium Plan&#10;24/7 Support&#10;Mobile App Features"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  {...register('productHighlights')}
                ></textarea>
              </div>
              
              {/* Promotional Messages */}
              <div>
                <label htmlFor="promotionalMessages" className="block text-sm font-medium text-gray-700 mb-1">
                  Promotional Messages
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Add specific promotional messages the AI can use (one per line)
                </p>
                <textarea
                  id="promotionalMessages"
                  rows={4}
                  placeholder="Get 10% off with code WELCOME10&#10;Free trial available for 14 days&#10;Upgrade now and save 20%"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  {...register('promotionalMessages')}
                ></textarea>
              </div>
              
              {/* Offer Frequency */}
              <div>
                <label htmlFor="offerFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Promotion Frequency
                </label>
                <select
                  id="offerFrequency"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  {...register('offerFrequency')}
                >
                  <option value="low">Low - Only when directly relevant</option>
                  <option value="medium">Medium - Occasional suggestions</option>
                  <option value="high">High - Regular promotional mentions</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Save size={16} className="mr-2" />
                  Save Preferences
                </button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default MarketingPage;