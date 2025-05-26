import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

import LanguageSelector from '../components/LanguageSelector';
import ChatbotForm from '../components/ChatbotForm';

const SignupPage = () => {
  const { t } = useTranslation();
  
  const handleSignup = (data: any) => {
    // In a real app, this would register the user and redirect to OTP verification
    console.log('Signup data:', data);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Bot size={32} className="text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">AI Chat Assistant</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              {t('navigation.login')}
            </Link>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="py-12">
          <div className="max-w-xl mx-auto text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              {t('navigation.signup')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600"
            >
              Create your account to get started with AI Chat Assistant
            </motion.p>
          </div>
          
          <ChatbotForm onSubmit={handleSignup} />
        </main>
        
        {/* Footer */}
        <footer className="py-8 border-t border-gray-200">
          <div className="text-center text-gray-500 text-sm">
            &copy; 2025 AI Chat Assistant. All rights reserved.
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default SignupPage;