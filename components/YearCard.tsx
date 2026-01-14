
import React, { useState } from 'react';
import { YearRecord, PaymentStatus } from '../types';

interface YearCardProps {
  record: YearRecord;
  isInitiallyOpen?: boolean;
}

const StatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const configs = {
    [PaymentStatus.PAID]: { text: 'مكتمل', bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    [PaymentStatus.GAP]: { text: 'متعثر', bg: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
    [PaymentStatus.DEFICIT]: { text: 'نقص', bg: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
    [PaymentStatus.SCHEDULED]: { text: 'مجدول', bg: 'bg-slate-100 text-slate-500 border-slate-200' },
    [PaymentStatus.CLOSED]: { text: 'مغلق', bg: 'bg-slate-900 text-white border-slate-800' },
  };

  const config = configs[status];

  return (
    <span className={`text-[10px] px-3.5 py-2 rounded-xl font-black uppercase tracking-widest border transition-all duration-300 ${config.bg}`}>
      {config.text}
    </span>
  );
};

const YearCard: React.FC<YearCardProps> = ({ record, isInitiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const isCurrentYear = record.accentColor === 'indigo';

  return (
    <div className={`group rounded-[3rem] border transition-all duration-700 page-break-avoid mb-10 overflow-hidden bg-white ${
      isCurrentYear 
        ? 'border-indigo-200 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.18)] ring-1 ring-indigo-50' 
        : 'border-slate-100 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.06)] hover:border-slate-200'
    }`}>
      <div 
        className="p-8 md:p-11 flex justify-between items-center cursor-pointer hover:bg-slate-50/50 transition-all duration-500 no-print"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-8">
          <div className={`relative ${
            isCurrentYear ? 'bg-indigo-600 shadow-indigo-200/50' : 'bg-slate-900 shadow-slate-200/50'
          } w-16 h-16 md:w-20 md:h-20 rounded-[1.75rem] flex flex-col items-center justify-center text-white shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:-rotate-2`}>
            <div className="absolute inset-0 bg-white/5 opacity-20 rounded-[1.75rem] shadow-inner"></div>
            <span className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-0.5">سنة</span>
            <span className="text-2xl font-black leading-none tracking-tighter">{record.year}</span>
          </div>
          <div className="space-y-1.5">
            <h3 className={`font-black text-2xl md:text-3xl tracking-tight transition-colors duration-300 ${isCurrentYear ? 'text-indigo-950' : 'text-slate-900'}`}>
              {record.title}
            </h3>
            <div className="flex items-center gap-3">
              <p className="text-sm font-bold text-slate-400">{record.subtitle}</p>
              {isCurrentYear && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-widest ring-1 ring-indigo-100">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></span>
                  الفترة النشطة
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 ${isOpen ? 'bg-indigo-600 text-white rotate-180 shadow-2xl shadow-indigo-200' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600'}`}>
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Header for print only */}
      <div className="hidden print:block p-12 border-b-2 border-slate-100 bg-slate-50/30">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">{record.year} — {record.title}</h3>
            <p className="text-slate-500 font-bold text-xl">{record.subtitle}</p>
          </div>
          <div className="text-right">
             <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">وثيقة مالية معتمدة</div>
             <div className="text-2xl font-black text-indigo-600 font-mono tracking-widest">#{record.year}-FIN-TX</div>
          </div>
        </div>
      </div>

      <div className={`year-details-container transition-all duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${isOpen ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden print:max-h-none print:opacity-100 print:block`}>
        <div className="p-4 md:p-12 pt-0 print:p-0">
          <div className="rounded-[2.5rem] border border-slate-100/80 overflow-hidden bg-slate-50/40 backdrop-blur-sm print:border-none print:rounded-none print:bg-white shadow-inner">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-white/80 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-[0.35em] print:bg-slate-50">
                  <th className="p-8">الشهر / الفترة</th>
                  <th className="p-8">المبلغ المدفوع</th>
                  <th className="p-8">الرصيد المتبقي</th>
                  <th className="p-8">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50">
                {record.months.map((m, i) => (
                  <tr key={i} className={`transition-all duration-300 group/row hover:bg-white ${m.status === PaymentStatus.CLOSED ? 'bg-indigo-900 text-white' : ''}`}>
                    <td className="p-8">
                      <div className="flex items-center gap-5">
                        <div className={`w-2.5 h-2.5 rounded-full ring-4 ring-offset-4 ring-offset-transparent transition-all duration-500 group-hover/row:scale-125 ${
                          m.status === PaymentStatus.PAID ? 'bg-emerald-400 ring-emerald-400/10' : 
                          m.status === PaymentStatus.GAP ? 'bg-rose-400 ring-rose-400/10' : 
                          m.status === PaymentStatus.DEFICIT ? 'bg-amber-400 ring-amber-400/10' :
                          'bg-slate-300 ring-slate-100'
                        }`}></div>
                        <span className="text-xl font-black tracking-tight">{m.monthName}</span>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tighter [font-variant-numeric:tabular-nums] drop-shadow-sm">
                          {typeof m.amount === 'number' ? m.amount.toLocaleString() : m.amount}
                        </span>
                        {m.details && (
                          <span className={`text-[12px] font-bold mt-1.5 opacity-50 leading-snug italic max-w-[200px]`}>
                            {m.details}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-8">
                      <div className={`inline-flex items-center gap-2 font-mono text-xl font-black ${m.status === PaymentStatus.CLOSED ? 'text-indigo-200' : 'text-indigo-600'}`}>
                        {m.remainingBalance.toLocaleString()}
                        <span className="text-[11px] font-bold opacity-40 uppercase tracking-widest">SAR</span>
                      </div>
                    </td>
                    <td className="p-8">
                      <StatusBadge status={m.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearCard;
