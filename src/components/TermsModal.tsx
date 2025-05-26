import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TermsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  planType: string;
};

const TermsModal = ({ isOpen, onClose, onAccept, planType }: TermsModalProps) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={onClose}
            />
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {t('subscription.terms')} - {t(`subscription.${planType}.title`)}
                  </h3>
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>
                
                <div className="mt-4 max-h-96 overflow-y-auto">
                  <p className="text-sm text-gray-500 mb-4">
                    Last updated: June 10, 2025
                  </p>
                  
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    1. Subscription Terms
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    By subscribing to our {t(`subscription.${planType}.title`)} plan, you agree to pay the fee of {t(`subscription.${planType}.price`)} plus applicable taxes. Billing occurs monthly from the date of subscription and continues until cancelled.
                  </p>
                  
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    2. Usage Limitations
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Your subscription allows for the usage limits specified in your plan. Exceeding these limits may result in temporary service restrictions or additional charges.
                  </p>
                  
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    3. Cancellation Policy
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    You may cancel your subscription at any time. Upon cancellation, your service will remain active until the end of the current billing period. No refunds are provided for partial months.
                  </p>
                  
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    4. Data Retention
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Following cancellation, your data will be retained for 30 days, after which it will be archived for 3 years before permanent deletion.
                  </p>
                  
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    5. Integration Responsibility
                  </h4>
                  <p className="text-sm text-gray-500">
                    The customer is solely responsible for integrating the AI chatbot with their website. Our company provides technical documentation and limited support but does not perform the integration.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onAccept}
                >
                  Accept & Continue to Payment
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;