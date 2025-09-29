
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import AnalysisPage from './components/AnalysisPage';
import Footer from './components/Footer';
import type { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'search':
        return <SearchPage setPage={setCurrentPage} />;
      case 'analysis':
        return <AnalysisPage setPage={setCurrentPage} />;
      case 'home':
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
