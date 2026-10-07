import React from 'react';
import { Activity, CheckCircle2, Circle, Clock, XCircle, Loader2, Sparkles } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { useEventStream } from '../hooks/useEventStream';

const ALL_STEPS = [
  'Repository scanned',
  'Architecture reconstructed',
  'Issue understood',
  'Relevant symbols identified',
  'Impact radius calculated',
  'Patch strategy selected',
  'Files modified',
  'Regression test generated',
  'Tests executed',
  'Patch validated',
  'Confidence score calculated'
];

export default function ExecutionTimeline() {
  const { currentTaskId } = useStore();
  const { events } = useEventStream(currentTaskId);

  // Group events by step
  const getStepStatus = (stepName: string) => {
    const event = events.find(e => e.stepName?.toLowerCase().includes(stepName.toLowerCase()) || stepName.toLowerCase().includes(e.stepName?.toLowerCase() || ''));
    if (!event) return 'pending';
    return event.status || 'success';
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-rose-500" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />;
      default:
        return <Circle className="w-4 h-4 text-gray-700" />;
    }
  };

  const completedCount = ALL_STEPS.filter(s => getStepStatus(s) === 'success').length;
  const progressPercent = Math.min(100, Math.round((completedCount / ALL_STEPS.length) * 100));

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/30">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="text-xs uppercase tracking-wider font-mono text-gray-200">
            Autonomous Pipeline
          </span>
        </div>
        {currentTaskId ? (
          <div className="text-[10px] font-mono bg-cyan-950/80 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1.5 glow-cyan">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span>{progressPercent}% Complete</span>
          </div>
        ) : (
          <span className="text-[10px] font-mono text-gray-500">Standby</span>
        )}
      </div>

      {/* Progress Line */}
      {currentTaskId && (
        <div className="h-0.5 w-full bg-slate-900 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
      
      <div className="panel-content bg-slate-950/50 flex-1 overflow-y-auto">
        {!currentTaskId ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 p-6 text-center">
            <Clock className="w-8 h-8 mb-2 opacity-20 text-cyan-400" />
            <p className="text-xs font-mono text-gray-400">Awaiting task initiation...</p>
            <p className="text-[10px] font-mono text-gray-600 mt-1">11 safety validation checkpoints</p>
          </div>
        ) : (
          <div className="relative pt-1 pb-4 px-2">
            {/* Ambient neon timeline vertical track */}
            <div className="absolute left-5 top-3 bottom-6 w-[1.5px] bg-gradient-to-b from-cyan-500/50 via-indigo-500/30 to-slate-800 z-0" />
            
            <div className="space-y-4 relative z-10">
              {ALL_STEPS.map((step, index) => {
                const status = getStepStatus(step);
                const event = events.find(e => e.stepName?.toLowerCase().includes(step.toLowerCase()) || step.toLowerCase().includes(e.stepName?.toLowerCase() || ''));
                
                return (
                  <div 
                    key={index} 
                    className={`flex items-start gap-3 transition-all duration-300 ${
                      status === 'pending' ? 'opacity-35' : 'opacity-100'
                    }`}
                  >
                    <div className="mt-0.5 p-0.5 bg-slate-950 rounded-full border border-white/[0.08] shadow-sm">
                      {getStepIcon(status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xs ${
                          status === 'running' 
                            ? 'text-cyan-400 font-semibold flex items-center gap-1.5' 
                            : (status === 'success' ? 'text-gray-200' : 'text-gray-400')
                        }`}>
                          {index + 1}. {step}
                          {status === 'running' && <Sparkles className="w-3 h-3 animate-spin text-cyan-300" />}
                        </span>
                        {status === 'success' && (
                          <span className="text-[9px] font-mono text-emerald-400/80 uppercase">verified</span>
                        )}
                      </div>
                      {event && event.message && (
                        <div className="text-[11px] text-gray-400 mt-1 font-mono bg-slate-900/90 p-2 rounded-md border border-white/[0.06] shadow-sm">
                          {event.message}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
