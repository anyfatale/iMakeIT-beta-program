import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, BookOpen, TrendingUp, ArrowRight, Star, Users, Award } from 'lucide-react';

interface LandingPageProps {
  onLogin: (userData: any) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', goal: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  const features = [
    {
      icon: Target,
      title: 'Zarządzanie Projektami',
      description: 'Zaawansowane narzędzia do planowania i realizacji projektów online',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Śledzenie Nawyków',
      description: 'Buduj pozytywne nawyki i śledź swój postęp w czasie rzeczywistym',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BookOpen,
      title: 'Platforma Edukacyjna',
      description: 'Kursy, szkolenia i materiały do rozwoju w biznesie online',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Aktywnych Użytkowników', icon: Users },
    { number: '500+', label: 'Ukończonych Projektów', icon: Target },
    { number: '98%', label: 'Zadowolenie Klientów', icon: Star },
    { number: '50+', label: 'Dostępnych Kursów', icon: Award }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-yellow-400" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
              iMakeIt!
            </h1>
            
            <p className="text-2xl md:text-3xl text-blue-100 mb-4 font-light">
              Rozpocznij drogę do sukcesu online
            </p>
            
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              To nie jest zwykła platforma edukacyjna. To miejsce, które umożliwia Ci szybkie wejście w świat biznesu online i skuteczne wykorzystanie nowych możliwości.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
          >
            <button
              onClick={() => setShowLoginForm(true)}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center mx-auto sm:mx-0"
            >
              <span className="mr-2">Zacznij Teraz</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 block mx-auto sm:mx-0">
              Zobacz Demo
            </button>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Wszystko czego potrzebujesz w jednym miejscu
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Kompleksowe rozwiązanie do zarządzania projektami, budowania nawyków i edukacji online
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowLoginForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Dołącz do iMakeIt!
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Twoje imię"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Adres email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Twój główny cel (opcjonalnie)"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Rozpocznij Przygodę
              </button>
            </form>
            
            <button
              onClick={() => setShowLoginForm(false)}
              className="mt-4 text-gray-400 hover:text-white transition-colors w-full text-center"
            >
              Anuluj
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;