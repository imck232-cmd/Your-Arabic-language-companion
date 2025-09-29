import React, { useState } from 'react';
import type { Page, SearchResult } from '../types';
import { performSearch } from '../services/geminiService';
import Loader from './common/Loader';
import Button from './common/Button';
import { BackIcon } from './common/icons';

interface SearchPageProps {
  setPage: (page: Page) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ setPage }) => {
  const [query, setQuery] = useState('');
  const [preferredSources, setPreferredSources] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('الرجاء إدخال نص للتحليل.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const searchResult = await performSearch(query, preferredSources);
      setResult(searchResult);
    } catch (err) {
      setError('حدث خطأ أثناء التحليل. الرجاء المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-teal-700">التحليل الأدبي</h1>
        <Button onClick={() => setPage('home')} variant="secondary" className="flex items-center gap-2">
            <BackIcon />
            <span>العودة للرئيسية</span>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="أدخل النص الأدبي (شعر أو نثر) هنا لتحليله وتوثيق نسبته..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
          rows={4}
          aria-label="موضوع التحليل الأدبي"
        />
        <div className="mt-4">
            <label htmlFor="sources" className="block text-sm font-medium text-gray-700 mb-1">
                المصادر المفضلة (اختياري)
            </label>
            <input
                type="text"
                id="sources"
                value={preferredSources}
                onChange={(e) => setPreferredSources(e.target.value)}
                placeholder="مثال: shamela.ws, aldiwan.net"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                aria-describedby="sources-description"
            />
            <p id="sources-description" className="sr-only">أدخل هنا المصادر التي تفضل أن يعتمد عليها البحث، مفصولة بفاصلة.</p>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'جاري التحليل...' : 'تحليل'}
          </Button>
        </div>
      </div>
      
      {isLoading && <Loader message="...يتم استخلاص أفضل النتائج من مصادر متعددة" />}
      
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert"><p>{error}</p></div>}
      
      {result && (
        <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
          <h2 className="text-2xl font-bold text-teal-800 mb-4 border-b-2 border-teal-200 pb-2">نتائج التحليل</h2>
          <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
            <p>{result.summary}</p>
          </div>
          {result.sources && result.sources.length > 0 && (
              <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-600 mb-3">المصادر المعتمدة في التحليل:</h3>
                  <ul className="list-disc ps-6 space-y-2">
                      {result.sources.map((source, index) => (
                          <li key={index}>
                              <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                                  {source.title || source.uri}
                              </a>
                          </li>
                      ))}
                  </ul>
              </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;