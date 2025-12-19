
"use client"
import React from 'react';
import PreviewWindow from '../../components/PreviewWindow';
import { MessageSquare, X } from 'lucide-react';

interface EmbedWrapperProps {
  agent: any;
  mode: string;
  onOpen: () => void;
  onClose: () => void;
  showWelcome: boolean;
  setShowWelcome: (val: boolean) => void;
}

const ChatflowEmbed: React.FC<EmbedWrapperProps> = ({ agent, mode, onOpen, onClose, showWelcome, setShowWelcome }) => {
  const theme = agent.theme || {};
  
  if (mode === 'launcher') {
    return (
      <div className="flex flex-col items-end gap-3 pointer-events-auto">
        {showWelcome && theme.showWelcomeBubbles && theme.welcomeMessage && (
          <div 
            className="relative max-w-[280px] p-4 pr-10 rounded-[20px] rounded-br-none shadow-2xl border border-white/10 animate-[fadeIn_0.5s_ease-out] cursor-pointer"
            style={{ backgroundColor: theme.launcherTagBg || '#1f2937', color: theme.launcherTagText || '#ffffff' }}
            onClick={onOpen}
          >
            <button onClick={(e) => { e.stopPropagation(); setShowWelcome(false); }} className="absolute top-2 right-2 w-5 h-5 bg-black/10 rounded-full flex items-center justify-center">
              <X className="w-3 h-3" />
            </button>
            <p className="text-[11px] font-medium leading-relaxed">{theme.welcomeMessage}</p>
          </div>
        )}
        <button
          onClick={onOpen}
          className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group overflow-hidden border-4 border-white"
          style={{ backgroundColor: theme.launcherBg || '#2563eb' }}
        >
          {theme.launcherLogoUrl ? (
            <img src={theme.launcherLogoUrl} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <MessageSquare className="w-7 h-7" style={{ color: theme.launcherIconColor || '#ffffff' }} />
          )}
        </button>
      </div>
    );
  }

  return (
    <PreviewWindow 
      theme={theme} 
      agentConfig={agent.agentConfig || {}} 
      onClose={onClose} 
    />
  );
};

export default ChatflowEmbed;
