import React from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Orbit, Activity, FolderGit2 } from 'lucide-react';
import { useStore } from '../hooks/useStore';

const CustomNode = ({ data }: any) => {
  const getColors = () => {
    switch (data.impactLevel) {
      case 'direct': 
        return 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs';
      case 'indirect': 
        return 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs';
      case 'safe': 
        return 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs';
      default: 
        return 'bg-white border-cyan-400 text-cyan-900 shadow-xs';
    }
  };

  return (
    <div className={`px-3.5 py-2 rounded-xl border-2 backdrop-blur-md text-xs font-mono min-w-[170px] text-center transition-all ${getColors()}`}>
      <Handle type="target" position={Position.Top} className="!bg-cyan-600 w-2 h-2" />
      <div className="font-bold tracking-tight">{data.label}</div>
      {data.impactLevel && (
        <div className="text-[9px] mt-0.5 opacity-90 uppercase font-mono tracking-wider font-semibold">
          {data.impactLevel} Impact Radius
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-600 w-2 h-2" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  { id: '1', type: 'custom', position: { x: 260, y: 30 }, data: { label: 'calculator/core.py', impactLevel: 'direct' } },
  { id: '2', type: 'custom', position: { x: 260, y: 130 }, data: { label: 'Calculator.divide()', impactLevel: 'direct' } },
  { id: '3', type: 'custom', position: { x: 80, y: 240 }, data: { label: 'calculator/advanced.py', impactLevel: 'indirect' } },
  { id: '4', type: 'custom', position: { x: 440, y: 240 }, data: { label: 'tests/test_core.py', impactLevel: 'safe' } },
  { id: '5', type: 'custom', position: { x: 80, y: 340 }, data: { label: 'AdvancedCalculator.ratio()', impactLevel: 'indirect' } },
  { id: '6', type: 'custom', position: { x: 260, y: 340 }, data: { label: 'tests/test_repoguard.py', impactLevel: 'safe' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#e11d48', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#d97706', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#059669', strokeWidth: 1.5 } },
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#d97706', strokeWidth: 2 } },
  { id: 'e2-6', source: '2', target: '6', animated: true, style: { stroke: '#0284c7', strokeWidth: 2 } },
];

export default function ImpactGraph() {
  const { currentRepo } = useStore();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

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
          Connect and analyze a repository to generate the AST caller-callee dependency graph and impact radius.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#f8fafc] relative overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#cbd5e1" gap={20} size={1} />
        <Controls className="!bg-white !border-slate-200 !fill-cyan-600 shadow-sm" />
      </ReactFlow>
      
      {/* Legend Badge */}
      <div className="absolute bottom-4 left-4 bg-white/95 p-3 rounded-xl border border-slate-200 text-[11px] font-mono flex flex-col gap-1.5 backdrop-blur-md z-10 shadow-sm">
        <div className="font-bold text-slate-800 mb-0.5 flex items-center gap-1.5 text-xs">
          <Activity className="w-3.5 h-3.5 text-cyan-600" />
          <span>Impact Radius Topology</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-2xs"></div>
          <span className="text-slate-700">Direct Change Point (P0)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-2xs"></div>
          <span className="text-slate-700">Dependent Callers (P1)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-2xs"></div>
          <span className="text-slate-700">Verified Test Suite (P2)</span>
        </div>
      </div>
    </div>
  );
}
