
import React from 'react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'جاري التحميل...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-gray-600">{message}</p>
    </div>
  );
};

export default Loader;
