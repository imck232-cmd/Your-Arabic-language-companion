import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, SearchResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        formattedText: { type: Type.STRING, description: "النص الأصلي مع التشكيل الكامل والتنسيق الجميل." },
        linguisticAnalysis: {
            type: Type.OBJECT,
            properties: {
                strangeWords: { type: Type.STRING, description: "بيان معنى الكلمات الغريبة." },
                forms: { type: Type.STRING, description: "استخراج المفرد، المثنى، والجمع من النص." },
                synonymsAntonyms: { type: Type.STRING, description: "استخراج الضد (المقابل) والمرادف للكلمات الرئيسية." },
            }
        },
        morphologicalAnalysis: {
            type: Type.OBJECT,
            properties: {
                derivatives: { type: Type.STRING, description: "تحليل أنواع المشتقات: اسم فاعل، اسم مفعول، اسم تفضيل، وغيرها." },
                sources: { type: Type.STRING, description: "تحليل أنواع المصادر: مصدر صريح، مصدر ميمي، وغيرها." },
                wordWeights: { type: Type.STRING, description: "وزن الكلمات البارزة (أسماء وأفعال)." },
            }
        },
        orthographicAnalysis: {
            type: Type.OBJECT,
            properties: {
                hamzas: { type: Type.STRING, description: "تحليل الهمزات بأنواعها." },
                alifLayinah: { type: Type.STRING, description: "تحليل الألف اللينة." },
                taMarbutaMaftuha: { type: Type.STRING, description: "تحليل التاء المربوطة والمفتوحة." },
                additionOmission: { type: Type.STRING, description: "تحليل ظواهر الحذف والزيادة الإملائية." },
            }
        },
        rhetoricalAnalysis: {
            type: Type.OBJECT,
            properties: {
                alMaani: { type: Type.STRING, description: "تحليل قسم المعاني: الأساليب، الإيجاز، الإطناب، التعريف والتنكير، عطف الجمل." },
                alBayan: { type: Type.STRING, description: "تحليل قسم البيان: الصور الكلية (صوت، لون، حركة) والصور الجزئية (تشبيه، استعارة، كناية، مجاز)." },
                alBadi: { type: Type.STRING, description: "تحليل قسم البديع: المحسنات اللفظية والمعنوية." },
            }
        },
        criticalAnalysis: {
            type: Type.OBJECT,
            properties: {
                idea: { type: Type.STRING, description: "تحليل الفكرة الرئيسية." },
                purposes: { type: Type.STRING, description: "تحليل الأغراض والموضوعات." },
                emotion: { type: Type.STRING, description: "تحليل العاطفة المسيطرة." },
                vocabulary: { type: Type.STRING, description: "تحليل الألفاظ المستخدمة." },
                structures: { type: Type.STRING, description: "تحليل التراكيب والأساليب." },
                imagery: { type: Type.STRING, description: "تحليل الصور والأخيلة." },
                internalMusic: { type: Type.STRING, description: "تحليل الموسيقى الداخلية." },
                externalMusic: { type: Type.STRING, description: "تحليل الموسيقى الخارجية: الوزن، القافية، حرف الروي." },
                schoolCharacteristics: { type: Type.STRING, description: "تحليل سمات وخصائص الأدب الذي ينتمي إليه النص." },
            }
        },
        criticalNotes: {
            type: Type.OBJECT,
            properties: {
                ideaNote: { type: Type.STRING, description: "نقد الفكرة: سطحية أم عميقة." },
                purposeNote: { type: Type.STRING, description: "نقد الغرض: تقليدي أم مبتكر." },
                emotionNote: { type: Type.STRING, description: "نقد العاطفة: قوية أم ضعيفة، ونوعها." },
                vocabularyNote: { type: Type.STRING, description: "نقد الألفاظ: مدى قوتها وملاءمتها." },
                sentencesNote: { type: Type.STRING, description: "نقد الجمل والأسلوب المسيطر." },
                imageryNote: { type: Type.STRING, description: "نقد الصور والأخيلة: تقليدية أم مبتكرة." },
                experienceNote: { type: Type.STRING, description: "نقد التجربة: ذاتية أم عامة، والوحدة العضوية." },
                internalMusicNote: { type: Type.STRING, description: "نقد دور الموسيقى الداخلية." },
                externalMusicNote: { type: Type.STRING, description: "نقد أثر الموسيقى الخارجية." },
            }
        },
    }
};

export async function analyzeText(text: string): Promise<AnalysisResult> {
    const prompt = `
    قم بتحليل النص التالي تحليلاً لغوياً ونقدياً شاملاً، كخبير متخصص في اللغة العربية. 
    قدم إجابتك ككائن JSON صالح ومطابق للمخطط المحدد بدقة. 
    تأكد من أن يكون التحليل عميقاً ومفصلاً في كل قسم.
    النص المراد تحليله:
    ---
    ${text}
    ---
  `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: analysisSchema,
        },
    });
    
    const responseText = response.text.trim();
    try {
        return JSON.parse(responseText) as AnalysisResult;
    } catch (e) {
        console.error("Failed to parse JSON response:", responseText);
        throw new Error("Received an invalid format from the API.");
    }
}

export async function performSearch(query: string, preferredSources: string): Promise<SearchResult> {
    let prompt = `
أنت محلل أدبي محترف يتمتع بخبرة واسعة في تحليل النصوص الأدبية بأنواعها المختلفة (قصائد، قصص، مقالات).
بناءً على النص التالي: "${query}", وبالاعتماد **حصرياً** على نتائج البحث الموثوقة من الإنترنت, قم بإعداد تحليل أدبي شامل ودقيق.

يرجى صياغة التحليل بأسلوب أكاديمي رسمي موجه للباحثين والطلاب المتخصصين في الأدب، مع الحفاظ على دقة التفاصيل وعمق الرؤية الأدبية. قدم إجابتك بتنسيق واضح باستخدام العناوين والنقاط لتسهيل القراءة.

التحليل يجب أن يشمل النقاط التالية:

**1- التعريف بالشاعر أو الكاتب:**
- الاسم الكامل.
- أهم المؤلفات والدور الأدبي في المشهد الثقافي.
- السمات والخصائص المميزة للشاعر أو الكاتب، مثل الأسلوب والموضوعات المتكررة.

**2- التعريف بالنص الأدبي:**
- تحديد زمن وعصر النص بدقة.
- رصد سمات المدرسة الأدبية أو العصر التي ينتمي إليها النص.
- تحليل التجربة العاطفية والغرض من النص.
- مناقشة الأفكار الأساسية، ومظاهر التقليد والتجديد فيه.
- استعراض الصور التعبيرية والألفاظ المتداولة والتراكيب اللغوية المستخدمة.
- تقييم الوحدة العضوية للنص ومدى موضوعيته.
`;
    
    if (preferredSources.trim()) {
        prompt += `\n\nعند البحث، أعطِ أولوية قصوى للمصادر المذكورة هنا: ${preferredSources}. إذا لم تجد معلومات كافية منها، يمكنك استخدام مصادر أخرى موثوقة.`;
    }

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    const summary = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    let sources: { uri: string, title: string }[] = [];
    if (groundingChunks) {
        sources = groundingChunks
            .filter((chunk: any) => chunk.web)
            .map((chunk: any) => ({
                uri: chunk.web.uri || '',
                title: chunk.web.title || '',
            }));
    }

    return { summary, sources };
}