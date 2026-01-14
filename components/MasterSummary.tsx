
import React from 'react';
import { PAYMENT_RECORDS } from '../constants';
import { PaymentStatus } from '../types';

const MasterSummary: React.FC = () => {
  // Flatten all months from all years
  const allMonths = PAYMENT_RECORDS.flatMap(record => 
    record.months.map(m => ({
      year: record.year,
      ...m
    }))
  );

  return (
    <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.08)] overflow-hidden mb-16 animate-in slide-in-from-bottom-8 duration-700 print:shadow-none print:border print:rounded-3xl">
      <div className="p-10 md:p-14 bg-slate-50/50 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-8 print:p-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-2 shadow-lg shadow-indigo-100 no-print">
            العرض الموحد
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">ملخص السداد التراكمي</h2>
          <p className="text-slate-500 text-lg font-medium">نظرة بانورامية لجميع الأقساط الشهرية عبر السنوات</p>
        </div>
        <div className="flex flex-wrap gap-4 no-print">
          <div className="px-8 py-5 bg-white rounded-3xl border border-slate-200 shadow-sm transition-all hover:border-emerald-200 hover:shadow-emerald-50">
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">دورة السداد</span>
            <span className="text-3xl font-black text-emerald-600 tracking-tighter">{allMonths.length} شهر</span>
          </div>
          <div className="px-8 py-5 bg-white rounded-3xl border border-slate-200 shadow-sm transition-all hover:border-indigo-200 hover:shadow-indigo-50">
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">المستهدف النهائي</span>
            <span className="text-3xl font-black text-indigo-600 tracking-tighter">٠ ريال</span>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-50/30 text-slate-400 text-[11px] font-black uppercase tracking-[0.25em] border-b border-slate-100">
              <th className="p-8">المعرف / الفترة</th>
              <th className="p-8">قيمة القسط</th>
              <th className="p-8">الرصيد التنازلي</th>
              <th className="p-8">حالة المعالجة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {allMonths.map((m, idx) => (
              <tr 
                key={idx} 
                className={`transition-all group duration-300 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                } hover:bg-indigo-50/40`}
              >
                <td className="p-8">
                  <div className="flex items-center gap-5">
                    <span className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xs font-black transition-all shadow-sm ${
                      idx % 2 === 0 ? 'bg-slate-50 border-slate-100 text-slate-400' : 'bg-white border-slate-100 text-slate-400'
                    } group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900`}>
                      {m.year}
                    </span>
                    <span className="font-black text-lg text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{m.monthName}</span>
                  </div>
                </td>
                <td className="p-8">
                  <span className="text-xl font-black text-slate-900 tracking-tighter">
                    {typeof m.amount === 'number' ? m.amount.toLocaleString() : m.amount}
                  </span>
                </td>
                <td className="p-8">
                  <span className="font-mono text-xl font-black text-indigo-600 bg-indigo-50/50 px-5 py-2 rounded-2xl group-hover:bg-indigo-100 group-hover:shadow-lg transition-all">
                    {m.remainingBalance.toLocaleString()}
                  </span>
                </td>
                <td className="p-8">
                  <span className={`text-[10px] px-4 py-2 rounded-full font-black uppercase tracking-widest shadow-sm ${
                    m.status === PaymentStatus.PAID ? 'bg-emerald-500 text-white' :
                    m.status === PaymentStatus.SCHEDULED ? 'bg-slate-200 text-slate-500' :
                    m.status === PaymentStatus.GAP ? 'bg-rose-500 text-white' :
                    m.status === PaymentStatus.DEFICIT ? 'bg-amber-500 text-white' :
                    'bg-indigo-600 text-white shadow-indigo-100'
                  }`}>
                    {m.status === PaymentStatus.PAID ? 'مكتمل' : 
                     m.status === PaymentStatus.SCHEDULED ? 'مجدول' : 
                     m.status === PaymentStatus.GAP ? 'متعثر' : 
                     m.status === PaymentStatus.DEFICIT ? 'نقص' : 'إغلاق'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterSummary;
