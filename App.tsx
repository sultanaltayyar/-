
import React, { useState, useCallback, useMemo } from 'react';
import { DASHBOARD_STATS, PAYMENT_RECORDS } from './constants';
import SummaryCard from './components/SummaryCard';
import YearCard from './components/YearCard';
import MasterSummary from './components/MasterSummary';
import AiAssistant from './components/AiAssistant';
import { PaymentStatus } from './types';

const App: React.FC = () => {
  const [showMasterSummary, setShowMasterSummary] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const [showPrintConfirm, setShowPrintConfirm] = useState(false);
  
  // Filtering states
  const availableYears = useMemo(() => PAYMENT_RECORDS.map(r => r.year), []);
  const [startYear, setStartYear] = useState<number>(availableYears[0]);
  const [endYear, setEndYear] = useState<number>(availableYears[availableYears.length - 1]);

  const filteredRecords = useMemo(() => {
    return PAYMENT_RECORDS.filter(r => r.year >= startYear && r.year <= endYear);
  }, [startYear, endYear]);

  // Fix: More robust print execution
  const executePrint = () => {
    setShowPrintConfirm(false);
    // Explicitly focus window before printing to handle some browser quirks
    window.focus();
    // Delay ensures the modal is fully closed and layout is stable
    window.setTimeout(() => {
      window.print();
    }, 400);
  };

  const exportToExcel = () => {
    const statusLabels: Record<PaymentStatus, string> = {
      [PaymentStatus.PAID]: 'سداد كامل',
      [PaymentStatus.GAP]: 'فجوة سداد',
      [PaymentStatus.DEFICIT]: 'نقص سداد',
      [PaymentStatus.SCHEDULED]: 'مجدول',
      [PaymentStatus.CLOSED]: 'مغلق',
    };

    // Organized Header Summary
    let csvRows = [];
    csvRows.push(["تقرير التدقيق المالي الموحد"]);
    csvRows.push(["تاريخ التصدير", new Date().toLocaleDateString('ar-SA')]);
    csvRows.push(["إجمالي المديونية", `${DASHBOARD_STATS.totalDebt} ريال`]);
    csvRows.push(["المسدد الفعلي", `${DASHBOARD_STATS.paidAmount} ريال`]);
    csvRows.push(["المتبقي للتحصيل", `${DASHBOARD_STATS.remainingAmount} ريال`]);
    csvRows.push(["موعد الإغلاق المتوقع", DASHBOARD_STATS.closingDate]);
    csvRows.push([]); // Empty row
    
    // Main Table Headers
    csvRows.push(["السنة", "الشهر", "المبلغ المدفوع", "التفاصيل والبيان", "الرصيد المتبقي", "الحالة"]);
    
    filteredRecords.forEach(record => {
      record.months.forEach(m => {
        csvRows.push([
          record.year,
          m.monthName,
          m.amount,
          (m.details || "").replace(/,/g, ' - '), // Clean details
          m.remainingBalance,
          statusLabels[m.status]
        ]);
      });
    });

    const csvContent = csvRows.map(row => row.join(",")).join("\n");

    // Add BOM for Excel Arabic character support
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `سجل_السداد_المالي_${startYear}_إلى_${endYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pb-32 transition-all duration-700 bg-slate-50/30">
      <div className="h-1.5 bg-gradient-to-l from-indigo-600 to-blue-500 w-full fixed top-0 left-0 z-[100] no-print"></div>

      <div className="max-w-6xl mx-auto px-6 pt-12 md:pt-20">
        
        {/* Advanced Header Section */}
        <header className="relative bg-white p-10 md:p-14 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-white/60 mb-16 flex flex-col xl:flex-row justify-between items-center overflow-hidden print:shadow-none print:border print:p-8">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none opacity-60"></div>
          
          <div className="relative z-10 text-center xl:text-right space-y-6">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-600 text-white text-xs font-black tracking-widest uppercase no-print shadow-xl shadow-indigo-200">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              المنصة المالية المتطورة v3.0
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1]">
              إدارة السداد <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-400">والتدقيق الذكي</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-2xl font-medium max-w-2xl mx-auto xl:mx-0 leading-relaxed">
              حلول رقمية متكاملة لمتابعة الأقساط التاريخية، التنبؤ بالتدفقات النقدية، وتحليل مؤشرات الإغلاق المالي بدقة فائقة.
            </p>
          </div>
          
          <div className="no-print relative z-10 flex flex-col gap-5 mt-14 xl:mt-0 w-full md:w-auto">
            <button 
              onClick={() => setShowAi(true)}
              className="bg-slate-900 text-white hover:bg-black px-12 py-6 rounded-[2rem] flex items-center justify-center gap-4 font-black transition-all shadow-2xl shadow-slate-200 active:scale-95 group"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg">المساعد المالي AI</span>
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={exportToExcel}
                className="bg-white text-slate-800 hover:text-indigo-600 border-2 border-slate-100 px-8 py-5 rounded-2xl flex items-center justify-center gap-2 font-black transition-all hover:border-indigo-200 hover:shadow-xl active:scale-95"
              >
                تصدير إكسيل
              </button>
              <button 
                onClick={() => setShowPrintConfirm(true)}
                className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-8 py-5 rounded-2xl flex items-center justify-center gap-3 font-black transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                PDF / طباعة
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Analytics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 animate-fade-in-up">
          <SummaryCard 
            label="أصل المديونية" 
            value={DASHBOARD_STATS.totalDebt} 
            subValue="SAR"
            icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1" /></svg>}
          />
          <SummaryCard 
            label="إجمالي المسدد" 
            value={DASHBOARD_STATS.paidAmount} 
            variant="success"
            subValue="SAR"
            icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></svg>}
          />
          <SummaryCard 
            label="المتبقي للتحصيل" 
            value={DASHBOARD_STATS.remainingAmount} 
            variant="warning"
            subValue="SAR"
            icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
          />
          <SummaryCard 
            label="موعد الإغلاق" 
            value={DASHBOARD_STATS.closingDate} 
            variant="primary"
            icon={<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10" /></svg>}
          />
        </section>

        {/* Interactive Filtering and Toggle Area */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 no-print bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">من عام</label>
              <select 
                value={startYear} 
                onChange={(e) => setStartYear(Number(e.target.value))}
                className="bg-slate-50 border-none rounded-xl px-6 py-3 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="h-8 w-px bg-slate-200 mt-4"></div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">إلى عام</label>
              <select 
                value={endYear} 
                onChange={(e) => setEndYear(Number(e.target.value))}
                className="bg-slate-50 border-none rounded-xl px-6 py-3 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                {availableYears.filter(y => y >= startYear).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          
          <button 
            onClick={() => setShowMasterSummary(!showMasterSummary)}
            className={`px-12 py-4 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all shadow-xl group flex items-center gap-3 ${
              showMasterSummary ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-slate-900 text-white shadow-slate-200'
            }`}
          >
            <svg className={`w-5 h-5 transition-transform ${showMasterSummary ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            {showMasterSummary ? 'إغلاق الملخص الموحد' : 'عرض الملخص الشهري الموحد'}
          </button>
        </div>

        {/* Main Records Section */}
        <div className="space-y-16">
          {showMasterSummary && <MasterSummary />}
          
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-10">
              <div className="flex items-center gap-6">
                <div className="w-2.5 h-12 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200"></div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter">سجل الأقساط التاريخي</h2>
                  <p className="text-slate-500 text-lg font-medium mt-1">عرض تفصيلي للبيانات من {startYear} حتى {endYear}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <YearCard 
                    key={record.year} 
                    record={record} 
                    isInitiallyOpen={record.year === 2026}
                  />
                ))
              ) : (
                <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold text-xl">لا توجد بيانات متاحة للفترة المحددة</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI Portal */}
        {showAi && <AiAssistant onClose={() => setShowAi(false)} />}

        {/* Print Confirmation Modal */}
        {showPrintConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[3rem] p-10 text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 animate-slide-up">
              <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-indigo-100">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">تأكيد عملية الطباعة</h3>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed text-lg">سيتم إعداد السجل المالي للفترة المحددة ({startYear} - {endYear}) للطباعة. هل ترغب في الاستمرار؟</p>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={executePrint}
                  className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95"
                >
                  نعم، استمر للطباعة
                </button>
                <button 
                  onClick={() => setShowPrintConfirm(false)}
                  className="w-full bg-slate-100 text-slate-600 py-5 rounded-3xl font-bold transition-all hover:bg-slate-200 active:scale-95"
                >
                  إلغاء العملية
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-48 pt-24 border-t border-slate-200/50 text-center space-y-12">
           <div className="space-y-4 max-w-2xl mx-auto">
             <h4 className="text-xl font-black text-slate-900 tracking-tight">التدقيق السنوي النهائي - ٢٠٢٦</h4>
             <p className="text-sm text-slate-400 font-medium leading-relaxed">
               هذا التقرير هو ملكية خاصة ومخصص لأغراض التدقيق المالي الفني فقط. تم تحرير السجل آلياً بتاريخ {new Date().toLocaleDateString('ar-SA')}.
             </p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
