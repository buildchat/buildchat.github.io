import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Bot, 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  FileText, 
  MessageSquare,
  Database
} from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

import UsageChart from '../components/UsageChart';

// Sidebar item type
type SidebarItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
};

const DashboardPage = () => {
  const { t } = useTranslation();
  const [hasData] = useState(true); // In a real app, this would be determined by API data
  
  // Sidebar items
  const sidebarItems: SidebarItem[] = [
    { 
      icon: <LayoutDashboard size={20} />, 
      label: t('dashboard.title'), 
      path: '/dashboard',
      active: true
    },
    { 
      icon: <Users size={20} />, 
      label: 'Users', 
      path: '/users'
    },
    { 
      icon: <Settings size={20} />, 
      label: 'Constraints', 
      path: '/constraints'
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
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <Bot size={24} className="text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">AI Assistant</span>
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
              {t('dashboard.title')}
            </h1>
          </div>
        </header>
        
        <main className="p-6">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t('dashboard.welcome', { name: 'Admin' })}
            </h2>
            <p className="text-gray-600">
              Here's an overview of your AI chatbot usage and subscription.
            </p>
          </motion.div>
          
          {hasData ? (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Queries</p>
                  <div className="text-2xl font-bold text-gray-900">
                    <CountUp end={12536} separator="," duration={2} />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <p className="text-sm font-medium text-gray-500 mb-1">Today</p>
                  <div className="text-2xl font-bold text-gray-900">
                    <CountUp end={237} duration={2} />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <p className="text-sm font-medium text-gray-500 mb-1">Plan Usage</p>
                  <div className="text-2xl font-bold text-gray-900">
                    <CountUp end={63} duration={2} suffix="%" />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <p className="text-sm font-medium text-gray-500 mb-1">Active Users</p>
                  <div className="text-2xl font-bold text-gray-900">
                    <CountUp end={8} duration={2} />
                  </div>
                </motion.div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <UsageChart type="queries" />
                <UsageChart type="subscription" />
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-8 text-center"
            >
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Bot size={32} className="text-blue-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('dashboard.noData')}
              </h3>
              
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {t('dashboard.noDataDesc')}
              </p>
              
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                View Integration Guide
              </button>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;