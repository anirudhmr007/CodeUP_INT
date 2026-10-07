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
  const { currentRepo, setCurrentRepo, setCurrentTaskId, setHasReport, setActiveTab } = useStore();

  const handleRun = async () => {
    if (!currentRepo || !request) return;
    
    setRunning(true);
    try {
      const { taskId } = await api.createTask(currentRepo.id, request);
      setCurrentTaskId(taskId);
      await api.runTask(taskId);
      // Unlock the report now that the autonomous repair has run
      setHasReport(true);
      // Automatically switch to the Final Report once completed
      setTimeout(() => {
        setHasReport(true);
        setActiveTab('report');
      }, 4000);
    } catch (err) {
      console.error(err);
      setHasReport(true);
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
      <div className="panel-header bg-slate-50/90 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-600" />
          <span className="text-xs uppercase tracking-wider font-mono font-bold text-slate-800">
            Autonomous Task Prompt
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200/80 font-semibold">
          <Sparkles className="w-3 h-3 text-cyan-600 animate-pulse" />
          <span>Change Safety Engine</span>
        </div>
      </div>
      
      <div className="p-3 flex flex-col flex-1 justify-between gap-2 bg-white/50">
        {/* Quick Antigravity Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] uppercase font-mono text-slate-400 font-bold shrink-0">Presets:</span>
          {DEMO_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="text-[11px] font-mono whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-100 hover:bg-cyan-50 border border-slate-200/80 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 transition-all flex items-center gap-1 active:scale-95 shadow-2xs font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Prompt Input Box */}
        <textarea 
          className="flex-1 w-full bg-white border border-slate-200 hover:border-cyan-400 rounded-lg p-3 text-xs text-slate-900 font-mono focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15 resize-none placeholder:font-sans transition-all placeholder:text-slate-400 shadow-2xs"
          placeholder="Describe your requested bug fix or feature (e.g. 'Fix division by zero in calculator without breaking existing tests')..."
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          disabled={running}
        />
        
        {/* Action Bar */}
        <div className="flex justify-between items-center pt-1">
          <div className="text-xs font-mono flex items-center gap-1.5">
            {currentRepo ? (
              <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 font-semibold shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Repo Armed</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 font-medium">
                <Orbit className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                <span>Scan Repo First</span>
              </span>
            )}
          </div>
          
          <button 
            onClick={handleRun}
            disabled={!currentRepo || !request || running}
            className={`
              relative group flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all
              ${(!currentRepo || !request || running) 
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-md hover:shadow-cyan-500/30 btn-run-autonomous active:scale-95'}
            `}
          >
            {running ? (
              <>
                <Zap className="w-3.5 h-3.5 animate-pulse text-amber-300" />
                <span>WARPING REPAIR...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>RUN AUTONOMOUS REPAIR</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
