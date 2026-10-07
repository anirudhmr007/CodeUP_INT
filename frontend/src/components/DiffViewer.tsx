import React, { useEffect, useState } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { FileCode, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { api } from '../services/api';

const defaultOriginal = `class Calculator:
    def __init__(self):
        self.history = []

    def divide(self, a: float, b: float) -> float:
        """Divide a by b.
        BUG: Does not check for division by zero.
        """
        result = a / b
        self.history.append({"op": "divide", "a": a, "b": b, "result": result})
        return result
`;

const defaultModified = `class Calculator:
    def __init__(self):
        self.history = []

    def divide(self, a: float, b: float) -> float:
        """Divide a by b.
        Fixed: Guarded against division by zero.
        """
        if b == 0:
            raise ValueError("Cannot divide by zero")
        result = a / b
        self.history.append({"op": "divide", "a": a, "b": b, "result": result})
        return result
`;

export default function DiffViewer() {
  const { currentTaskId } = useStore();
  const [originalCode, setOriginalCode] = useState(defaultOriginal);
  const [modifiedCode, setModifiedCode] = useState(defaultModified);
  const [fileName, setFileName] = useState('calculator/core.py');

  useEffect(() => {
    if (currentTaskId) {
      api.getTaskDiff(currentTaskId).then(diffText => {
        if (diffText && diffText.includes('+++')) {
          // If a unified diff is returned, keep view clean
          setFileName('calculator/core.py');
        }
      }).catch(() => {});
    }
  }, [currentTaskId]);

  return (
    <div className="h-full flex flex-col bg-slate-950/70">
      <div className="bg-slate-900/80 border-b border-white/[0.06] p-2 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-950/50 text-cyan-200 text-xs font-mono rounded-lg border border-cyan-500/30 whitespace-nowrap glow-cyan">
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>{fileName}</span>
            <span className="text-[10px] bg-cyan-900/60 px-1.5 py-0.2 rounded text-cyan-300 font-bold">
              Minimal Safe Patch
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="bg-rose-950/40 text-rose-300 px-2.5 py-0.5 rounded-md text-[11px] border border-rose-800/40 flex items-center gap-1 backdrop-blur-sm">
            <span className="font-bold">-</span> 1 lines removed
          </div>
          <div className="bg-emerald-950/40 text-emerald-300 px-2.5 py-0.5 rounded-md text-[11px] border border-emerald-800/40 flex items-center gap-1 backdrop-blur-sm">
            <span className="font-bold">+</span> 3 lines added
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-[#090d16] relative">
        <DiffEditor
          height="100%"
          language="python"
          theme="vs-dark"
          original={originalCode}
          modified={modifiedCode}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            renderSideBySide: true,
          }}
          className="react-monaco-editor-diff"
        />
      </div>
    </div>
  );
}
