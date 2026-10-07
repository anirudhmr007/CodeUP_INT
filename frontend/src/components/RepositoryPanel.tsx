import React, { useState } from 'react';
import { FolderGit2, Search, File, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { api } from '../services/api';
import { FileInfo } from '../types';

export default function RepositoryPanel() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileInfo[]>([]);
  const { currentRepo, setCurrentRepo, setIsAnalyzing, setHasReport } = useStore();

  const handleAnalyze = async (targetUrl?: string) => {
    const repoUrl = targetUrl || url;
    if (!repoUrl) return;
    
    setLoading(true);
    setIsAnalyzing(true);
    try {
      const repo = await api.analyzeRepository(repoUrl);
      setCurrentRepo(repo);
      const repoFiles = await api.getRepoFiles(repo.id);
      setFiles(repoFiles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsAnalyzing(false);
    }
  };

  const handleQuickDemo = () => {
    setUrl('demo');
    handleAnalyze('demo');
  };

  return (
    <div className="panel h-full flex flex-col">
      <div className="panel-header bg-slate-50/90 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-cyan-600" />
          <span className="text-xs uppercase tracking-wider font-mono font-bold text-slate-800">
            Repository Digital Twin
          </span>
        </div>
        <button
          type="button"
          onClick={handleQuickDemo}
          className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200/80 flex items-center gap-1 transition-all active:scale-95 shadow-xs font-semibold"
        >
          <Sparkles className="w-3 h-3 text-cyan-600" />
          <span>Quick Demo</span>
        </button>
      </div>
      
      {/* URL Input Form */}
      <div className="p-3 border-b border-slate-200/80 bg-white/60">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }} 
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="GitHub URL or 'demo'..." 
              className="w-full bg-white border border-slate-200 hover:border-cyan-400 rounded-lg py-1.5 pl-8 pr-3 text-xs text-slate-900 font-mono focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15 transition-all shadow-2xs"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            disabled={loading || !url}
            className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-mono font-medium text-white transition-all shadow-xs flex items-center justify-center min-w-[85px] active:scale-95"
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Scan Twin'}
          </button>
        </form>
      </div>

      {/* Explorer Content */}
      <div className="panel-content !p-0 flex-1 overflow-hidden flex flex-col bg-white/40">
        {!currentRepo ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200/60 flex items-center justify-center mb-3 shadow-xs">
              <FolderGit2 className="w-7 h-7 text-cyan-600/70" />
            </div>
            <p className="text-xs font-mono text-slate-600 max-w-[210px] leading-relaxed">
              Connect repository to construct AST symbol index & dependency twin.
            </p>
            <button
              onClick={handleQuickDemo}
              className="mt-3 text-xs font-mono text-cyan-700 hover:text-cyan-800 underline underline-offset-4 flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3 h-3 text-cyan-600" />
              <span>Load Built-in Demo Repository</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Repo Metadata Banner */}
            <div className="px-3.5 py-2.5 bg-slate-50/90 border-b border-slate-200 flex justify-between items-center shrink-0">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <h3 className="font-semibold text-xs text-slate-900 truncate font-mono">{currentRepo.name}</h3>
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <span className="text-cyan-700 font-semibold">{currentRepo.language}</span>
                  <span>•</span>
                  <span className="text-purple-700 truncate">{currentRepo.framework}</span>
                </div>
              </div>
              <div className="text-[10px] font-mono px-2 py-0.5 bg-cyan-50 rounded border border-cyan-200 text-cyan-700 shrink-0 font-semibold">
                {currentRepo.fileCount} AST nodes
              </div>
            </div>
            
            {/* File Tree List */}
            <div className="flex-1 overflow-y-auto p-2">
              <div className="text-[10px] font-mono font-semibold text-slate-400 mb-1.5 uppercase tracking-wider px-2">
                Indexed Source Files
              </div>
              <div className="space-y-0.5">
                {files.map((file, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between gap-2 px-2.5 py-1.5 hover:bg-slate-100/80 rounded-md cursor-pointer text-xs font-mono text-slate-700 group border border-transparent hover:border-slate-200 transition-all"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <File className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 shrink-0 transition-colors" />
                      <span className="truncate group-hover:text-slate-900 font-medium transition-colors">{file.path}</span>
                    </div>
                    {file.size && (
                      <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                        {(file.size / 1024).toFixed(1)}k
                      </span>
                    )}
                  </div>
                ))}
                {files.length === 0 && (
                  <div className="px-2 py-1 text-xs text-slate-400 italic font-mono">Indexing symbols...</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
