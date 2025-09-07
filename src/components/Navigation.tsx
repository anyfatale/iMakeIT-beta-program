import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  FolderKanban, 
  Target, 
  BookOpen, 
  Settings, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: Home },
    { id: 'projects' as Page, label: 'Projekty', icon: FolderKanban },
    { id: 'habits' as Page, label: 'Nawyki', icon: Target },
    { id: 'education' as Page, label: 'Edukacja', icon: BookOpen },
    { id: 'settings' as Page, label: 'Ustawienia', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 text-white"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 z-40"
      >
        <div className="flex flex-col w-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">iMakeIt!</h1>
                <p className="text-xs text-gray-400">Droga do sukcesu</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-6">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-r-2 border-blue-500'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* User Info */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {JSON.parse(localStorage.getItem('iMakeIt_userData') || '{}').name?.[0] || 'U'}
                </span>
              </div>
              <div>
                <p className="text-white font-medium">
                  {JSON.parse(localStorage.getItem('iMakeIt_userData') || '{}').name || 'Użytkownik'}
                </p>
                <p className="text-xs text-gray-400">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.nav
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-64 h-full bg-black/80 backdrop-blur-xl border-r border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col w-full">
              {/* Logo */}
              <div className="p-6 border-b border-white/10 mt-12">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h1 className="text-xl font-bold text-white">iMakeIt!</h1>
                    <p className="text-xs text-gray-400">Droga do sukcesu</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 py-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-r-2 border-blue-500'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;