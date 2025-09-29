
import React from 'react';
import { CONSULTANT_NAME, CONSULTANT_TITLE, CONTACT_PHONE_DISPLAY, YEAR } from '../constants';
import type { Page } from '../types';
import { SearchIcon, NoteIcon } from './common/icons';

interface HomePageProps {
  setPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] bg-gradient-to-br from-gray-100 to-teal-100 rounded-lg p-8">
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-xl shadow-2xl max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-teal-800 mb-4" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.1)'}}>
                رفيقك في اللغة العربية
            </h1>
            <div className="text-gray-600 mb-12">
                <p className="text-lg">{`إعداد ${CONSULTANT_TITLE}: ${CONSULTANT_NAME}`}</p>
                <p className="text-md">{`للعام ${YEAR}م | للتواصل: ${CONTACT_PHONE_DISPLAY}`}</p>
            </div>
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <HomeButton
                    icon={<SearchIcon />}
                    label="بحث أدبي موثق"
                    onClick={() => setPage('search')}
                />
                <HomeButton
                    icon={<NoteIcon />}
                    label="تحليل نصي شامل"
                    onClick={() => setPage('analysis')}
                />
            </div>
        </div>
    </div>
  );
};

interface HomeButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="group flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-teal-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
    >
        <div className="text-teal-600 group-hover:text-teal-700 mb-3 transition-colors">{icon}</div>
        <span className="text-xl font-bold text-gray-700 group-hover:text-teal-800 transition-colors">{label}</span>
    </button>
)

export default HomePage;
