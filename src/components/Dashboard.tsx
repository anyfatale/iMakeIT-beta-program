import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Calendar, 
  Award,
  Clock,
  BarChart3,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';
import StatsCard from './StatsCard';
import AnimatedCounter from './AnimatedCounter';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Aktywne Projekty',
      value: 12,
      change: '+15%',
      trend: 'up',
      icon: Target,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Nawyki w trakcie',
      value: 8,
      change: '+25%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Ukończone kursy',
      value: 23,
      change: '+8%',
      trend: 'up',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Punkty XP',
      value: 2847,
      change: '+142',
      trend: 'up',
      icon: Award,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const recentActivities = [
    {
      type: 'project',
      title: 'Ukończono zadanie "Analiza rynku"',
      time: '2 godziny temu',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      type: 'habit',
      title: 'Zaliczono nawyk "Poranna medytacja"',
      time: '6 godzin temu',
      icon: Star,
      color: 'text-yellow-400'
    },
    {
      type: 'education',
      title: 'Rozpoczęto kurs "Marketing w mediach społecznościowych"',
      time: '1 dzień temu',
      icon: BookOpen,
      color: 'text-blue-400'
    },
    {
      type: 'achievement',
      title: 'Odblokowano osiągnięcie "Mistrz konsystencji"',
      time: '2 dni temu',
      icon: Award,
      color: 'text-purple-400'
    }
  ];

  const quickActions = [
    { title: 'Dodaj Projekt', icon: Target, action: 'projects' },
    { title: 'Nowy Nawyk', icon: TrendingUp, action: 'habits' },
    { title: 'Przeglądaj Kursy', icon: BookOpen, action: 'education' },
    { title: 'Sprawdź Kalendarz', icon: Calendar, action: 'calendar' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl border border-white/20 p-6 md:p-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Witaj ponownie, {JSON.parse(localStorage.getItem('iMakeIt_userData') || '{}').name || 'Bohaterze'}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Jesteś o krok bliżej swoich celów. Sprawdź swoje postępy!
            </p>
          </div>
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="hidden md:block"
          >
            <Zap className="w-16 h-16 text-yellow-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Postęp w tym miesiącu</h3>
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Projekty</span>
                <span className="text-white">75%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Nawyki</span>
                <span className="text-white">88%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '88%' }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Edukacja</span>
                <span className="text-white">62%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '62%' }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Ostatnia aktywność</h3>
            <Clock className="w-6 h-6 text-blue-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <activity.icon className={`w-5 h-5 mt-0.5 ${activity.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-snug">
                    {activity.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Szybkie akcje</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
            >
              <action.icon className="w-8 h-8 text-blue-400" />
              <span className="text-white font-medium text-sm text-center">
                {action.title}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;