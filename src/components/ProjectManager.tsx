import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Users, Clock, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  dueDate: string;
  team: string[];
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  assignee: string;
}

const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Platforma E-commerce',
      description: 'Budowa nowoczesnej platformy sprzedażowej online',
      status: 'in-progress',
      priority: 'high',
      progress: 65,
      dueDate: '2024-02-15',
      team: ['Anna K.', 'Michał P.', 'Kasia W.'],
      tasks: [
        { id: '1', title: 'Analiza wymagań', completed: true, assignee: 'Anna K.' },
        { id: '2', title: 'Projekt UI/UX', completed: true, assignee: 'Kasia W.' },
        { id: '3', title: 'Implementacja backend', completed: false, assignee: 'Michał P.' },
        { id: '4', title: 'Testy jednostkowe', completed: false, assignee: 'Anna K.' }
      ]
    },
    {
      id: '2',
      title: 'Aplikacja Mobilna',
      description: 'Rozwój aplikacji mobilnej dla iOS i Android',
      status: 'planning',
      priority: 'medium',
      progress: 15,
      dueDate: '2024-03-20',
      team: ['Tomek L.', 'Ola M.'],
      tasks: [
        { id: '5', title: 'Wireframes', completed: true, assignee: 'Ola M.' },
        { id: '6', title: 'Wybór technologii', completed: false, assignee: 'Tomek L.' }
      ]
    },
    {
      id: '3',
      title: 'System CRM',
      description: 'Wdrożenie systemu zarządzania relacjami z klientami',
      status: 'completed',
      priority: 'high',
      progress: 100,
      dueDate: '2024-01-30',
      team: ['Paweł K.', 'Marta S.'],
      tasks: [
        { id: '7', title: 'Konfiguracja systemu', completed: true, assignee: 'Paweł K.' },
        { id: '8', title: 'Migracja danych', completed: true, assignee: 'Marta S.' },
        { id: '9', title: 'Szkolenie zespołu', completed: true, assignee: 'Paweł K.' }
      ]
    }
  ]);

  const [showNewProject, setShowNewProject] = useState(false);

  const statusColors = {
    planning: 'from-yellow-500 to-orange-500',
    'in-progress': 'from-blue-500 to-cyan-500',
    review: 'from-purple-500 to-pink-500',
    completed: 'from-green-500 to-emerald-500'
  };

  const priorityColors = {
    low: 'text-green-400 bg-green-400/20',
    medium: 'text-yellow-400 bg-yellow-400/20',
    high: 'text-red-400 bg-red-400/20'
  };

  const statusLabels = {
    planning: 'Planowanie',
    'in-progress': 'W trakcie',
    review: 'Do przeglądu',
    completed: 'Ukończone'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Zarządzanie Projektami</h1>
          <p className="text-gray-300">Organizuj, śledź i realizuj swoje projekty efektywnie</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewProject(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span>Nowy Projekt</span>
        </motion.button>
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
              <p className="text-gray-300 text-sm">Wszystkie</p>
              <p className="text-2xl font-bold text-white">{projects.length}</p>
            </div>
            <PlayCircle className="w-8 h-8 text-blue-400" />
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
              <p className="text-2xl font-bold text-white">
                {projects.filter(p => p.status === 'in-progress').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
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
              <p className="text-2xl font-bold text-white">
                {projects.filter(p => p.status === 'completed').length}
              </p>
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
              <p className="text-gray-300 text-sm">Opóźnione</p>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[project.priority]}`}>
                    {project.priority === 'high' ? 'Wysoki' : project.priority === 'medium' ? 'Średni' : 'Niski'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{project.description}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Postęp</span>
                <span className="text-white font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className={`bg-gradient-to-r ${statusColors[project.status]} h-2 rounded-full`}
                />
              </div>
            </div>

            {/* Status and Date */}
            <div className="flex items-center justify-between mb-4">
              <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${statusColors[project.status]} text-white text-sm font-medium`}>
                {statusLabels[project.status]}
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.dueDate).toLocaleDateString('pl-PL')}</span>
              </div>
            </div>

            {/* Team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <div className="flex -space-x-2">
                  {project.team.slice(0, 3).map((member, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-gray-800"
                      title={member}
                    >
                      {member[0]}
                    </div>
                  ))}
                  {project.team.length > 3 && (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-gray-800">
                      +{project.team.length - 3}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                {project.tasks.filter(t => t.completed).length}/{project.tasks.length} zadań
              </div>
            </div>

            {/* Tasks Preview */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-gray-300 mb-2">Ostatnie zadania:</p>
              <div className="space-y-1">
                {project.tasks.slice(-2).map(task => (
                  <div key={task.id} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className={`w-4 h-4 ${task.completed ? 'text-green-400' : 'text-gray-500'}`} />
                    <span className={`${task.completed ? 'text-gray-300 line-through' : 'text-white'}`}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowNewProject(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Nowy Projekt</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nazwa projektu
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Wpisz nazwę projektu..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Opis
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  rows={3}
                  placeholder="Opisz swój projekt..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priorytet
                  </label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500">
                    <option value="low">Niski</option>
                    <option value="medium">Średni</option>
                    <option value="high">Wysoki</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Termin
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Utwórz Projekt
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
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

export default ProjectManager;