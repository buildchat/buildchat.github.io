import React, { useState } from 'react';
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
  Save,
  Plus,
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

// QA pair type
type QAPair = {
  id: number;
  question: string;
  answer: string;
};

const KnowledgePage = () => {
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
      path: '/knowledge',
      active: true
    },
    { 
      icon: <FileText size={20} />, 
      label: 'Subscription', 
      path: '/subscription'
    }
  ];
  
  // QA pairs state
  const [qaPairs, setQaPairs] = useState<QAPair[]>([
    { id: 1, question: 'What are your business hours?', answer: 'Our business hours are Monday to Friday, 9am to 6pm Eastern Time.' },
    { id: 2, question: 'How do I reset my password?', answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions sent to your email.' }
  ]);
  
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  
  // Add new QA pair
  const addQAPair = () => {
    if (newQuestion.trim() === '' || newAnswer.trim() === '') {
      return;
    }
    
    const newPair: QAPair = {
      id: Date.now(),
      question: newQuestion,
      answer: newAnswer
    };
    
    setQaPairs([...qaPairs, newPair]);
    setNewQuestion('');
    setNewAnswer('');
  };
  
  // Remove QA pair
  const removeQAPair = (id: number) => {
    setQaPairs(qaPairs.filter(pair => pair.id !== id));
  };
  
  // Save all QA pairs
  const saveQAPairs = () => {
    console.log('Saving QA pairs:', qaPairs);
    // In a real app, this would save the QA pairs to the backend
  };
  
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
              Knowledge Base
            </h1>
          </div>
        </header>
        
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Add Knowledge</h2>
              <p className="text-gray-600">Enhance your AI chatbot's knowledge by adding question and answer pairs.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                  Question
                </label>
                <input
                  id="question"
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="What information are users likely to ask?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                  Answer
                </label>
                <textarea
                  id="answer"
                  rows={3}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Provide a detailed, accurate answer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                ></textarea>
              </div>
              
              <button
                type="button"
                onClick={addQAPair}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={16} className="mr-2" />
                Add Q&A Pair
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Knowledge Base Entries</h2>
              
              <button
                type="button"
                onClick={saveQAPairs}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Save size={16} className="mr-2" />
                Save All
              </button>
            </div>
            
            {qaPairs.length > 0 ? (
              <div className="space-y-6">
                {qaPairs.map((pair) => (
                  <div key={pair.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-md font-semibold text-gray-900">{pair.question}</h3>
                      <button
                        type="button"
                        onClick={() => removeQAPair(pair.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-gray-600">{pair.answer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No knowledge base entries yet. Add some Q&A pairs above.</p>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default KnowledgePage;