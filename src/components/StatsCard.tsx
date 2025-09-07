import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

interface StatsCardProps {
  title: string;
  value: number;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: string;
  index: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 group hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div className={`text-sm font-medium px-2 py-1 rounded-full ${
          trend === 'up' 
            ? 'text-green-400 bg-green-400/20' 
            : 'text-red-400 bg-red-400/20'
        }`}>
          {change}
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-3xl font-bold text-white">
          <AnimatedCounter value={value} />
        </h3>
        <p className="text-gray-300 text-sm font-medium">{title}</p>
      </div>
    </motion.div>
  );
};

export default StatsCard;