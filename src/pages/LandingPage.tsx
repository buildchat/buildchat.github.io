import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Users, Zap } from 'lucide-react';

import LanguageSelector from '../components/LanguageSelector';
import ChatbotForm from '../components/ChatbotForm';
import OTPForm from '../components/OTPForm';

type Step = 'form' | 'otp' | 'chatbot';

const LandingPage = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState({
    website: '',
    email: '',
    phone: ''
  });
  
  const handleFormSubmit = (data: typeof formData) => {
    // In a real app, this would call an API to send OTPs
    setFormData(data);
    setStep('otp');
  };
  
  const handleOTPSubmit = (emailOtp: string, phoneOtp: string) => {
    // In a real app, this would verify OTPs with the backend
    console.log('Verifying OTPs:', emailOtp, phoneOtp);
    setStep('chatbot');
  };
  
  const handleOTPResend = () => {
    // In a real app, this would resend OTPs
    console.log('Resending OTPs for:', formData);
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
            <Bot size={32} className="text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">AI Chat Assistant</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              {t('navigation.login')}
            </Link>
            
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
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            >
              {t('welcome.title')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {t('welcome.subtitle')}
            </motion.p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Conversations</h3>
              <p className="text-gray-600">Engage visitors with intelligent, natural conversations that enhance user experience.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <Users size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Customer Support</h3>
              <p className="text-gray-600">Provide instant support to your customers around the clock, improving satisfaction.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mb-4">
                <Zap size={24} className="text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Integration</h3>
              <p className="text-gray-600">Simple setup process with detailed documentation for seamless website integration.</p>
            </motion.div>
          </div>
          
          {/* Form Section */}
          <div className="max-w-xl mx-auto">
            {step === 'form' && (
              <ChatbotForm onSubmit={handleFormSubmit} />
            )}
            
            {step === 'otp' && (
              <OTPForm onSubmit={handleOTPSubmit} onResend={handleOTPResend} />
            )}
            
            {step === 'chatbot' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center"
              >
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Bot size={32} className="text-green-600" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Chatbot Created!</h2>
                <p className="text-gray-600 mb-6">Your temporary AI chatbot is ready to use. To unlock more features:</p>
                
                <Link
                  to="/subscribe"
                  className="block w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Subscribe Now
                </Link>
              </motion.div>
            )}
          </div>
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

export default LandingPage;