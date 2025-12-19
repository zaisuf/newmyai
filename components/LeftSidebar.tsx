import React from 'react';
import { Plus, Layers, Image, Box, Type, MessageSquare, Monitor, Smartphone, Workflow } from './Icons';
import { SelectedElement } from '../types';

interface LeftSidebarProps {
  selection: SelectedElement;
  setSelection: (sel: SelectedElement) => void;
  activeTab: string;
}

const MenuItem = ({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) => (
  <button className={`w-full flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-medium transition-colors
    ${active ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}
  `}>
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

const LayerItem = ({ 
  icon: Icon, 
  label, 
  selected, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  selected: boolean, 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
      ${selected 
        ? 'bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200 shadow-sm' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
      }
    `}
  >
    <div className={`p-1.5 rounded ${selected ? 'bg-blue-200' : 'bg-gray-100'}`}>
      <Icon className="w-4 h-4" />
    </div>
    {label}
  </button>
);

const LeftSidebar: React.FC<LeftSidebarProps> = ({ selection, setSelection, activeTab }) => {
  return (
    <div className="flex h-full bg-white border-r border-gray-200">
      
      {/* 1. Icon Strip (Far Left) */}
      <div className="w-16 flex flex-col border-r border-gray-100 bg-white z-10">
        <div className="flex-1 flex flex-col pt-2">
            <MenuItem icon={Plus} label="Add" active />
            <MenuItem icon={Layers} label="Pages" />
            <MenuItem icon={Box} label="Layers" />
            <MenuItem icon={Image} label="Media" />
            <MenuItem icon={Workflow} label="Logic" />
        </div>
        <div className="pb-2">
            <MenuItem icon={Type} label="Fonts" />
        </div>
      </div>

      {/* 2. Drawer (Contextual Panel) */}
      <div className="w-64 bg-gray-50/50 flex flex-col">
         {/* Drawer Header */}
         <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
            <span className="font-semibold text-sm text-gray-800">Add Elements</span>
            <button className="p-1 hover:bg-gray-100 rounded">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
         </div>

         {/* Search */}
         <div className="p-4">
            <div className="relative">
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input 
                    type="text" 
                    placeholder="Search components..." 
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
         </div>

         {/* Categories */}
         <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
            
            {/* Generator CTA */}
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-600 tracking-wide uppercase">AI Generator</span>
                </div>
                <p className="text-xs text-blue-800 mb-3">Describe what you need, and AI builds it.</p>
                <button className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded shadow-sm hover:bg-blue-700 transition-colors">
                    Generate Full Page
                </button>
            </div>

            {/* Structure Selection (Acts as "Layers") */}
            <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Chat Components</h3>
                <div className="space-y-1">
                    <LayerItem 
                        icon={Layers} 
                        label="Global Settings" 
                        selected={selection === 'global'}
                        onClick={() => setSelection('global')}
                    />
                    <LayerItem 
                        icon={Box} 
                        label="Header" 
                        selected={selection === 'header'}
                        onClick={() => setSelection('header')}
                    />
                    <LayerItem 
                        icon={Monitor} 
                        label="Chat Window" 
                        selected={selection === 'global'} // Chat window effectively shares global
                        onClick={() => setSelection('global')}
                    />
                    <LayerItem 
                        icon={MessageSquare} 
                        label="Bot Message" 
                        selected={selection === 'bot_message'}
                        onClick={() => setSelection('bot_message')}
                    />
                    <LayerItem 
                        icon={MessageSquare} 
                        label="User Message" 
                        selected={selection === 'user_message'}
                        onClick={() => setSelection('user_message')}
                    />
                    <LayerItem 
                        icon={Type} 
                        label="Input Area" 
                        selected={selection === 'input_area'}
                        onClick={() => setSelection('input_area')}
                    />
                </div>
            </div>

            {/* Mock Drag Elements */}
            <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sections & Layouts</h3>
                <div className="grid grid-cols-2 gap-3">
                   <div className="aspect-square bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab hover:border-blue-400 hover:shadow-md transition-all">
                      <div className="w-8 h-8 rounded bg-gray-100"></div>
                      <span className="text-[10px] font-medium text-gray-600">Hero Section</span>
                   </div>
                   <div className="aspect-square bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab hover:border-blue-400 hover:shadow-md transition-all">
                      <div className="w-8 h-8 rounded bg-gray-100"></div>
                      <span className="text-[10px] font-medium text-gray-600">Feature Grid</span>
                   </div>
                </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default LeftSidebar;