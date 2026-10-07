import { create } from 'zustand';
import { RepositoryInfo, TaskStatus, AgentEvent } from '../types';

interface AppState {
  currentRepo: RepositoryInfo | null;
  setCurrentRepo: (repo: RepositoryInfo | null) => void;
  
  currentTaskId: string | null;
  setCurrentTaskId: (id: string | null) => void;
  
  taskStatus: TaskStatus | null;
  setTaskStatus: (status: TaskStatus | null) => void;
  
  events: AgentEvent[];
  setEvents: (events: AgentEvent[]) => void;
  addEvent: (event: AgentEvent) => void;

  // Analysis & Report visibility control
  isAnalyzing: boolean;
  setIsAnalyzing: (v: boolean) => void;

  hasReport: boolean;
  setHasReport: (v: boolean) => void;

  activeTab: 'evidence' | 'impact' | 'diff' | 'report';
  setActiveTab: (tab: 'evidence' | 'impact' | 'diff' | 'report') => void;
}

export const useStore = create<AppState>((set) => ({
  currentRepo: null,
  setCurrentRepo: (repo) => set({ 
    currentRepo: repo,
    // When repo is analyzed, we enable baseline awareness
  }),
  
  currentTaskId: null,
  setCurrentTaskId: (id) => set({ currentTaskId: id }),
  
  taskStatus: null,
  setTaskStatus: (status) => set({ taskStatus: status }),
  
  events: [],
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),

  isAnalyzing: false,
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),

  hasReport: false,
  setHasReport: (hasReport) => set({ hasReport }),

  activeTab: 'evidence',
  setActiveTab: (activeTab) => set({ activeTab }),
}));
