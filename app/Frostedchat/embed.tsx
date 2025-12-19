
"use client"
import React from 'react';
import FrostedPreview from './components/FrostedPreview';
import { Sparkles, X } from 'lucide-react';

interface EmbedWrapperProps {
  agent: any;
  mode: string;
  onOpen: () => void;
  onClose: () => void;
  showWelcome: boolean;
  setShowWelcome: (val: boolean) => void;
}

const FrostedEmbed: React.FC<EmbedWrapperProps> = ({ agent, mode, onOpen, onClose, showWelcome, setShowWelcome }) => {
  const theme = agent.theme || {};
  
  if (mode === 'launcher') {
    return (
      <div className="flex flex-col items-end gap-3 pointer-events-auto">
        {showWelcome && theme.showWelcomeBubbles && theme.welcomeMessage && (
          <div 
            className="relative max-w-[280px] p-5 pr-12 rounded-[2rem] rounded-br-none shadow-2xl border border-white/40 animate-[fadeIn_0.8s_ease-out] cursor-pointer backdrop-blur-3xl bg-white/40"
            onClick={onOpen}
          >
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-pink-500/5 rounded-[2rem] pointer-events-none"></div>
            <button onClick={(e) => { e.stopPropagation(); setShowWelcome(false); }} className="absolute top-3 right-3 w-6 h-6 bg-black/5 rounded-full flex items-center justify-center text-slate-500 relative z-10">
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="text-[12px] font-semibold text-slate-700 leading-relaxed relative z-10">{theme.welcomeMessage}</p>
          </div>
        )}
        <button
          onClick={onOpen}
          className="w-16 h-16 rounded-[1.8rem] shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl"
        >
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse"
            style={{ background: theme.headerBg }}
          >
            <Sparkles className="w-5 h-5" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <FrostedPreview 
      theme={theme} 
      agentConfig={agent.agentConfig || {}} 
      onClose={onClose} 
    />
  );
};

export default FrostedEmbed;
