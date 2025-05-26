import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { motion } from 'framer-motion';

type FormData = {
  website: string;
  email: string;
  phone: string;
};

const ChatbotForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const { t } = useTranslation();
  
  const schema = z.object({
    website: z.string().min(1, { message: t('validation.websiteRequired') }),
    email: z.string()
      .min(1, { message: t('validation.emailRequired') })
      .email({ message: t('validation.emailInvalid') }),
    phone: z.string()
      .min(1, { message: t('validation.phoneRequired') })
      .refine((phone) => isValidPhoneNumber(phone), {
        message: t('validation.phoneInvalid')
      })
  });

  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      website: '',
      email: '',
      phone: ''
    }
  });
  
  const phone = watch('phone');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.website')}
          </label>
          <input
            id="website"
            type="text"
            placeholder={t('form.websitePlaceholder')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            {...register('website')}
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.phone')}
          </label>
          <PhoneInput
            international
            countrySelectProps={{ unicodeFlags: true }}
            placeholder={t('form.phonePlaceholder')}
            value={phone}
            onChange={(value) => setValue('phone', value || '')}
            className="w-full"
            numberInputProps={{
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors",
              style: { width: '100%' }
            }}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
        
        <button 
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {t('form.submit')}
        </button>
      </form>
    </motion.div>
  );
};

export default ChatbotForm;