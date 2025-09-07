import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Target, TrendingUp, CheckCircle, Flame, Star, Award } from 'lucide-react';

interface Habit {
  id: string;
  title: string;
  description: string;
  category: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
  totalCompletions: number;
  color: string;
  icon: string;
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Poranna medytacja',
      description: '10 minut mindfulness każdego ranka',
      category: 'Zdrowie',
      frequency: 'daily',
      currentStreak: 15,
      longestStreak: 28,
      completedToday: true,
      totalCompletions: 47,
      color: 'from-purple-500 to-pink-500',
      icon: '🧘‍♀️'
    },
    {
      id: '2',
      title: 'Czytanie książek',
      description: '30 stron dziennie',
      category: 'Edukacja',
      frequency: 'daily',
      currentStreak: 8,
      longestStreak: 15,
      completedToday: false,
      totalCompletions: 23,
      color: 'from-blue-500 to-cyan-500',
      icon: '📚'
    },
    {
      id: '3',
      title: 'Trening siłowy',
      description: '45 minut ćwiczeń',
      category: 'Fitness',
      frequency: 'daily',
      currentStreak: 5,
      longestStreak: 12,
      completedToday: true,
      totalCompletions: 34,
      color: 'from-green-500 to-emerald-500',
      icon: '💪'
    },
    {
      id: '4',
      title: 'Planowanie tygodnia',
      description: 'Organizacja celów na nadchodzący tydzień',
      category: 'Produktywność',
      frequency: 'weekly',
      currentStreak: 3,
      longestStreak: 6,
      completedToday: false,
      totalCompletions: 12,
      color: 'from-orange-500 to-red-500',
      icon: '📅'
    }
  ]);

  const [showNewHabit, setShowNewHabit] = useState(false);

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const wasCompleted = habit.completedToday;
        return {
          ...habit,
          completedToday: !wasCompleted,
          currentStreak: !wasCompleted ? habit.currentStreak + 1 : Math.max(0, habit.currentStreak - 1),
          totalCompletions: !wasCompleted ? habit.totalCompletions + 1 : Math.max(0, habit.totalCompletions - 1),
          longestStreak: !wasCompleted ? Math.max(habit.longestStreak, habit.currentStreak + 1) : habit.longestStreak
        };
      }
      return habit;
    }));
  };

  const stats = {
    totalHabits: habits.length,
    completedToday: habits.filter(h => h.completedToday).length,
    totalStreaks: habits.reduce((acc, h) => acc + h.currentStreak, 0),
    averageStreak: Math.round(habits.reduce((acc, h) => acc + h.currentStreak, 0) / habits.length)
  };

  const categories = [...new Set(habits.map(h => h.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Śledzenie Nawyków</h1>
          <p className="text-gray-300">Buduj pozytywne nawyki i śledź swoje postępy każdego dnia</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewHabit(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Dodaj Nawyk</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Wszystkie nawyki</p>
              <p className="text-2xl font-bold text-white">{stats.totalHabits}</p>
            </div>
            <Target className="w-8 h-8 text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Dziś ukończone</p>
              <p className="text-2xl font-bold text-white">{stats.completedToday}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Łączne serie</p>
              <p className="text-2xl font-bold text-white">{stats.totalStreaks}</p>
            </div>
            <Flame className="w-8 h-8 text-orange-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Średnia seria</p>
              <p className="text-2xl font-bold text-white">{stats.averageStreak}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-400" />
          </div>
        </motion.div>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Dzisiejszy postęp</h3>
          <div className="text-sm text-gray-300">
            {stats.completedToday}/{stats.totalHabits} ukończone
          </div>
        </div>
        
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stats.completedToday / stats.totalHabits) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
            />
          </div>
        </div>
        
        <p className="text-gray-300 text-center">
          {stats.completedToday === stats.totalHabits 
            ? '🎉 Gratulacje! Ukończyłeś wszystkie dzisiejsze nawyki!' 
            : `Zostało ${stats.totalHabits - stats.completedToday} nawyków do ukończenia dzisiaj`
          }
        </p>
      </motion.div>

      {/* Habits Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {habits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group ${
              habit.completedToday ? 'ring-2 ring-green-500/50' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${habit.color} flex items-center justify-center text-2xl`}>
                  {habit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{habit.title}</h3>
                  <p className="text-sm text-gray-300">{habit.description}</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleHabit(habit.id)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  habit.completedToday
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-400 hover:border-green-400'
                }`}
              >
                {habit.completedToday && <CheckCircle className="w-5 h-5" />}
              </motion.button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Kategoria</span>
                <span className="text-sm font-medium text-white bg-white/20 px-2 py-1 rounded-full">
                  {habit.category}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Aktualna seria</span>
                <div className="flex items-center space-x-1">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-bold text-white">{habit.currentStreak} dni</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Najdłuższa seria</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-bold text-white">{habit.longestStreak} dni</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Łącznie ukończeń</span>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-bold text-white">{habit.totalCompletions}</span>
                </div>
              </div>
            </div>

            {/* Frequency indicator */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                habit.frequency === 'daily' ? 'bg-green-500/20 text-green-400' :
                habit.frequency === 'weekly' ? 'bg-blue-500/20 text-blue-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                {habit.frequency === 'daily' ? 'Codziennie' : 
                 habit.frequency === 'weekly' ? 'Tygodniowo' : 'Miesięcznie'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Habit Modal */}
      {showNewHabit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowNewHabit(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Nowy Nawyk</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nazwa nawyku
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  placeholder="np. Poranne bieganie..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Opis
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  rows={2}
                  placeholder="Krótki opis nawyku..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kategoria
                  </label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-green-500">
                    <option value="Zdrowie">Zdrowie</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Edukacja">Edukacja</option>
                    <option value="Produktywność">Produktywność</option>
                    <option value="Relacje">Relacje</option>
                    <option value="Hobby">Hobby</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Częstotliwość
                  </label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-green-500">
                    <option value="daily">Codziennie</option>
                    <option value="weekly">Tygodniowo</option>
                    <option value="monthly">Miesięcznie</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Emoji (opcjonalnie)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  placeholder="🎯"
                  maxLength={2}
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Dodaj Nawyk
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowNewHabit(false)}
                  className="px-6 py-3 border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 font-medium rounded-lg transition-all duration-300"
                >
                  Anuluj
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default HabitTracker;