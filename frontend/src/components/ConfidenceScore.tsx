import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function ConfidenceScore({ score = 94 }: { score?: number }) {
  const getScoreColor = () => {
    if (score >= 90) return 'text-cyan-400';
    if (score >= 75) return 'text-sky-300';
    if (score >= 50) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getStrokeGradient = () => {
    if (score >= 90) return 'url(#cyan-glow)';
    if (score >= 75) return '#38bdf8';
    if (score >= 50) return '#fbbf24';
    return '#f43f5e';
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
    <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
      <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          {/* Base track */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="stroke-slate-800"
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
        <div className={`text-lg font-black font-mono ${getScoreColor()} z-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]`}>
          {score}
        </div>
      </div>
      
      <div className="flex flex-col pr-1 font-mono">
        <div className="flex items-center gap-1">
          <span className={`text-[10px] font-black uppercase tracking-wider ${getScoreColor()}`}>
            {getLabel()}
          </span>
          <Sparkles className="w-3 h-3 text-cyan-300 animate-pulse" />
        </div>
        <div className="text-[9px] text-gray-400 grid grid-cols-2 gap-x-2.5 gap-y-0.5 mt-0.5">
          <div className="flex justify-between gap-1">
            <span className="text-gray-500">Tests:</span> <span className="text-cyan-300 font-semibold">+20</span>
          </div>
          <div className="flex justify-between gap-1">
            <span className="text-gray-500">AST:</span> <span className="text-emerald-300 font-semibold">+20</span>
          </div>
          <div className="flex justify-between gap-1">
            <span className="text-gray-500">Impact:</span> <span className="text-purple-300 font-semibold">+15</span>
          </div>
          <div className="flex justify-between gap-1">
            <span className="text-gray-500">Safety:</span> <span className="text-sky-300 font-semibold">+10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
