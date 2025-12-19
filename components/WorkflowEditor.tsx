import React, { useState, useRef, useEffect } from 'react';
import { WorkflowNode, ThemeConfig } from '../types';
import { Move, Plus, MessageSquare, Zap, Play, Palette } from './Icons';
import StylePanel from './StylePanel';

interface WorkflowEditorProps {
  nodes: WorkflowNode[];
  setNodes: React.Dispatch<React.SetStateAction<WorkflowNode[]>>;
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({ nodes, setNodes, theme, setTheme }) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showStylePanel, setShowStylePanel] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const addNode = (type: WorkflowNode['type']) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      description: type === 'trigger' ? 'When user says...' : type === 'response' ? 'Bot replies...' : 'Logic check',
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
    };
    setNodes(prev => [...prev, newNode]);
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === id);
    if (!node || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setOffset({
      x: mouseX - node.x,
      y: mouseY - node.y
    });
    setDraggingId(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - offset.x;
    const y = e.clientY - rect.top - offset.y;

    setNodes(prev => prev.map(node => 
      node.id === draggingId ? { ...node, x, y } : node
    ));
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  // Simplified connection drawing
  const renderConnections = () => {
    // Just drawing lines between nodes sequentially for visual demo purposes
    // In a real app, this would use an adjacency list or edge list
    if (nodes.length < 2) return null;

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
          </marker>
        </defs>
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const nextNode = nodes[i + 1];
          // Simple curve calculation
          const startX = node.x + 250; // Width of card
          const startY = node.y + 40; // Mid-height of card header
          const endX = nextNode.x;
          const endY = nextNode.y + 40;

          const midX = (startX + endX) / 2;

          return (
            <path
              key={`conn-${i}`}
              d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
              stroke="#4b5563"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 text-white overflow-hidden relative">
      {/* Toolbar */}
      <div className="h-16 border-b border-gray-800 bg-gray-800/50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <span className="font-semibold mr-2 text-gray-400">Tools:</span>
          <button onClick={() => addNode('trigger')} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 bg-gray-800 border border-gray-700 transition-colors text-sm">
            <Play className="w-4 h-4 text-green-400" /> Start Trigger
          </button>
          <button onClick={() => addNode('response')} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 bg-gray-800 border border-gray-700 transition-colors text-sm">
            <MessageSquare className="w-4 h-4 text-blue-400" /> AI Response
          </button>
          <button onClick={() => addNode('condition')} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 bg-gray-800 border border-gray-700 transition-colors text-sm">
            <Zap className="w-4 h-4 text-yellow-400" /> Logic Check
          </button>
        </div>

        <button 
          onClick={() => setShowStylePanel(!showStylePanel)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${showStylePanel ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'}`}
        >
          <Palette className="w-4 h-4" />
          {showStylePanel ? 'Close Styles' : 'Customize UI'}
        </button>
      </div>

      {/* Canvas */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden cursor-crosshair bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-950"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute top-4 right-4 text-gray-500 text-xs pointer-events-none select-none z-0">
          Drag cards to arrange • Click tools to add
        </div>

        {renderConnections()}

        {nodes.map(node => (
          <div
            key={node.id}
            style={{ 
              transform: `translate(${node.x}px, ${node.y}px)`,
              position: 'absolute',
              width: '250px'
            }}
            className={`
              rounded-lg shadow-xl border border-gray-700 bg-gray-800 
              ${draggingId === node.id ? 'z-40 ring-2 ring-blue-500 cursor-grabbing' : 'z-10 cursor-grab'}
            `}
            onMouseDown={(e) => handleMouseDown(e, node.id)}
          >
            {/* Node Header */}
            <div className={`p-3 rounded-t-lg flex items-center justify-between border-b border-gray-700
              ${node.type === 'trigger' ? 'bg-green-900/30' : 
                node.type === 'response' ? 'bg-blue-900/30' : 'bg-yellow-900/30'
              }
            `}>
              <div className="flex items-center gap-2">
                {node.type === 'trigger' && <Play className="w-4 h-4 text-green-400" />}
                {node.type === 'response' && <MessageSquare className="w-4 h-4 text-blue-400" />}
                {node.type === 'condition' && <Zap className="w-4 h-4 text-yellow-400" />}
                <span className="font-medium text-sm text-gray-200">{node.title}</span>
              </div>
              <Move className="w-4 h-4 text-gray-500 opacity-50" />
            </div>

            {/* Node Body */}
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-3">{node.description}</p>
              {node.type === 'response' && (
                <div className="h-2 w-full bg-gray-700 rounded mb-1 animate-pulse"></div>
              )}
               {node.type === 'trigger' && (
                 <div className="text-xs text-green-500 bg-green-900/20 p-1 rounded border border-green-900/50 text-center">Active</div>
              )}
            </div>

            {/* Ports */}
            <div className="absolute top-1/2 -left-3 w-3 h-3 bg-gray-500 rounded-full border-2 border-gray-900 hover:bg-white transition-colors"></div>
            <div className="absolute top-1/2 -right-3 w-3 h-3 bg-gray-500 rounded-full border-2 border-gray-900 hover:bg-white transition-colors"></div>
          </div>
        ))}

        {/* Floating Customizer Sidebar */}
        {showStylePanel && (
          <div className="absolute top-0 right-0 bottom-0 z-50 shadow-2xl animate-[slideLeft_0.2s_ease-out]">
            <StylePanel theme={theme} setTheme={setTheme} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowEditor;
