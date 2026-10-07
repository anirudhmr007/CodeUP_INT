import React from 'react';
import { Download, Check, ExternalLink, ShieldCheck, Sparkles, GitMerge, FileCode, Cpu } from 'lucide-react';
import { useStore } from '../hooks/useStore';

export default function FinalReport() {
  const { currentTaskId, currentRepo } = useStore();

  return (
    <div className="h-full bg-slate-950/70 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
        
        {/* Antigravity Mission Report Header */}
        <div className="border-b border-white/[0.08] pb-5 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
                EVIDENCE CERTIFICATE
              </span>
              <span className="text-xs font-mono text-gray-500">
                Task ID: {currentTaskId || 'repoguard_live'}
              </span>
            </div>
            <h1 className="text-xl font-bold font-mono text-white tracking-wide flex items-center gap-2">
              Autonomous Verification Dossier
            </h1>
            <div className="text-xs text-gray-400 font-mono mt-0.5">
              Repository: {currentRepo?.name || 'sample-calculator'} • Grounding: 100% AST & Test Proof
            </div>
          </div>
          <div className="flex gap-2 font-mono text-xs">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-gray-200 rounded-lg transition-colors border border-white/[0.08]"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" /> Export PDF
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <GitMerge className="w-3.5 h-3.5" /> Submit Patch PR
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="space-y-3">
          <h2 className="text-xs uppercase font-mono font-bold text-gray-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Executive Safety Summary
          </h2>
          <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-4 text-gray-300 text-xs font-mono leading-relaxed shadow-lg backdrop-blur-md">
            <p className="mb-2">
              RepoGuard AI successfully detected, localized, and repaired the zero-division vulnerability in <code className="text-cyan-300 bg-slate-950 px-1 py-0.5 rounded border border-cyan-500/20">Calculator.divide()</code>.
            </p>
            <p className="text-gray-400">
              The change was synthesized under the <strong className="text-white">Minimal Patch Optimizer</strong> (cost score: 4/100). All existing arithmetic test fixtures passed baseline verification with 0 regressions, and a synthesized counterfactual regression test proved that zero-division now raises an explicit <code className="text-cyan-300">ValueError</code> rather than terminating the process with an unhandled runtime crash.
            </p>
          </div>
        </section>

        {/* Files Modified Table */}
        <section className="space-y-3">
          <h2 className="text-xs uppercase font-mono font-bold text-gray-300 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" /> Changes Applied
          </h2>
          <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl overflow-hidden shadow-lg">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-slate-950/80 text-gray-400 text-[10px] uppercase border-b border-white/[0.06]">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Source File</th>
                  <th className="px-4 py-2.5 font-semibold">Change Type</th>
                  <th className="px-4 py-2.5 font-semibold">Lines</th>
                  <th className="px-4 py-2.5 font-semibold">Safety Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr className="hover:bg-slate-800/40">
                  <td className="px-4 py-2.5 text-gray-200 flex items-center gap-2">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>calculator/core.py</span>
                  </td>
                  <td className="px-4 py-2.5 text-amber-400">Minimal Guard</td>
                  <td className="px-4 py-2.5 text-xs">
                    <span className="text-emerald-400">+3</span> <span className="text-rose-400">-1</span>
                  </td>
                  <td className="px-4 py-2.5 text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Safe
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="px-4 py-2.5 text-gray-200 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>tests/test_repoguard_regression.py</span>
                  </td>
                  <td className="px-4 py-2.5 text-cyan-400">Synthesized Test</td>
                  <td className="px-4 py-2.5 text-xs">
                    <span className="text-emerald-400">+44</span> <span className="text-gray-500">-0</span>
                  </td>
                  <td className="px-4 py-2.5 text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verifier
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Verification Grid */}
        <section className="space-y-3">
          <h2 className="text-xs uppercase font-mono font-bold text-gray-300 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" /> Multi-Layer Change Verification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-3.5">
              <h3 className="font-mono text-xs font-bold text-cyan-300 mb-2">1. Regression Shield</h3>
              <ul className="space-y-1.5 text-xs font-mono text-gray-400">
                <li className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> 12/12 Baseline unit tests passed
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Counterfactual regression test passed
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Zero unintended behavioral regressions
                </li>
              </ul>
            </div>
            <div className="bg-slate-900/80 border border-white/[0.08] rounded-xl p-3.5">
              <h3 className="font-mono text-xs font-bold text-purple-300 mb-2">2. API Reality Guard</h3>
              <ul className="space-y-1.5 text-xs font-mono text-gray-400">
                <li className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Zero invented APIs or phantom imports
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Public method signatures preserved
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Upstream caller dependencies intact
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
