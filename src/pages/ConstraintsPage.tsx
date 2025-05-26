import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
type ConstraintsFormData = {
  tone: string;
  maxLength: number;
  includeLinks: boolean;
  allowEmojis: boolean;
  responseTime: number;
  fallbackMessage: string;
};

const ConstraintsPage = () => {
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
      path: '/constraints',
      active: true
    },
    { 
      icon: <MessageSquare size={20} />, 
      label: 'Marketing', 
      path: '/marketing'
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
  
  // Form schema
  const schema = z.object({
    tone: z.string().min(1, { message: 'Tone is required' }),
    maxLength: z.number().min(50, { message: 'Minimum length is 50 characters' }).max(1000, { message: 'Maximum length is 1000 characters' }),
    includeLinks: z.boolean(),
    allowEmojis: z.boolean(),
    responseTime: z.number().min(1, { message: 'Minimum time is 1 second' }).max(10, { message: 'Maximum time is 10 seconds' }),
    fallbackMessage: z.string().min(10, { message: 'Fallback message must be at least 10 characters' })
  });
  
  // Form setup
  const { register, handleSubmit, formState: { errors } } = useForm<ConstraintsFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tone: 'Professional',
      maxLength: 250,
      includeLinks: true,
      allowEmojis: false,
      responseTime: 3,
      fallbackMessage: "I'm sorry, I don't have enough information to answer that question. Would you like to speak with a human agent?"
    }
  });
  
  // Form submission
  const onSubmit = (data: ConstraintsFormData) => {
    console.log('Constraints data:', data);
    // In a real app, this would save the constraints to the backend
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <Bot size={24} className="text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">Build Chat AI Assistant</span>
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
              AI Constraints
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
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Configure AI Behavior</h2>
              <p className="text-gray-600">Set constraints and preferences for your AI chatbot's responses.</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tone */}
                <div>
                  <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">
                    Conversation Tone
                  </label>
                  <select
                    id="tone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register('tone')}
                  >
                    <option value="Professional">Professional</option>
                    <option value="Casual">Casual</option>
                    <option value="Friendly">Friendly</option>
                    <option value="Technical">Technical</option>
                    <option value="Empathetic">Empathetic</option>
                  </select>
                  {errors.tone && (
                    <p className="mt-1 text-sm text-red-600">{errors.tone.message}</p>
                  )}
                </div>
                
                {/* Max Length */}
                <div>
                  <label htmlFor="maxLength" className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Response Length (characters)
                  </label>
                  <input
                    id="maxLength"
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register('maxLength', { valueAsNumber: true })}
                  />
                  {errors.maxLength && (
                    <p className="mt-1 text-sm text-red-600">{errors.maxLength.message}</p>
                  )}
                </div>
                
                {/* Include Links */}
                <div className="flex items-center">
                  <input
                    id="includeLinks"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    {...register('includeLinks')}
                  />
                  <label htmlFor="includeLinks" className="ml-2 block text-sm text-gray-700">
                    Include links in responses when relevant
                  </label>
                </div>
                
                {/* Allow Emojis */}
                <div className="flex items-center">
                  <input
                    id="allowEmojis"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    {...register('allowEmojis')}
                  />
                  <label htmlFor="allowEmojis" className="ml-2 block text-sm text-gray-700">
                    Allow emojis in responses
                  </label>
                </div>
                
                {/* Response Time */}
                <div>
                  <label htmlFor="responseTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Response Time (seconds)
                  </label>
                  <input
                    id="responseTime"
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register('responseTime', { valueAsNumber: true })}
                  />
                  {errors.responseTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.responseTime.message}</p>
                  )}
                </div>
              </div>
              
              {/* Fallback Message */}
              <div>
                <label htmlFor="fallbackMessage" className="block text-sm font-medium text-gray-700 mb-1">
                  Fallback Message (when AI cannot answer)
                </label>
                <textarea
                  id="fallbackMessage"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  {...register('fallbackMessage')}
                ></textarea>
                {errors.fallbackMessage && (
                  <p className="mt-1 text-sm text-red-600">{errors.fallbackMessage.message}</p>
                )}
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Save size={16} className="mr-2" />
                  Save Constraints
                </button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ConstraintsPage;