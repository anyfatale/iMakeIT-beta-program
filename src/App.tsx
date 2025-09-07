import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ProjectManager from './components/ProjectManager';
import HabitTracker from './components/HabitTracker';
import EducationPlatform from './components/EducationPlatform';
import Settings from './components/Settings';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import ParticleBackground from './components/ParticleBackground';

export type Page = 'landing' | 'dashboard' | 'projects' | 'habits' | 'education' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('iMakeIt_hasVisited');
    const userData = localStorage.getItem('iMakeIt_userData');
    
    if (hasVisited && userData) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (userData: any) => {
    localStorage.setItem('iMakeIt_hasVisited', 'true');
    localStorage.setItem('iMakeIt_userData', JSON.stringify(userData));
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    if (!isAuthenticated && currentPage === 'landing') {
      return <LandingPage onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectManager />;
      case 'habits':
        return <HabitTracker />;
      case 'education':
        return <EducationPlatform />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <DataProvider>
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
          <ParticleBackground />
          
          {isAuthenticated && (
            <Navigation 
              currentPage={currentPage} 
              onPageChange={setCurrentPage} 
            />
          )}

          <AnimatePresence mode="wait">
            <motion.main
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={isAuthenticated ? 'ml-0 md:ml-64 p-4 md:p-6' : ''}
            >
              {renderPage()}
            </motion.main>
          </AnimatePresence>
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;