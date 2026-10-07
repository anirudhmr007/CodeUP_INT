import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function ConfidenceScore({ score = 94 }: { score?: number }) {
  const getScoreColor = () => {
    if (score >= 90) return 'text-cyan-700';
    if (score >= 75) return 'text-sky-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getStrokeGradient = () => {
    if (score >= 90) return 'url(#cyan-glow-light)';
    if (score >= 75) return '#0284c7';
    if (score >= 50) return '#d97706';
    return '#e11d48';
  };

  const getLabel = () => {
    if (score >= 90) return 'HIGH CONFIDENCE';
    if (score >= 75) return 'MODERATE CONFIDENCE';
    if (score >= 50) return 'LOW CONFIDENCE';
    return 'REJECTED';
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-sm">
      <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="cyan-glow-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          {/* Base track */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="5"
            fill="transparent"
          />
          {/* Active progress */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={getStrokeGradient()}
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className={`text-lg font-black font-mono ${getScoreColor()} z-10`}>
          {score}
        </div>
      </div>
      
      <div className="flex flex-col pr-1 font-mono">
        <div className="flex items-center gap-1">
          <span className={`text-[10px] font-black uppercase tracking-wider ${getScoreColor()}`}>
            {getLabel()}
          </span>
          <Sparkles className="w-3 h-3 text-cyan-600 animate-pulse" />
        </div>
        <div className="text-[9px] text-slate-500 grid grid-cols-2 gap-x-2.5 gap-y-0.5 mt-0.5">
          <div className="flex justify-between gap-1">
            <span className="text-slate-400">Tests:</span> <span className="text-cyan-700 font-bold">+20</span>
          </div>
          <div className="flex justify-between gap-1">
            <span className="text-slate-400">AST:</span> <span className="text-emerald-700 font-bold">+20</span>
          </div>
          <div className="flex justify-between gap-1">
            <span className="text-slate-400">Impact:</span> <span className="text-purple-700 font-bold">+15</span>
          </div>
          <div className="flex justify-between gap-1">
            <span className="text-slate-400">Safety:</span> <span className="text-sky-700 font-bold">+10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
