import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

type OTPFormProps = {
  onSubmit: (emailOtp: string, phoneOtp: string) => void;
  onResend: () => void;
};

const OTPForm = ({ onSubmit, onResend }: OTPFormProps) => {
  const { t } = useTranslation();
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(emailOtp, phoneOtp);
  };

  const handleResend = () => {
    onResend();
    setIsResending(true);
    let count = 60;
    setCountdown(count);
    
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      
      if (count <= 0) {
        clearInterval(timer);
        setIsResending(false);
      }
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {t('otp.title')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="emailOtp" className="block text-sm font-medium text-gray-700 mb-1">
            {t('otp.emailCode')}
          </label>
          <input
            id="emailOtp"
            type="text"
            maxLength={6}
            value={emailOtp}
            onChange={(e) => setEmailOtp(e.target.value.replace(/[^0-9]/g, ''))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors text-center text-xl tracking-widest"
          />
        </div>
        
        <div>
          <label htmlFor="phoneOtp" className="block text-sm font-medium text-gray-700 mb-1">
            {t('otp.phoneCode')}
          </label>
          <input
            id="phoneOtp"
            type="text"
            maxLength={6}
            value={phoneOtp}
            onChange={(e) => setPhoneOtp(e.target.value.replace(/[^0-9]/g, ''))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors text-center text-xl tracking-widest"
          />
        </div>
        
        <div className="flex flex-col space-y-4">
          <button 
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {t('otp.submit')}
          </button>
          
          <button 
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? `${t('otp.resend')} (${countdown}s)` : t('otp.resend')}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default OTPForm;