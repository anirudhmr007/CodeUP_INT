import React, { useState } from 'react';
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
import { Layout, GitMerge, FileCode, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'evidence' | 'impact' | 'diff' | 'report'>('evidence');
  const { currentTaskId } = useStore();

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
          <div className="panel-header !p-0 bg-slate-950/80">
            <div className="flex flex-1">
              <button 
                onClick={() => setActiveTab('evidence')}
                className={`px-4 py-3 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'evidence' 
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20' 
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-slate-900/40'
                }`}
              >
                <Layout className="w-3.5 h-3.5 text-cyan-400" />
                <span>Evidence Ledger</span>
              </button>

              <button 
                onClick={() => setActiveTab('impact')}
                className={`px-4 py-3 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'impact' 
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20' 
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-slate-900/40'
                }`}
              >
                <GitMerge className="w-3.5 h-3.5 text-amber-400" />
                <span>Impact Radius</span>
              </button>

              <button 
                onClick={() => setActiveTab('diff')}
                className={`px-4 py-3 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'diff' 
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20' 
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-slate-900/40'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-purple-400" />
                <span>Code Diff</span>
              </button>

              <button 
                onClick={() => setActiveTab('report')}
                className={`px-4 py-3 text-xs font-mono font-medium border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'report' 
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20' 
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-slate-900/40'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Final Report</span>
              </button>
            </div>
            
            {/* Confidence Score Gauge in header */}
            <div className="mr-3 shrink-0 py-1">
              <ConfidenceScore score={94} />
            </div>
          </div>
          
          <div className="panel-content !p-0 relative flex-1 overflow-hidden">
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
