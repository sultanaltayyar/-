
import React from 'react';

interface SummaryCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  variant?: 'default' | 'success' | 'warning' | 'primary';
  icon?: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, subValue, variant = 'default', icon }) => {
  const themes = {
    default: {
      card: 'bg-white border-slate-100 text-slate-800',
      label: 'text-slate-400',
      icon: 'bg-slate-50 text-slate-400',
      gradient: 'from-slate-50/80 via-white to-slate-50/50'
    },
    success: {
      card: 'text-emerald-950 border-emerald-100 shadow-emerald-100/20',
      label: 'text-emerald-600/80',
      icon: 'bg-emerald-50 text-emerald-600',
      gradient: 'from-emerald-400/15 via-emerald-50/40 to-emerald-100/20'
    },
    warning: {
      card: 'text-amber-950 border-amber-100 shadow-amber-100/20',
      label: 'text-amber-600/80',
      icon: 'bg-amber-50 text-amber-600',
      gradient: 'from-amber-400/15 via-amber-50/40 to-amber-100/20'
    },
    primary: {
      card: 'text-white border-indigo-500 shadow-indigo-300/40',
      label: 'text-indigo-100/90',
      icon: 'bg-white/20 text-white',
      gradient: 'from-indigo-600 via-indigo-500 to-indigo-700'
    }
  };

  const currentTheme = themes[variant];

  return (
    <div className={`relative group overflow-hidden p-8 rounded-[2.75rem] border transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-3 ${currentTheme.card} ${variant === 'primary' ? 'bg-indigo-600' : 'bg-white'}`}>
      {/* Refined Glass Reflection Effect */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10"></div>
      
      {/* Dynamic Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-100 z-0 transition-opacity duration-700 group-hover:opacity-90`}></div>
      
      {/* Advanced Glow Effect */}
      <div className={`absolute -right-4 -top-4 w-48 h-48 rounded-full blur-[100px] transition-all duration-1000 group-hover:scale-125 group-hover:opacity-50 opacity-30 z-0 ${variant === 'primary' ? 'bg-indigo-300' : 'bg-indigo-400'}`}></div>

      <div className="relative z-20 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-8">
          <div className={`p-4 rounded-[1.25rem] backdrop-blur-2xl shadow-sm transform transition-all group-hover:rotate-12 group-hover:scale-110 duration-700 border border-white/30 ${currentTheme.icon}`}>
            {icon}
          </div>
          {variant === 'primary' && (
            <div className="px-4 py-1.5 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
              التدقيق المباشر
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <p className={`text-[12px] font-black uppercase tracking-[0.3em] ${currentTheme.label}`}>
            {label}
          </p>
          <div className="flex items-baseline gap-2.5">
            <span className="text-4xl md:text-5xl font-black tracking-tighter leading-none [font-variant-numeric:tabular-nums] drop-shadow-md">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {subValue && (
              <span className={`text-[11px] font-black uppercase tracking-widest opacity-70 ${variant === 'primary' ? 'text-indigo-50' : 'text-slate-500'}`}>
                {subValue}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
