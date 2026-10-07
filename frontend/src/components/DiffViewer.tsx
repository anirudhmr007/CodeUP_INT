import React, { useEffect, useState } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { FileCode, Sparkles, FolderGit2 } from 'lucide-react';
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
  const { currentTaskId, currentRepo } = useStore();
  const [originalCode, setOriginalCode] = useState(defaultOriginal);
  const [modifiedCode, setModifiedCode] = useState(defaultModified);
  const [fileName, setFileName] = useState('calculator/core.py');

  useEffect(() => {
    if (currentTaskId) {
      api.getTaskDiff(currentTaskId).then(diffText => {
        if (diffText && diffText.includes('+++')) {
          setFileName('calculator/core.py');
        }
      }).catch(() => {});
    }
  }, [currentTaskId]);

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
          Connect and analyze a repository, then run autonomous repair to inspect the minimal safe diff.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-slate-50/90 border-b border-slate-200 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-50 text-cyan-800 text-xs font-mono rounded-lg border border-cyan-200 whitespace-nowrap shadow-2xs">
            <FileCode className="w-3.5 h-3.5 text-cyan-600" />
            <span className="font-semibold">{fileName}</span>
            <span className="text-[10px] bg-cyan-100 px-1.5 py-0.2 rounded text-cyan-700 font-bold">
              Minimal Safe Patch
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-md text-[11px] border border-rose-200 flex items-center gap-1 font-semibold">
            <span className="font-bold">-</span> 1 lines removed
          </div>
          <div className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md text-[11px] border border-emerald-200 flex items-center gap-1 font-semibold">
            <span className="font-bold">+</span> 3 lines added
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-white relative">
        <DiffEditor
          height="100%"
          language="python"
          theme="vs"
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
