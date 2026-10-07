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
import { Orbit, Activity } from 'lucide-react';

const CustomNode = ({ data }: any) => {
  const getColors = () => {
    switch (data.impactLevel) {
      case 'direct': 
        return 'bg-rose-950/80 border-rose-500/80 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.3)]';
      case 'indirect': 
        return 'bg-amber-950/80 border-amber-500/80 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.25)]';
      case 'safe': 
        return 'bg-emerald-950/80 border-emerald-500/80 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.25)]';
      default: 
        return 'bg-slate-900/80 border-cyan-500/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]';
    }
  };

  return (
    <div className={`px-3.5 py-2 rounded-xl border backdrop-blur-md text-xs font-mono min-w-[170px] text-center transition-all ${getColors()}`}>
      <Handle type="target" position={Position.Top} className="!bg-cyan-400 w-2 h-2" />
      <div className="font-bold tracking-tight">{data.label}</div>
      {data.impactLevel && (
        <div className="text-[9px] mt-0.5 opacity-90 uppercase font-mono tracking-wider">
          {data.impactLevel} Impact Radius
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-400 w-2 h-2" />
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
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#f43f5e', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#10b981', strokeWidth: 1.5 } },
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e2-6', source: '2', target: '6', animated: true, style: { stroke: '#06b6d4', strokeWidth: 2 } },
];

export default function ImpactGraph() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-full bg-[#030712] relative overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls className="!bg-slate-900 !border-white/[0.08] !fill-cyan-400" />
      </ReactFlow>
      
      {/* Legend Badge */}
      <div className="absolute bottom-4 left-4 bg-slate-950/80 p-3 rounded-xl border border-white/[0.08] text-[11px] font-mono flex flex-col gap-1.5 backdrop-blur-md z-10 shadow-xl">
        <div className="font-bold text-gray-300 mb-0.5 flex items-center gap-1.5 text-xs">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>Impact Radius Topology</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"></div>
          <span className="text-gray-300">Direct Change Point (P0)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></div>
          <span className="text-gray-300">Dependent Callers (P1)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
          <span className="text-gray-300">Verified Test Suite (P2)</span>
        </div>
      </div>
    </div>
  );
}
