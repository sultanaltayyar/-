
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { DASHBOARD_STATS, PAYMENT_RECORDS } from '../constants';

interface AiAssistantProps {
  onClose: () => void;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = { role: 'user' as const, text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = `
        You are a World-Class Financial Analyst Expert for a debt repayment app.
        Current Debt Stats: ${JSON.stringify(DASHBOARD_STATS)}
        Payment History: ${JSON.stringify(PAYMENT_RECORDS)}
        The user language is Arabic. Always reply in professional, high-standard Arabic.
        Structure your responses:
        1. **الملخص التنفيذي**: A 2-sentence professional summary.
        2. **التحليل المالي التفصيلي**: Use Markdown tables for monthly/yearly breakdowns and bold numbers.
        3. **رؤى وتوصيات ذكية**: Actionable insights to speed up repayment or clarify balances.
        Be extremely professional, precise with calculations, and encouraging.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...messages, userMsg].map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        config: {
          systemInstruction: context,
          thinkingConfig: { thinkingBudget: 32768 }
        },
      });

      const aiText = response.text || "عذراً، لم أتمكن من معالجة الطلب حالياً. يرجى إعادة المحاولة.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. يرجى التحقق من اتصالك بالإنترنت." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 bg-slate-900/70 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-4xl h-[95vh] md:h-[85vh] rounded-t-[3rem] md:rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-slide-up">
        {/* Premium AI Header */}
        <div className="p-8 md:p-10 bg-gradient-to-r from-indigo-700 to-indigo-600 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/10 rounded-2xl backdrop-blur-2xl flex items-center justify-center shadow-inner group border border-white/20">
              <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="font-black text-2xl tracking-tight">المحلل المالي الذكي</h2>
              <div className="flex items-center gap-2 text-xs text-indigo-100/60 font-black uppercase tracking-[0.2em]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
                ACTIVE ANALYTICS: GEMINI 3 PRO
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-90 border border-white/10">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* AI Conversation Space */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 bg-slate-50/50 scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-8 animate-fade-in-up">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[60px] opacity-10 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-white border border-slate-100 text-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">نظام التحليل المتطور</h3>
                <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed font-medium">مرحباً بك. أنا هنا لمعالجة بياناتك المالية، تقديم رؤى عميقة، وتوقع جدول السداد المستقبلي بدقة تامة.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                {["تحليل الوضع المالي الشامل", "متى سأصل لنقطة الصفر؟", "أبرز الدفعات في 2024"].map(s => (
                  <button 
                    key={s} 
                    onClick={() => handleSend(s)}
                    className="px-8 py-4 bg-white border border-slate-100 rounded-2xl text-[11px] font-black text-slate-600 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end animate-fade-in-up'}`}>
              <div className={`max-w-[92%] md:max-w-[85%] p-8 rounded-[2.5rem] shadow-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none font-bold text-lg' 
                  : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none prose prose-indigo prose-sm shadow-xl'
              }`}>
                {m.role === 'model' ? (
                  <div className="whitespace-pre-wrap font-medium">
                    {m.text.split('\n').map((line, idx) => {
                      if (line.startsWith('#')) {
                        return <div key={idx} className="font-black text-xl mb-4 mt-6 text-indigo-900 border-r-4 border-indigo-600 pr-4">{line.replace(/^#+\s*/, '')}</div>;
                      }
                      if (line.includes('|')) {
                        return <div key={idx} className="font-mono bg-slate-50 p-2 my-1 rounded text-[12px]">{line}</div>;
                      }
                      return <div key={idx} className="mb-2">{line}</div>;
                    })}
                  </div>
                ) : m.text}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-end">
              <div className="bg-white border border-indigo-50 p-8 rounded-[2.5rem] rounded-tl-none shadow-2xl flex items-center gap-6 animate-pulse">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.25em]">الذكاء الاصطناعي يقوم بالتحليل</span>
                  <span className="text-[10px] text-slate-400 font-bold italic">نبحث في السجلات التاريخية والتوقعات...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action-Packed Input */}
        <div className="p-8 md:p-12 bg-white border-t border-slate-100 shrink-0">
          <div className="relative group max-w-3xl mx-auto">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اطرح سؤالك هنا (مثلاً: ما هو الرصيد المتوقع نهاية 2025؟)..."
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] py-6 px-10 pr-20 text-base font-bold focus:ring-8 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none placeholder:text-slate-300"
            />
            <button 
              onClick={() => handleSend()}
              disabled={loading}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-indigo-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 active:scale-90 disabled:opacity-50 disabled:scale-100 group"
            >
              <svg className="w-7 h-7 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
