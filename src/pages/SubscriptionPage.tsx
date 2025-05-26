import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bot, Info } from 'lucide-react';
import { motion } from 'framer-motion';

import LanguageSelector from '../components/LanguageSelector';
import SubscriptionCard from '../components/SubscriptionCard';
import TermsModal from '../components/TermsModal';

type PlanType = 'basic' | 'standard' | 'professional' | 'enterprise';

const SubscriptionPage = () => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  
  const handlePlanSelect = (plan: PlanType) => {
    setSelectedPlan(plan);
    setIsTermsModalOpen(true);
  };
  
  const handleTermsAccept = () => {
    // In a real app, this would redirect to the payment gateway
    console.log('Terms accepted for plan:', selectedPlan);
    setIsTermsModalOpen(false);
    // Simulate payment process
    alert(`Redirecting to payment gateway for ${selectedPlan} plan...`);
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
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              {t('subscription.title')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Select the plan that best fits your business needs
            </motion.p>
          </div>
          
          {/* Subscription Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <SubscriptionCard
              type="basic"
              isSelected={selectedPlan === 'basic'}
              onSelect={() => handlePlanSelect('basic')}
            />
            
            <SubscriptionCard
              type="standard"
              isSelected={selectedPlan === 'standard'}
              onSelect={() => handlePlanSelect('standard')}
            />
            
            <SubscriptionCard
              type="professional"
              isSelected={selectedPlan === 'professional'}
              onSelect={() => handlePlanSelect('professional')}
            />
            
            <SubscriptionCard
              type="enterprise"
              isSelected={selectedPlan === 'enterprise'}
              onSelect={() => handlePlanSelect('enterprise')}
            />
          </div>
          
          {/* Integration Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-3xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start"
          >
            <Info size={20} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              {t('subscription.integration')}
            </p>
          </motion.div>
        </main>
        
        {/* Footer */}
        <footer className="py-8 border-t border-gray-200">
          <div className="text-center text-gray-500 text-sm">
            &copy; 2025 AI Chat Assistant. All rights reserved.
          </div>
        </footer>
      </div>
      
      {/* Terms Modal */}
      {selectedPlan && (
        <TermsModal
          isOpen={isTermsModalOpen}
          onClose={() => setIsTermsModalOpen(false)}
          onAccept={handleTermsAccept}
          planType={selectedPlan}
        />
      )}
    </motion.div>
  );
};

export default SubscriptionPage;