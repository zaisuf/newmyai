import React from 'react';
import { Monitor, Smartphone, Undo, Redo, Play, Settings, Zap } from './Icons';
import { ThemeConfig } from '../types';

interface TopBarProps {
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

const TopBar: React.FC<TopBarProps> = ({ theme, setTheme }) => {
  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-20 shrink-0">
      {/* Left: Brand & Page Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                B
            </div>
        </div>
        <div className="h-6 w-px bg-gray-300"></div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
           <span className="bg-gray-100 p-1.5 rounded"><Monitor className="w-4 h-4" /></span>
           <span>Home Page</span>
        </div>
      </div>

      {/* Center: History */}
      <div className="flex items-center gap-6">
         <div className="flex items-center gap-2 text-gray-400">
            <button className="hover:text-gray-600"><Undo className="w-4 h-4" /></button>
            <button className="hover:text-gray-600"><Redo className="w-4 h-4" /></button>
         </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
         <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Play className="w-4 h-4" /> Preview
         </button>
         <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            Export
         </button>
         <div className="h-6 w-px bg-gray-300"></div>
         <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors shadow-sm">
            <Settings className="w-4 h-4" /> Setup
         </button>
         <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
            <Zap className="w-4 h-4 fill-current" /> Publish
         </button>
      </div>
    </div>
  );
};

export default TopBar;