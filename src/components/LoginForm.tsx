import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, LogIn } from 'lucide-react';

type LoginMethod = 'email-password' | 'email-otp' | 'phone-otp';

type LoginFormProps = {
  onSubmit: (data: any, method: LoginMethod) => void;
  onSSOLogin: (provider: 'google' | 'apple') => void;
};

const LoginForm = ({ onSubmit, onSSOLogin }: LoginFormProps) => {
  const { t } = useTranslation();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email-password');
  
  const emailPasswordSchema = z.object({
    email: z.string()
      .min(1, { message: t('validation.emailRequired') })
      .email({ message: t('validation.emailInvalid') }),
    password: z.string().min(1, { message: 'Password is required' })
  });
  
  const emailOtpSchema = z.object({
    email: z.string()
      .min(1, { message: t('validation.emailRequired') })
      .email({ message: t('validation.emailInvalid') })
  });
  
  const phoneOtpSchema = z.object({
    phone: z.string().min(1, { message: t('validation.phoneRequired') })
  });
  
  const getSchema = () => {
    switch (loginMethod) {
      case 'email-password':
        return emailPasswordSchema;
      case 'email-otp':
        return emailOtpSchema;
      case 'phone-otp':
        return phoneOtpSchema;
    }
  };
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(getSchema()),
  });
  
  const handleMethodChange = (method: LoginMethod) => {
    setLoginMethod(method);
    reset();
  };
  
  const handleFormSubmit = (data: any) => {
    onSubmit(data, loginMethod);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        <LogIn size={28} className="inline-block mr-2 mb-1" />
        {t('navigation.login')}
      </h2>
      
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => handleMethodChange('email-password')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            loginMethod === 'email-password' 
              ? 'bg-white shadow text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Mail size={16} className="inline-block mr-1 mb-0.5" />
          Password
        </button>
        <button
          type="button"
          onClick={() => handleMethodChange('email-otp')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            loginMethod === 'email-otp' 
              ? 'bg-white shadow text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Mail size={16} className="inline-block mr-1 mb-0.5" />
          OTP
        </button>
        <button
          type="button"
          onClick={() => handleMethodChange('phone-otp')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            loginMethod === 'phone-otp' 
              ? 'bg-white shadow text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Phone size={16} className="inline-block mr-1 mb-0.5" />
          Phone
        </button>
      </div>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {(loginMethod === 'email-password' || loginMethod === 'email-otp') && (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              <Mail size={16} className="inline-block mr-1 mb-0.5" />
              {t('form.email')}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t('form.emailPlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
            )}
          </div>
        )}
        
        {loginMethod === 'email-password' && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              <Lock size={16} className="inline-block mr-1 mb-0.5" />
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>
            )}
          </div>
        )}
        
        {loginMethod === 'phone-otp' && (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              <Phone size={16} className="inline-block mr-1 mb-0.5" />
              {t('form.phone')}
            </label>
            <input
              id="phone"
              type="tel"
              placeholder={t('form.phonePlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message as string}</p>
            )}
          </div>
        )}
        
        <button 
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {loginMethod === 'email-password' ? 'Login' : 'Send OTP'}
        </button>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onSSOLogin('google')}
            className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M12.545, 10.239v3.821h5.445c-0.712, 2.315-2.647, 3.972-5.445, 3.972-3.332, 0-6.033-2.701-6.033-6.032s2.701-6.032, 6.033-6.032c1.498, 0, 2.866, 0.549, 3.921, 1.453l2.814-2.814C17.503, 2.988, 15.139, 2, 12.545, 2 7.021, 2, 2.543, 6.477, 2.543, 12s4.478, 10, 10.002, 10c8.396, 0, 10.249-7.85, 9.426-11.748l-9.426, 0.017z"
                fill="#4285F4"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => onSSOLogin('apple')}
            className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M16.498 0H7.502C3.358 0 0 3.358 0 7.502v8.996C0 20.642 3.358 24 7.502 24h8.996c4.144 0 7.502-3.358 7.502-7.502V7.502C24 3.358 20.642 0 16.498 0zm-3.6 16.459c-.055.131-.129.212-.19.212-.062 0-.25-.131-.437-.131-.187 0-.375.131-.437.131-.061 0-.186-.08-.242-.212-.88-2.167-1.811-2.095-1.811-3.907 0-2.211 1.75-3.021 2.43-3.021.68 0 .932.411 1.030.411.098 0 .353-.411 1.030-.411.682 0 2.43.81 2.43 3.021 0 1.812-.93 1.74-1.811 3.907zm1.622-8.911c-.312.365-.82.598-1.32.598-.132 0-.264-.02-.396-.033.033.066.066.1.066.166 0 .332-.264.631-.663.631-.396 0-.663-.299-.663-.631 0-.066.033-.1.066-.166-.132.013-.264.033-.396.033-.5 0-1.009-.234-1.32-.598-.426-.499-.358-1.096-.358-1.096.033-.499.326-.963.76-1.228.365-.234.826-.366 1.295-.366.066 0 .1 0 .166.013.013-.033.02-.066.033-.066.132-.233.363-.366.624-.366s.492.133.624.366c.013 0 .02.033.033.066.066-.013.1-.013.166-.013.469 0 .93.133 1.295.366.435.266.728.73.76 1.228 0 0 .067.597-.359 1.096z"
                fill="#000000"
              />
            </svg>
            Apple
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;