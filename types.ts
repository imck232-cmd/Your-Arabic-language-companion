export type Page = 'home' | 'search' | 'analysis';

export interface AnalysisSection {
  title: string;
  content: string;
}

export interface AnalysisResult {
  formattedText: string;
  linguisticAnalysis: {
    strangeWords: string;
    forms: string;
    synonymsAntonyms: string;
  };
  morphologicalAnalysis: {
    derivatives: string;
    sources: string;
    wordWeights: string;
  };
  orthographicAnalysis: {
    hamzas: string;
    alifLayinah: string;
    taMarbutaMaftuha: string;
    additionOmission: string;
  };
  rhetoricalAnalysis: {
    alMaani: string;
    alBayan: string;
    alBadi: string;
  };
  criticalAnalysis: {
    idea: string;
    purposes: string;
    emotion: string;
    vocabulary: string;
    structures: string;
    imagery: string;
    internalMusic: string;
    externalMusic: string;
    schoolCharacteristics: string;
  };
  criticalNotes: {
    ideaNote: string;
    purposeNote: string;
    emotionNote: string;
    vocabularyNote: string;
    sentencesNote: string;
    imageryNote: string;
    experienceNote: string;
    internalMusicNote: string;
    externalMusicNote: string;
  };
}

export interface SearchResult {
    summary: string;
    sources: {
        uri: string;
        title: string;
    }[];
}