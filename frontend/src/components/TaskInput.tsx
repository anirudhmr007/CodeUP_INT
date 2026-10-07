import React, { useState } from 'react';
import { Terminal, Zap, Play, Sparkles, Orbit, ShieldCheck } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { api } from '../services/api';

const DEMO_PRESETS = [
  {
    label: '⚡ Zero-Division Bug',
    desc: 'Fix division by zero in calculator without breaking existing tests',
    repo: 'demo',
    prompt: 'Fix the division by zero bug in the calculator without breaking existing arithmetic operations. Ensure a meaningful error is returned instead of crashing.'
  },
  {
    label: '🛡️ Auth Validation Guard',
    desc: 'Add strict token argument guard',
    repo: 'demo',
    prompt: 'Add strict validation to input arguments in validator.py to ensure invalid strings or negative inputs are caught early.'
  },
  {
    label: '🔬 Ratio Impact Protection',
    desc: 'Preserve AdvancedCalculator ratio dependencies',
    repo: 'demo',
    prompt: 'Ensure AdvancedCalculator.ratio() gracefully handles zero-denominator calculations without throwing unhandled exceptions.'
  }
];

export default function TaskInput() {
  const [request, setRequest] = useState('');
  const [running, setRunning] = useState(false);
  const { currentRepo, setCurrentRepo, setCurrentTaskId } = useStore();

  const handleRun = async () => {
    if (!currentRepo || !request) return;
    
    setRunning(true);
    try {
      const { taskId } = await api.createTask(currentRepo.id, request);
      setCurrentTaskId(taskId);
      await api.runTask(taskId);
    } catch (err) {
      console.error(err);
    } finally {
      setRunning(false);
    }
  };

  const handleSelectPreset = async (preset: typeof DEMO_PRESETS[0]) => {
    setRequest(preset.prompt);
    if (!currentRepo) {
      try {
        const repo = await api.analyzeRepository(preset.repo);
        setCurrentRepo(repo);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="panel h-full flex flex-col justify-between">
      <div className="panel-header bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs uppercase tracking-wider font-mono text-gray-200">
            Autonomous Task Prompt
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20">
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>Change Safety Engine</span>
        </div>
      </div>
      
      <div className="p-3 flex flex-col flex-1 justify-between gap-2 bg-slate-950/40">
        {/* Quick Antigravity Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] uppercase font-mono text-gray-500 shrink-0">Presets:</span>
          {DEMO_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="text-[11px] font-mono whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-900/80 hover:bg-cyan-950/60 border border-white/[0.08] hover:border-cyan-500/40 text-gray-300 hover:text-cyan-200 transition-all flex items-center gap-1 active:scale-95"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Prompt Input Box */}
        <textarea 
          className="flex-1 w-full bg-slate-950/90 border border-white/[0.08] hover:border-cyan-500/30 rounded-lg p-3 text-sm text-gray-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 resize-none font-mono placeholder:font-sans transition-colors placeholder:text-gray-600"
          placeholder="Describe your requested bug fix or feature (e.g. 'Fix division by zero in calculator without breaking existing tests')..."
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          disabled={running}
        />
        
        {/* Action Bar */}
        <div className="flex justify-between items-center pt-1">
          <div className="text-xs font-mono flex items-center gap-1.5">
            {currentRepo ? (
              <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Repo Armed</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-amber-400/80 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/20">
                <Orbit className="w-3.5 h-3.5 animate-spin" />
                <span>Select or Analyze Repo</span>
              </span>
            )}
          </div>
          
          <button 
            onClick={handleRun}
            disabled={!currentRepo || !request || running}
            className={`
              relative group flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all
              ${(!currentRepo || !request || running) 
                ? 'bg-slate-800/60 text-gray-500 border border-white/[0.04] cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] btn-run-autonomous active:scale-95'}
            `}
          >
            {running ? (
              <>
                <Zap className="w-4 h-4 animate-pulse text-yellow-300" />
                <span>WARPING REPAIR...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>RUN AUTONOMOUS REPAIR</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
