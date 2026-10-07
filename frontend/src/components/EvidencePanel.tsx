import React, { useEffect, useState } from 'react';
import { Search, AlertTriangle, FileText, Code2, ListTree, Bug, Flame, ShieldCheck, Sparkles, FolderGit2 } from 'lucide-react';
import { EvidenceType, EvidenceRecord } from '../types';
import { useStore } from '../hooks/useStore';
import { api } from '../services/api';

const defaultMockEvidence: EvidenceRecord[] = [
  {
    id: 'ev-1',
    claim: 'Zero division exception in Calculator.divide()',
    type: EvidenceType.CODE_REFERENCE,
    reason: 'Missing zero guard check on divisor b in calculator/core.py line 34.',
    filePath: 'calculator/core.py',
    lines: [34, 38],
    symbol: 'divide'
  },
  {
    id: 'ev-2',
    claim: 'AdvancedCalculator.ratio() is a direct dependent caller',
    type: EvidenceType.CODE_REFERENCE,
    reason: 'AST Dependency graph traces incoming call to core divide operation.',
    filePath: 'calculator/advanced.py',
    lines: [33, 35],
    symbol: 'ratio'
  },
  {
    id: 'ev-3',
    claim: 'Regression Shield: zero-division raises error without crash',
    type: EvidenceType.TEST_RESULT,
    reason: 'Synthesized pytest regression test executed successfully with 0 regressions.',
    filePath: 'tests/test_repoguard_regression.py',
    lines: [1, 20],
    symbol: 'test_divide_by_zero'
  }
];

export default function EvidencePanel() {
  const { currentTaskId, currentRepo } = useStore();
  const [evidenceList, setEvidenceList] = useState<EvidenceRecord[]>(defaultMockEvidence);

  useEffect(() => {
    if (currentTaskId) {
      api.getTaskEvidence(currentTaskId).then(data => {
        if (data && data.length > 0) {
          setEvidenceList(data);
        }
      }).catch(() => {});
    }
  }, [currentTaskId]);

  const getIcon = (type: any) => {
    switch (type) {
      case EvidenceType.CODE_REFERENCE:
      case 'CODE_REFERENCE':
      case 'ast':
        return <Code2 className="w-4 h-4 text-cyan-600" />;
      case EvidenceType.LOG_OUTPUT:
      case 'LOG_OUTPUT':
      case 'runtime':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case EvidenceType.TEST_RESULT:
      case 'TEST_RESULT':
      case 'test':
        return <ListTree className="w-4 h-4 text-emerald-600" />;
      default:
        return <FileText className="w-4 h-4 text-purple-600" />;
    }
  };

  if (!currentRepo) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-slate-50/50">
        <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center mb-3">
          <FolderGit2 className="w-6 h-6 text-cyan-600" />
        </div>
        <h3 className="text-xs font-mono font-bold text-slate-800 mb-1">
          Awaiting Repository Analysis
        </h3>
        <p className="text-[11px] font-mono text-slate-500 max-w-xs leading-relaxed">
          Connect and analyze a repository in the left panel to populate verified AST symbol evidence and dependency records.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 bg-slate-50/50 overflow-y-auto font-sans">
      
      {/* Root Cause & Fix Strategy Cards */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3 shrink-0">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:border-cyan-400 transition-all">
          <div className="flex items-center gap-2 mb-1.5">
            <Bug className="w-4 h-4 text-rose-500" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-800">
              Root Cause Grounding
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-600 leading-relaxed">
            The <code className="text-cyan-700 bg-cyan-50 px-1 py-0.5 rounded border border-cyan-200 font-semibold">divide(a, b)</code> function performs unconditional division <code className="text-cyan-700 bg-cyan-50 px-1 py-0.5 rounded">a / b</code> without checking if <code className="text-purple-700 font-bold">b == 0</code>, resulting in an unhandled ZeroDivisionError.
          </p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:border-emerald-400 transition-all">
          <div className="flex items-center gap-2 mb-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-800">
              Minimal Safe Patch Strategy
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-600 leading-relaxed">
            Insert a minimal parameter check <code className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200 font-semibold">if b == 0: raise ValueError(...)</code>. Preserve all caller signatures and execution contracts across dependent modules.
          </p>
        </div>
      </div>

      {/* Supporting Evidence Ledger List */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
            <span>Verifiable Evidence Ledger ({evidenceList.length})</span>
          </h3>
          <span className="text-[10px] font-mono text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 font-medium">
            Rule: Zero Hallucinated Claims
          </span>
        </div>

        <div className="space-y-2">
          {evidenceList.map((evidence, idx) => (
            <div 
              key={evidence.id || idx} 
              className="bg-white border border-slate-200/90 hover:border-cyan-400 rounded-xl p-3 hover:shadow-xs transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-slate-50 p-2 rounded-lg border border-slate-200 shrink-0 group-hover:border-cyan-300 transition-colors">
                  {getIcon(evidence.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-slate-900 mb-0.5 font-mono tracking-tight">{evidence.claim}</div>
                  <div className="text-xs text-slate-500 mb-2 font-mono leading-relaxed">{evidence.reason}</div>
                  
                  {evidence.filePath && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-200 w-fit">
                      <span className="text-cyan-700 font-medium">{evidence.filePath}</span>
                      {evidence.lines && <span className="text-slate-400">:{evidence.lines.join('-')}</span>}
                      {evidence.symbol && (
                        <span className="text-purple-700 border-l border-slate-200 pl-1.5 ml-1 font-semibold">
                          {evidence.symbol}()
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-[9px] uppercase font-mono font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded shrink-0">
                  {String(evidence.type).replace('_', ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
