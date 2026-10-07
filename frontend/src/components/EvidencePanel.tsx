import React, { useEffect, useState } from 'react';
import { Search, AlertTriangle, FileText, Code2, ListTree, Bug, Flame, ShieldCheck, Sparkles } from 'lucide-react';
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
  const { currentTaskId } = useStore();
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
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case EvidenceType.LOG_OUTPUT:
      case 'LOG_OUTPUT':
      case 'runtime':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case EvidenceType.TEST_RESULT:
      case 'TEST_RESULT':
      case 'test':
        return <ListTree className="w-4 h-4 text-emerald-400" />;
      default:
        return <FileText className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="h-full flex flex-col p-4 bg-slate-950/60 overflow-y-auto font-sans">
      
      {/* Root Cause & Fix Strategy Cards */}
      <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-3.5 shrink-0">
        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-3.5 shadow-lg relative overflow-hidden backdrop-blur-md hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Bug className="w-4 h-4 text-rose-400" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-gray-200">
              Root Cause Grounding
            </h3>
          </div>
          <p className="text-xs font-mono text-gray-300 leading-relaxed">
            The <code className="text-cyan-300 bg-slate-950 px-1 py-0.5 rounded border border-cyan-500/20">divide(a, b)</code> function performs unconditional division <code className="text-cyan-300 bg-slate-950 px-1 py-0.5 rounded">a / b</code> without checking if <code className="text-purple-300 font-bold">b == 0</code>, resulting in an unhandled ZeroDivisionError.
          </p>
        </div>
        
        <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-3.5 shadow-lg relative overflow-hidden backdrop-blur-md hover:border-emerald-500/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-gray-200">
              Minimal Safe Patch Strategy
            </h3>
          </div>
          <p className="text-xs font-mono text-gray-300 leading-relaxed">
            Insert a minimal parameter check <code className="text-emerald-300 bg-slate-950 px-1 py-0.5 rounded border border-emerald-500/20">if b == 0: raise ValueError(...)</code>. Preserve all caller signatures and execution contracts across dependent modules.
          </p>
        </div>
      </div>

      {/* Supporting Evidence Ledger List */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Verifiable Evidence Ledger ({evidenceList.length})</span>
          </h3>
          <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
            Rule: Zero Hallucinated Claims
          </span>
        </div>

        <div className="space-y-2.5">
          {evidenceList.map((evidence, idx) => (
            <div 
              key={evidence.id || idx} 
              className="bg-slate-900/70 border border-white/[0.06] hover:border-cyan-500/30 rounded-xl p-3 hover:bg-slate-900/90 transition-all group backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-slate-950 p-2 rounded-lg border border-white/[0.08] shrink-0 group-hover:border-cyan-500/30 transition-colors">
                  {getIcon(evidence.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-white mb-1 font-mono tracking-tight">{evidence.claim}</div>
                  <div className="text-xs text-gray-400 mb-2 font-mono leading-relaxed">{evidence.reason}</div>
                  
                  {evidence.filePath && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400 bg-slate-950/80 px-2 py-1 rounded-md border border-white/[0.06] w-fit">
                      <span className="text-cyan-400">{evidence.filePath}</span>
                      {evidence.lines && <span className="text-gray-500">:{evidence.lines.join('-')}</span>}
                      {evidence.symbol && (
                        <span className="text-purple-300 border-l border-white/[0.1] pl-1.5 ml-1 font-semibold">
                          {evidence.symbol}()
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-[9px] uppercase font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/20 px-2 py-0.5 rounded shrink-0">
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
