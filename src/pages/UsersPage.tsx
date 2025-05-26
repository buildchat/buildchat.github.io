import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  FileText, 
  MessageSquare,
  Database,
  UserPlus,
  Edit,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';

// Sidebar item type
type SidebarItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
};

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Maria Garcia', email: 'maria@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Ahmed Khan', email: 'ahmed@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Li Wei', email: 'li@example.com', role: 'Viewer', status: 'Active' }
];

const UsersPage = () => {
  // Sidebar items
  const sidebarItems: SidebarItem[] = [
    { 
      icon: <LayoutDashboard size={20} />, 
      label: 'Dashboard', 
      path: '/dashboard'
    },
    { 
      icon: <Users size={20} />, 
      label: 'Users', 
      path: '/users',
      active: true
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
              User Management
            </h1>
            
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <UserPlus size={16} className="mr-2" />
              Add User
            </button>
          </div>
        </header>
        
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UsersPage;