
import React, { type ReactNode } from 'react';

type Color = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo' | 'pink';

interface AnalysisSectionCardProps {
  title: string;
  color: Color;
  children: ReactNode;
}

const colorClasses = {
  blue: {
    border: 'border-blue-500',
    bg: 'bg-blue-50',
    title: 'text-blue-800'
  },
  green: {
    border: 'border-green-500',
    bg: 'bg-green-50',
    title: 'text-green-800'
  },
  purple: {
    border: 'border-purple-500',
    bg: 'bg-purple-50',
    title: 'text-purple-800'
  },
  yellow: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-50',
    title: 'text-yellow-800'
  },
  red: {
    border: 'border-red-500',
    bg: 'bg-red-50',
    title: 'text-red-800'
  },
  indigo: {
    border: 'border-indigo-500',
    bg: 'bg-indigo-50',
    title: 'text-indigo-800'
  },
  pink: {
    border: 'border-pink-500',
    bg: 'bg-pink-50',
    title: 'text-pink-800'
  },
}

const AnalysisSectionCard: React.FC<AnalysisSectionCardProps> = ({ title, color, children }) => {
  const classes = colorClasses[color];

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden border-t-4 ${classes.border}`}>
      <div className={`${classes.bg} p-4`}>
        <h2 className={`text-2xl font-bold ${classes.title}`}>{title}</h2>
      </div>
      <div className="p-6 text-gray-700 leading-relaxed prose max-w-none">
        {children}
      </div>
    </div>
  );
};

export default AnalysisSectionCard;
