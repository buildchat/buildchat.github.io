import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

// Pages
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SubscriptionPage from './pages/SubscriptionPage';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import ConstraintsPage from './pages/ConstraintsPage';
import MarketingPage from './pages/MarketingPage';
import KnowledgePage from './pages/KnowledgePage';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/subscribe" element={<SubscriptionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/constraints" element={<ConstraintsPage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;