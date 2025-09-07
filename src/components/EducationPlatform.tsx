import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  PlayCircle, 
  Clock, 
  Star, 
  Award, 
  TrendingUp,
  Users,
  CheckCircle,
  Lock,
  Download
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail: string;
  price: number;
  isEnrolled: boolean;
  progress: number;
  color: string;
}

const EducationPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'enrolled' | 'completed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Marketing w Mediach Społecznościowych',
      description: 'Kompleksowy kurs o tworzeniu skutecznych kampanii w social media',
      instructor: 'Anna Kowalska',
      duration: '8 godzin',
      lessons: 24,
      rating: 4.9,
      students: 1247,
      level: 'beginner',
      category: 'Marketing',
      thumbnail: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg',
      price: 299,
      isEnrolled: true,
      progress: 65,
      color: 'from-pink-500 to-red-500'
    },
    {
      id: '2',
      title: 'E-commerce od Podstaw',
      description: 'Naucz się budować i prowadzić sklep internetowy od zera',
      instructor: 'Michał Nowak',
      duration: '12 godzin',
      lessons: 36,
      rating: 4.8,
      students: 892,
      level: 'intermediate',
      category: 'E-commerce',
      thumbnail: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      price: 399,
      isEnrolled: true,
      progress: 30,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '3',
      title: 'SEO i Pozycjonowanie',
      description: 'Mistrzowskie techniki optymalizacji stron dla wyszukiwarek',
      instructor: 'Kasia Wiśniewska',
      duration: '6 godzin',
      lessons: 18,
      rating: 4.7,
      students: 634,
      level: 'advanced',
      category: 'SEO',
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
      price: 249,
      isEnrolled: false,
      progress: 0,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '4',
      title: 'Copywriting Sprzedażowy',
      description: 'Pisz teksty, które sprzedają i angażują odbiorców',
      instructor: 'Tomasz Król',
      duration: '5 godzin',
      lessons: 15,
      rating: 4.9,
      students: 1123,
      level: 'intermediate',
      category: 'Copywriting',
      thumbnail: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg',
      price: 199,
      isEnrolled: false,
      progress: 0,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '5',
      title: 'Personal Branding',
      description: 'Zbuduj silną markę osobistą w internecie',
      instructor: 'Ola Majewska',
      duration: '4 godziny',
      lessons: 12,
      rating: 4.6,
      students: 567,
      level: 'beginner',
      category: 'Branding',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      price: 149,
      isEnrolled: true,
      progress: 100,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: '6',
      title: 'Analityka Web',
      description: 'Analizuj dane i optymalizuj swoje strony internetowe',
      instructor: 'Paweł Zając',
      duration: '10 godzin',
      lessons: 30,
      rating: 4.8,
      students: 445,
      level: 'advanced',
      category: 'Analityka',
      thumbnail: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg',
      price: 349,
      isEnrolled: false,
      progress: 0,
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const categories = ['all', ...new Set(courses.map(c => c.category))];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
    const tabMatch = 
      activeTab === 'all' || 
      (activeTab === 'enrolled' && course.isEnrolled) ||
      (activeTab === 'completed' && course.progress === 100);
    return categoryMatch && tabMatch;
  });

  const stats = {
    enrolled: courses.filter(c => c.isEnrolled).length,
    completed: courses.filter(c => c.progress === 100).length,
    inProgress: courses.filter(c => c.isEnrolled && c.progress > 0 && c.progress < 100).length,
    certificates: courses.filter(c => c.progress === 100).length
  };

  const tabs = [
    { id: 'all' as const, label: 'Wszystkie kursy', count: courses.length },
    { id: 'enrolled' as const, label: 'Moje kursy', count: stats.enrolled },
    { id: 'completed' as const, label: 'Ukończone', count: stats.completed }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Platforma Edukacyjna</h1>
          <p className="text-gray-300">Rozwijaj swoje umiejętności w biznesie online</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-yellow-400">
            <Award className="w-5 h-5" />
            <span className="font-semibold">{stats.certificates} Certyfikatów</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Zapisane kursy</p>
              <p className="text-2xl font-bold text-white">{stats.enrolled}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-400" />
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
              <p className="text-gray-300 text-sm">W trakcie</p>
              <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
            </div>
            <PlayCircle className="w-8 h-8 text-orange-400" />
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
              <p className="text-gray-300 text-sm">Ukończone</p>
              <p className="text-2xl font-bold text-white">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
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
              <p className="text-gray-300 text-sm">Certyfikaty</p>
              <p className="text-2xl font-bold text-white">{stats.certificates}</p>
            </div>
            <Award className="w-8 h-8 text-yellow-400" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex bg-white/10 rounded-lg p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-300 text-sm">Kategoria:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Wszystkie' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 group"
          >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.level === 'beginner' ? 'bg-green-500/20 text-green-400' :
                  course.level === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {course.level === 'beginner' ? 'Początkujący' :
                   course.level === 'intermediate' ? 'Średniozaawansowany' : 'Zaawansowany'}
                </span>
              </div>
              
              <div className="absolute top-4 right-4">
                {course.isEnrolled ? (
                  <div className="bg-green-500 p-1 rounded-full">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="bg-gray-700/80 p-1 rounded-full">
                    <Lock className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-200">
                  by {course.instructor}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Course Info */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{course.duration}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{course.lessons} lekcji</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">{course.rating}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{course.students}</span>
                </div>
              </div>

              {/* Progress (for enrolled courses) */}
              {course.isEnrolled && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Postęp</span>
                    <span className="text-white font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`bg-gradient-to-r ${course.color} h-2 rounded-full`}
                    />
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex items-center justify-between">
                <div className="text-white font-bold text-lg">
                  {course.isEnrolled ? 'Zapisany' : `${course.price} zł`}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    course.isEnrolled
                      ? course.progress === 100
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {course.isEnrolled
                    ? course.progress === 100
                      ? 'Certyfikat'
                      : 'Kontynuuj'
                    : 'Zapisz się'
                  }
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Brak kursów w tej kategorii</p>
        </div>
      )}
    </div>
  );
};

export default EducationPlatform;