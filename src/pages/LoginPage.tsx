import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

import LanguageSelector from '../components/LanguageSelector';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleLogin = (data: any, method: string) => {
    // In a real app, this would authenticate the user
    console.log('Login data:', data, 'Method:', method);
    navigate('/dashboard');
  };
  
  const handleSSOLogin = (provider: 'google' | 'apple') => {
    // In a real app, this would initiate SSO authentication
    console.log('SSO login with:', provider);
    navigate('/dashboard');
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
              to="/signup"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {t('navigation.signup')}
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
              Welcome Back
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600"
            >
              Access your AI Chat Assistant dashboard
            </motion.p>
          </div>
          
          <LoginForm onSubmit={handleLogin} onSSOLogin={handleSSOLogin} />
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

export default LoginPage;