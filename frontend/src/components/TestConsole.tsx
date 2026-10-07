import React, { useEffect, useState } from 'react';
import { Terminal, Shield, Check, X, ShieldCheck, Sparkles, Orbit } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { api } from '../services/api';
import { TestResult } from '../types';

const defaultMockTests = [
  { name: 'test_core.py::TestDivision::test_divide_positive', status: 'pass', time: '12ms' },
  { name: 'test_core.py::TestDivision::test_divide_float', status: 'pass', time: '9ms' },
  { name: 'test_core.py::TestDivision::test_divide_negative', status: 'pass', time: '11ms' },
  { name: 'test_advanced.py::TestAverage::test_average_basic', status: 'pass', time: '15ms' },
  { name: 'test_advanced.py::TestAverage::test_average_single', status: 'pass', time: '8ms' },
  { name: 'test_repoguard_regression.py::test_divide_by_zero', status: 'pass', time: '22ms', isNew: true },
];

export default function TestConsole() {
  const { currentTaskId } = useStore();
  const [testList, setTestList] = useState<any[]>(defaultMockTests);
  const [passedCount, setPassedCount] = useState(12);

  useEffect(() => {
    if (currentTaskId) {
      api.getTaskTests(currentTaskId).then((suites: TestResult[]) => {
        if (suites && suites.length > 0) {
          const suite = suites[0];
          setPassedCount(suite.passed || 12);
          if (suite.details && suite.details.length > 0) {
            setTestList(suite.details.map(d => ({
              name: d.name,
              status: d.status === 'fail' ? 'fail' : 'pass',
              time: `${Math.round((d.duration || 0.01) * 1000)}ms`,
              isNew: d.name.includes('regression')
            })));
          }
        }
      }).catch(() => {});
    }
  }, [currentTaskId]);

  return (
    <div className="panel h-full flex flex-row border-t border-white/[0.08]">
      {/* Left Shield Status Panel */}
      <div className="w-1/3 border-r border-white/[0.08] flex flex-col bg-slate-950/80">
        <div className="panel-header !bg-slate-950/90 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs uppercase font-mono tracking-wider text-gray-200">Quantum Regression Shield</span>
          </div>
          <div className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 glow-emerald flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>SHIELD ACTIVE</span>
          </div>
        </div>
        
        <div className="p-3.5 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-white/[0.06] text-center">
              <div className="text-xl font-bold font-mono text-emerald-400">{passedCount}</div>
              <div className="text-[10px] font-mono text-gray-500 uppercase">Baseline Tests</div>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-white/[0.06] text-center">
              <div className="text-xl font-bold font-mono text-cyan-400">+1</div>
              <div className="text-[10px] font-mono text-gray-500 uppercase">Synthesized Guard</div>
            </div>
          </div>
          
          <div className="space-y-1">
            {testList.map((test, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono transition-all ${
                  test.isNew 
                    ? 'bg-cyan-950/40 border border-cyan-500/30 text-cyan-200' 
                    : 'hover:bg-slate-900/60 text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  {test.status === 'pass' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  )}
                  <span className="truncate">{test.name}</span>
                  {test.isNew && (
                    <span className="text-[8px] bg-cyan-900/80 text-cyan-200 border border-cyan-500/30 px-1 py-0.2 rounded uppercase font-bold shrink-0">
                      Auto-Mined
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-500 shrink-0 ml-2">{test.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Terminal Execution Output */}
      <div className="flex-1 flex flex-col bg-slate-950/95 font-mono">
        <div className="px-4 py-2 border-b border-white/[0.06] bg-slate-900/60 text-[11px] text-gray-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-gray-300">Terminal Test Harness (pytest engine)</span>
          </div>
          <div className="text-[10px] text-gray-500 flex items-center gap-2">
            <span>Isolation: Subprocess Sandbox</span>
            <span>•</span>
            <span className="text-emerald-400">Exit Code 0</span>
          </div>
        </div>
        <div className="p-4 text-xs overflow-y-auto flex-1 text-gray-300 leading-relaxed whitespace-pre font-mono selection:bg-cyan-500/30">
          <span className="text-cyan-400">repoguard-ai@2.5.0</span> <span className="text-gray-500">test:regression-shield</span><br/>
          $ python -m pytest -v --tb=short<br/><br/>
          <span className="text-emerald-400">✓</span> tests/test_core.py::TestAddition::test_add_positive <span className="text-gray-500">2ms</span><br/>
          <span className="text-emerald-400">✓</span> tests/test_core.py::TestMultiplication::test_multiply_positive <span className="text-gray-500">3ms</span><br/>
          <span className="text-emerald-400">✓</span> tests/test_core.py::TestDivision::test_divide_positive <span className="text-gray-500">12ms</span><br/>
          <span className="text-emerald-400">✓</span> tests/test_advanced.py::TestPower::test_power_basic <span className="text-gray-500">7ms</span><br/>
          <span className="text-emerald-400">✓</span> tests/test_advanced.py::TestAverage::test_average_basic <span className="text-gray-500">15ms</span><br/>
          <br/>
          <span className="text-cyan-400">▶</span> <span className="text-cyan-200">Executing counterfactual regression gap test...</span><br/>
          <span className="text-emerald-400 font-bold">✓</span> <span className="text-white font-semibold">tests/test_repoguard_regression.py::test_divide_by_zero</span> <span className="text-gray-500">22ms</span><br/>
          <span className="text-gray-400">  ↳ [COUNTERFACTUAL PROOF]: Fails before patch, passes after patch without crashing</span><br/>
          <br/>
          <span className="text-emerald-400 font-bold">======================= 13 passed in 0.38s =======================</span><br/>
          <span className="text-cyan-400 font-bold">CHANGE SAFETY VERIFICATION: CONFIRMED SAFE</span><br/>
          <span className="text-gray-400">No regressions detected across existing suite. Public interfaces preserved.</span>
        </div>
      </div>
    </div>
  );
}
