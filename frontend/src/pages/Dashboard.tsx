import React from 'react';
import RepositoryPanel from '../components/RepositoryPanel';
import TaskInput from '../components/TaskInput';
import ExecutionTimeline from '../components/ExecutionTimeline';
import EvidencePanel from '../components/EvidencePanel';
import TestConsole from '../components/TestConsole';
import ImpactGraph from '../components/ImpactGraph';
import DiffViewer from '../components/DiffViewer';
import ConfidenceScore from '../components/ConfidenceScore';
import FinalReport from '../components/FinalReport';
import { useStore } from '../hooks/useStore';
import { Layout, GitMerge, FileCode, CheckCircle2, Lock, Sparkles, Orbit } from 'lucide-react';

export default function Dashboard() {
  const { currentTaskId, currentRepo, hasReport, activeTab, setActiveTab } = useStore();

  return (
    <div className="h-full flex flex-col gap-3.5">
      {/* Top Half */}
      <div className="flex-1 flex gap-3.5 min-h-0">
        
        {/* Left Column: Repository Digital Twin & Task Input */}
        <div className="w-[28%] flex flex-col gap-3.5">
          <div className="flex-1 overflow-hidden">
            <RepositoryPanel />
          </div>
          <div className="h-64 shrink-0">
            <TaskInput />
          </div>
        </div>
        
        {/* Center Column: Execution Timeline (11 Verification Steps) */}
        <div className="w-[26%]">
          <ExecutionTimeline />
        </div>
        
        {/* Right Column: Analysis Tabs (Evidence, Impact, Diff, Final Report) */}
        <div className="flex-1 flex flex-col min-w-0 panel">
          <div className="panel-header !p-0 bg-slate-50/90 border-b border-slate-200">
            <div className="flex flex-1">
              <button 
                onClick={() => setActiveTab('evidence')}
                className={`px-4 py-3 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'evidence' 
                    ? 'border-cyan-600 text-cyan-800 bg-cyan-50/70 font-semibold' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
                }`}
              >
                <Layout className="w-3.5 h-3.5 text-cyan-600" />
                <span>Evidence Ledger</span>
              </button>

              <button 
                onClick={() => setActiveTab('impact')}
                className={`px-4 py-3 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'impact' 
                    ? 'border-cyan-600 text-cyan-800 bg-cyan-50/70 font-semibold' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
                }`}
              >
                <GitMerge className="w-3.5 h-3.5 text-amber-500" />
                <span>Impact Radius</span>
              </button>

              <button 
                onClick={() => setActiveTab('diff')}
                className={`px-4 py-3 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'diff' 
                    ? 'border-cyan-600 text-cyan-800 bg-cyan-50/70 font-semibold' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-purple-600" />
                <span>Code Diff</span>
              </button>

              <button 
                onClick={() => setActiveTab('report')}
                className={`px-4 py-3 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 relative ${
                  activeTab === 'report' 
                    ? 'border-cyan-600 text-cyan-800 bg-cyan-50/70 font-semibold' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Final Report</span>
                
                {/* Status indicator on report tab */}
                {!currentRepo ? (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-400 border border-slate-200 flex items-center gap-0.5">
                    <Lock className="w-2.5 h-2.5" /> Locked
                  </span>
                ) : (hasReport || currentTaskId) ? (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">
                    Ready
                  </span>
                ) : (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    Pending
                  </span>
                )}
              </button>
            </div>
            
            {/* Confidence Score Gauge in header: Only displayed after analysis/task execution */}
            <div className="mr-3 shrink-0 py-1 flex items-center">
              {(hasReport || currentTaskId) ? (
                <ConfidenceScore score={94} />
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100/80 border border-slate-200 text-slate-500 text-[11px] font-mono">
                  <Orbit className="w-3 h-3 text-slate-400" />
                  <span>Awaiting Analysis</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="panel-content !p-0 relative flex-1 overflow-hidden bg-white">
            {activeTab === 'evidence' && <EvidencePanel />}
            {activeTab === 'impact' && <ImpactGraph />}
            {activeTab === 'diff' && <DiffViewer />}
            {activeTab === 'report' && <FinalReport />}
          </div>
        </div>
      </div>
      
      {/* Bottom Half: Quantum Regression Shield Test Console */}
      <div className="h-64 shrink-0">
        <TestConsole />
      </div>
    </div>
  );
}
