import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

type SubscriptionCardProps = {
  type: 'basic' | 'standard' | 'professional' | 'enterprise';
  isSelected: boolean;
  onSelect: () => void;
};

const SubscriptionCard = ({ type, isSelected, onSelect }: SubscriptionCardProps) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={onSelect}
      className={`rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'ring-4 ring-blue-500 transform scale-105 bg-white' 
          : 'bg-white hover:shadow-xl'
      }`}
    >
      <div className={`p-6 ${
        type === 'basic' ? 'bg-blue-50' :
        type === 'standard' ? 'bg-indigo-50' :
        type === 'professional' ? 'bg-purple-50' :
        'bg-gray-50'
      }`}>
        <h3 className={`text-xl font-bold ${
          type === 'basic' ? 'text-blue-700' :
          type === 'standard' ? 'text-indigo-700' :
          type === 'professional' ? 'text-purple-700' :
          'text-gray-700'
        }`}>
          {t(`subscription.${type}.title`)}
        </h3>
        <p className="text-2xl font-bold mt-2">
          {t(`subscription.${type}.price`)}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {t(`subscription.${type}.description`)}
        </p>
      </div>
      
      <div className="p-6">
        <ul className="space-y-3">
          {t(`subscription.${type}.features`, { returnObjects: true }).map((feature: string, index: number) => (
            <li key={index} className="flex items-start">
              <Check size={18} className={`mr-2 mt-0.5 flex-shrink-0 ${
                type === 'basic' ? 'text-blue-500' :
                type === 'standard' ? 'text-indigo-500' :
                type === 'professional' ? 'text-purple-500' :
                'text-gray-500'
              }`} />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button 
          className={`mt-6 w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            isSelected 
              ? type === 'basic' ? 'bg-blue-600 text-white' :
                type === 'standard' ? 'bg-indigo-600 text-white' :
                type === 'professional' ? 'bg-purple-600 text-white' :
                'bg-gray-800 text-white'
              : type === 'basic' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                type === 'standard' ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' :
                type === 'professional' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' :
                'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isSelected ? '✓ ' + t('subscription.select') : t('subscription.select')}
        </button>
      </div>
    </motion.div>
  );
};

export default SubscriptionCard;