import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AntigravityCursor from './components/AntigravityCursor';
import AntigravityBackground from './components/AntigravityBackground';
import { Shield, Cpu, Orbit, Activity, ShieldCheck } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans selection:bg-cyan-500/20 selection:text-cyan-900 overflow-x-hidden">
        {/* Antigravity Dynamic Particle Field (Light Mode) */}
        <AntigravityBackground />

        {/* Antigravity Interactive Trail Cursor (Light Mode) */}
        <AntigravityCursor />

        {/* High-Tech Clean Light Mission Control Header */}
        <header className="relative z-20 h-16 border-b border-slate-200/90 bg-white/80 backdrop-blur-2xl flex items-center px-6 shrink-0 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            {/* Orbital Antigravity icon badge */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-50 via-blue-50 to-indigo-50 border border-cyan-400/50 shadow-sm">
              <Shield className="w-5 h-5 text-cyan-600" />
              <Orbit className="absolute w-7 h-7 text-cyan-500/30 animate-spin" style={{ animationDuration: '20s' }} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-[0.2em] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-100/70 text-cyan-700 border border-cyan-300/60 font-semibold">
                  ANTIGRAVITY CORE
                </span>
                <span className="text-xs font-mono text-slate-400">v2.5</span>
              </div>
              <h1 className="text-lg font-black tracking-wider text-slate-900 flex items-center gap-1.5">
                REPOGUARD <span className="text-gradient-antigravity font-extrabold">AI</span>
              </h1>
            </div>
          </div>

          {/* Telemetry Status Indicators */}
          <div className="ml-auto hidden md:flex items-center gap-3 text-xs font-mono">
            {/* Model telemetry */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-700 shadow-xs backdrop-blur-md">
              <Cpu className="w-3.5 h-3.5 text-cyan-600" />
              <span className="text-slate-500">LLM:</span>
              <span className="text-cyan-700 font-semibold">Ollama 0.5B</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold">RTX 3060 CUDA</span>
            </div>

            {/* Regression shield telemetry */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200 text-slate-700 shadow-xs backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-slate-500">Shield:</span>
              <span className="text-emerald-700 font-semibold">Active</span>
            </div>

            {/* Evidence status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-50 to-indigo-50 border border-cyan-300/60 text-cyan-800 shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600"></span>
              </span>
              <span className="tracking-wide font-medium">Zero-Hallucination Guard</span>
            </div>
          </div>
        </header>

        {/* Main Application Dashboard */}
        <main className="relative z-10 flex-1 overflow-hidden p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
