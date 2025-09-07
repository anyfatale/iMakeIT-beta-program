import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Bell, 
  Shield, 
  User, 
  Download, 
  Moon, 
  Sun, 
  Volume2,
  Smartphone,
  Globe,
  Database
} from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    primaryColor: '#6366f1',
    notifications: {
      habits: true,
      projects: true,
      courses: false,
      achievements: true
    },
    sound: true,
    language: 'pl',
    autoSave: true,
    compactMode: false
  });

  const colorPresets = [
    { name: 'Indygo', value: '#6366f1', gradient: 'from-indigo-500 to-blue-600' },
    { name: 'Purpura', value: '#8b5cf6', gradient: 'from-purple-500 to-pink-600' },
    { name: 'Róż', value: '#ec4899', gradient: 'from-pink-500 to-rose-600' },
    { name: 'Niebieski', value: '#3b82f6', gradient: 'from-blue-500 to-cyan-600' },
    { name: 'Zielony', value: '#10b981', gradient: 'from-green-500 to-emerald-600' },
    { name: 'Pomarańczowy', value: '#f59e0b', gradient: 'from-orange-500 to-red-600' }
  ];

  const handleColorChange = (color: string) => {
    setSettings({ ...settings, primaryColor: color });
    // Here you would apply the color theme globally
    document.documentElement.style.setProperty('--primary-color', color);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [key]: value }
    });
  };

  const exportData = () => {
    const data = {
      settings,
      projects: JSON.parse(localStorage.getItem('iMakeIt_projects') || '[]'),
      habits: JSON.parse(localStorage.getItem('iMakeIt_habits') || '[]'),
      courses: JSON.parse(localStorage.getItem('iMakeIt_courses') || '[]'),
      userData: JSON.parse(localStorage.getItem('iMakeIt_userData') || '{}')
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'imakeit-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Ustawienia</h1>
        <p className="text-gray-300">Personalizuj swoje doświadczenie z iMakeIt!</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Wygląd</h2>
          </div>

          <div className="space-y-6">
            {/* Theme Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Motyw
              </label>
              <div className="flex bg-gray-700/50 rounded-lg p-1">
                <button
                  onClick={() => setSettings({ ...settings, theme: 'dark' })}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all ${
                    settings.theme === 'dark' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>Ciemny</span>
                </button>
                <button
                  onClick={() => setSettings({ ...settings, theme: 'light' })}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all ${
                    settings.theme === 'light' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>Jasny</span>
                </button>
              </div>
            </div>

            {/* Color Presets */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Kolor główny
              </label>
              <div className="grid grid-cols-3 gap-3">
                {colorPresets.map((preset) => (
                  <motion.button
                    key={preset.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleColorChange(preset.value)}
                    className={`aspect-square rounded-lg bg-gradient-to-br ${preset.gradient} flex items-center justify-center transition-all ${
                      settings.primaryColor === preset.value ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-800' : ''
                    }`}
                  >
                    <span className="text-white text-xs font-medium">{preset.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Compact Mode */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Tryb kompaktowy</p>
                <p className="text-gray-400 text-sm">Mniejsze odstępy i elementy</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, compactMode: !settings.compactMode })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.compactMode ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.compactMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Powiadomienia</h2>
          </div>

          <div className="space-y-4">
            {[
              { key: 'habits', label: 'Przypomnienia o nawykach', desc: 'Codzienne powiadomienia o nawykach' },
              { key: 'projects', label: 'Aktualizacje projektów', desc: 'Powiadomienia o terminach i zadaniach' },
              { key: 'courses', label: 'Nowe kursy', desc: 'Informacje o nowych kursach' },
              { key: 'achievements', label: 'Osiągnięcia', desc: 'Powiadomienia o zdobytych nagrodach' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleNotificationChange(item.key, !settings.notifications[item.key as keyof typeof settings.notifications])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications[item.key as keyof typeof settings.notifications] ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications[item.key as keyof typeof settings.notifications] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Konto użytkownika</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Imię
              </label>
              <input
                type="text"
                value={JSON.parse(localStorage.getItem('iMakeIt_userData') || '{}').name || ''}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="Twoje imię..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={JSON.parse(localStorage.getItem('iMakeIt_userData') || '{}').email || ''}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="twoj@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Główny cel
              </label>
              <textarea
                value={JSON.parse(localStorage.getItem('iMakeIt_userData') || '{}').goal || ''}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                rows={3}
                placeholder="Opisz swój główny cel..."
              />
            </div>
          </div>
        </motion.div>

        {/* System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-red-400" />
            <h2 className="text-xl font-bold text-white">System i dane</h2>
          </div>

          <div className="space-y-4">
            {/* Language */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white font-medium">Język</p>
                  <p className="text-gray-400 text-sm">Polski</p>
                </div>
              </div>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
              >
                <option value="pl">Polski</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Sound */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white font-medium">Dźwięki</p>
                  <p className="text-gray-400 text-sm">Efekty dźwiękowe w aplikacji</p>
                </div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, sound: !settings.sound })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.sound ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.sound ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Auto Save */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white font-medium">Auto-zapis</p>
                  <p className="text-gray-400 text-sm">Automatyczne zapisywanie zmian</p>
                </div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, autoSave: !settings.autoSave })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoSave ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Export Data */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={exportData}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <span>Eksportuj dane</span>
              </button>
              <p className="text-gray-400 text-xs mt-2 text-center">
                Pobierz kopię zapasową wszystkich swoich danych
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end pt-6"
      >
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
          Zapisz ustawienia
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;