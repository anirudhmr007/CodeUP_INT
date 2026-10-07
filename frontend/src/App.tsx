import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AntigravityCursor from './components/AntigravityCursor';
import AntigravityBackground from './components/AntigravityBackground';
import { Shield, Cpu, Sparkles, Orbit, Activity } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col bg-[#030712] text-gray-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
        {/* Antigravity Dynamic Particle Field */}
        <AntigravityBackground />

        {/* Antigravity Interactive Trail Cursor */}
        <AntigravityCursor />

        {/* High-Tech Antigravity Mission Control Header */}
        <header className="relative z-20 h-16 border-b border-white/[0.08] bg-slate-950/70 backdrop-blur-2xl flex items-center px-6 shrink-0 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            {/* Pulsing orbital Antigravity icon */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 glow-cyan">
              <Shield className="w-5 h-5 text-cyan-400" />
              <Orbit className="absolute w-7 h-7 text-cyan-300/40 animate-spin" style={{ animationDuration: '18s' }} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-[0.25em] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  ANTIGRAVITY CORE
                </span>
                <span className="text-xs font-mono text-gray-500">v2.5</span>
              </div>
              <h1 className="text-lg font-black tracking-wider text-white flex items-center gap-1.5">
                REPOGUARD <span className="text-gradient-antigravity font-extrabold">AI</span>
              </h1>
            </div>
          </div>

          {/* Telemetry Status Indicators (Google DeepMind Antigravity Style) */}
          <div className="ml-auto hidden md:flex items-center gap-3 text-xs font-mono">
            {/* Model telemetry */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/[0.06] text-gray-300 backdrop-blur-md">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>LLM:</span>
              <span className="text-cyan-400 font-semibold">Ollama 0.5B</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">RTX 3060 CUDA</span>
            </div>

            {/* Regression shield telemetry */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/[0.06] text-gray-300 backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Shield:</span>
              <span className="text-emerald-400 font-semibold">Active</span>
            </div>

            {/* Evidence status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-950/40 to-purple-950/40 border border-cyan-500/20 text-cyan-200 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="tracking-wide">Zero-Hallucination Guard</span>
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
