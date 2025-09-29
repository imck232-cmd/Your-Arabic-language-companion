import React, { useState } from 'react';
import type { Page, AnalysisResult } from '../types';
import { analyzeText } from '../services/geminiService';
import Loader from './common/Loader';
import Button from './common/Button';
import AnalysisSectionCard from './AnalysisSectionCard';
import { BackIcon } from './common/icons';

interface AnalysisPageProps {
  setPage: (page: Page) => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ setPage }) => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    if (!inputText.trim()) {
      setError('الرجاء إدخال نص لتحليله.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeText(inputText);
      setResult(analysisResult);
    } catch (err) {
      setError('حدث خطأ أثناء التحليل. قد يكون النص غير واضح أو الطلب معقد. الرجاء المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-teal-700">التحليل النصي الشامل</h1>
             <Button onClick={() => setPage('home')} variant="secondary" className="flex items-center gap-2">
                <BackIcon />
                <span>العودة للرئيسية</span>
            </Button>
        </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="الصق البيت الشعري أو النص الأدبي هنا..."
          className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 resize-y"
          rows={6}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleAnalysis} disabled={isLoading}>
            {isLoading ? 'جاري التحليل...' : 'حلّل النص'}
          </Button>
        </div>
      </div>
      
      {isLoading && <Loader message="...يقوم الخبير اللغوي الآن بتحليل النص بعمق" />}
      
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert"><p>{error}</p></div>}
      
      {result && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-teal-500">
            <h2 className="text-2xl font-bold text-teal-800 mb-4">النص الأصلي (بعد التنسيق والتشكيل)</h2>
            <p className="text-xl leading-loose whitespace-pre-wrap font-serif">{result.formattedText}</p>
          </div>
          
          <AnalysisSectionCard title="أولاً: التحليل اللغوي" color="green">
            <p className="whitespace-pre-wrap"><strong className="text-green-800">معاني الكلمات:</strong> {result.linguisticAnalysis.strangeWords}</p>
            <p className="whitespace-pre-wrap"><strong className="text-green-800">المفرد والمثنى والجمع:</strong> {result.linguisticAnalysis.forms}</p>
            <p className="whitespace-pre-wrap"><strong className="text-green-800">المرادف والمقابل:</strong> {result.linguisticAnalysis.synonymsAntonyms}</p>
          </AnalysisSectionCard>

          <AnalysisSectionCard title="ثانياً: التحليل الصرفي" color="purple">
             <p className="whitespace-pre-wrap">{result.morphologicalAnalysis.derivatives}</p>
             <p className="whitespace-pre-wrap">{result.morphologicalAnalysis.sources}</p>
             <p className="whitespace-pre-wrap">{result.morphologicalAnalysis.wordWeights}</p>
          </AnalysisSectionCard>
          
          <AnalysisSectionCard title="ثالثاً: التحليل الإملائي" color="yellow">
             <p className="whitespace-pre-wrap">{result.orthographicAnalysis.hamzas}</p>
             <p className="whitespace-pre-wrap">{result.orthographicAnalysis.alifLayinah}</p>
             <p className="whitespace-pre-wrap">{result.orthographicAnalysis.taMarbutaMaftuha}</p>
             <p className="whitespace-pre-wrap">{result.orthographicAnalysis.additionOmission}</p>
          </AnalysisSectionCard>
          
          <AnalysisSectionCard title="رابعاً: التحليل البلاغي" color="red">
            <h3 className="font-bold text-lg text-red-800">أ. قسم المعاني:</h3>
            <p className="mb-3 whitespace-pre-wrap">{result.rhetoricalAnalysis.alMaani}</p>
            <h3 className="font-bold text-lg text-red-800">ب. قسم البيان:</h3>
            <p className="mb-3 whitespace-pre-wrap">{result.rhetoricalAnalysis.alBayan}</p>
            <h3 className="font-bold text-lg text-red-800">ج. قسم البديع:</h3>
            <p className="whitespace-pre-wrap">{result.rhetoricalAnalysis.alBadi}</p>
          </AnalysisSectionCard>
          
          <AnalysisSectionCard title="خامساً: التحليل النقدي" color="indigo">
             <p className="whitespace-pre-wrap"><strong className="text-indigo-800">الفكرة:</strong> {result.criticalAnalysis.idea}</p>
             <p className="whitespace-pre-wrap"><strong className="text-indigo-800">الأغراض والموضوعات:</strong> {result.criticalAnalysis.purposes}</p>
             <p className="whitespace-pre-wrap"><strong className="text-indigo-800">العاطفة:</strong> {result.criticalAnalysis.emotion}</p>
             <p className="whitespace-pre-wrap"><strong className="text-indigo-800">الألفاظ:</strong> {result.criticalAnalysis.vocabulary}</p>
             <p className="whitespace-pre-wrap"><strong className="text-indigo-800">التراكيب (الأساليب):</strong> {result.criticalAnalysis.structures}</p>
             <p className="whitespace-pre-wrap"><strong className="text-indigo-800">الصور:</strong> {result.criticalAnalysis.imagery}</p>
             <p className="whitespace-pre-wrap"><strong className="text-indigo-800">الموسيقى الداخلية:</strong> {result.criticalAnalysis.internalMusic}</p>
             <p className="whitespace-pre-wrap"><strong className="text-indigo-800">الموسيقى الخارجية:</strong> {result.criticalAnalysis.externalMusic}</p>
             <p className="whitespace-pre-wrap"><strong className="text-indigo-800">سمات المدرسة الأدبية:</strong> {result.criticalAnalysis.schoolCharacteristics}</p>
          </AnalysisSectionCard>

          <AnalysisSectionCard title="سادساً: ملحوظات نقدية" color="pink">
             <p className="whitespace-pre-wrap">{result.criticalNotes.ideaNote}</p>
             <p className="whitespace-pre-wrap">{result.criticalNotes.purposeNote}</p>
             <p className="whitespace-pre-wrap">{result.criticalNotes.emotionNote}</p>
             <p className="whitespace-pre-wrap">{result.criticalNotes.vocabularyNote}</p>
             <p className="whitespace-pre-wrap">{result.criticalNotes.sentencesNote}</p>
             <p className="whitespace-pre-wrap">{result.criticalNotes.imageryNote}</p>
             <p className="whitespace-pre-wrap">{result.criticalNotes.experienceNote}</p>
             <p className="whitespace-pre-wrap">{result.criticalNotes.internalMusicNote}</p>
             <p className="whitespace-pre-wrap">{result.criticalNotes.externalMusicNote}</p>
          </AnalysisSectionCard>

        </div>
      )}
    </div>
  );
};

export default AnalysisPage;