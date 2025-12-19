
import React, { useState } from 'react';
import { VoiceThemeConfig } from '../types';
import { Mic, Phone, Activity, User, Power } from 'lucide-react';

interface VoicePreviewWindowProps {
  theme: VoiceThemeConfig;
  mode?: 'launcher' | 'full';
  onOpen?: () => void;
  onClose?: () => void;
}

const VoicePreviewWindow: React.FC<VoicePreviewWindowProps> = ({ theme, mode = 'full', onOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);

  const toggleSession = () => {
    setIsListening(!isListening);
  };

  const isNeumorphic = theme.triggerStyle === 'Minimal';

  const getWidgetStyle = () => {
    if (isNeumorphic) {
      return {
        backgroundColor: theme.widgetBg,
        borderRadius: theme.widgetBorderRadius || '32px',
        boxShadow: `12px 12px 24px rgba(0,0,0,0.06), -12px -12px 24px rgba(255,255,255,0.8), inset 2px 2px 5px rgba(255,255,255,0.4)`
      };
    }
    return { 
      backgroundColor: theme.widgetBg,
      borderRadius: theme.widgetBorderRadius || '32px',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)'
    };
  };

  const getButtonStyle = () => {
    if (isNeumorphic) {
      return {
        backgroundColor: isListening ? '#ef4444' : theme.buttonBg,
        color: theme.buttonTextColor,
        borderRadius: theme.buttonBorderRadius || '16px',
        boxShadow: `6px 6px 12px rgba(0,0,0,0.1), -6px -6px 12px rgba(255,255,255,0.4)`
      };
    }
    return {
      backgroundColor: isListening ? '#ef4444' : theme.buttonBg,
      color: theme.buttonTextColor,
      borderRadius: theme.buttonBorderRadius || '16px'
    };
  };

  // If in launcher mode, we still show the pill (used in builder only now)
  if (mode === 'launcher') {
    return (
      <div 
        className="flex items-center gap-4 p-2 transition-all duration-500 pointer-events-auto shadow-xl"
        style={getWidgetStyle()}
        onClick={onOpen}
      >
        <button 
          className="flex items-center gap-3 px-6 py-3 font-black text-[10px] uppercase tracking-[0.2em] transition-all"
          style={getButtonStyle()}
        >
          <Mic className="w-3.5 h-3.5" style={{ color: theme.buttonIconColor }} />
          <span>Talk Agent</span>
        </button>
        <div className="pr-2">
          <div className="w-12 h-12 rounded-full border-2 border-white/40 overflow-hidden shadow-inner bg-black/5">
             <img src={theme.agentAvatar} alt="Agent" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full flex flex-col p-8 transition-all duration-500 overflow-hidden"
      style={{ ...getWidgetStyle(), color: theme.textColor }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Modality</h3>
            <span className="text-xs font-bold uppercase tracking-widest">Real-time Voice</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-[9px] font-black uppercase tracking-widest text-green-600">System Live</span>
        </div>
      </div>

      {/* Main Display Area */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
        <div className="relative">
          <div className={`w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden transition-all duration-700 ${isListening ? 'scale-110 ring-4 ring-purple-500/20' : ''}`}>
            <img src={theme.agentAvatar} alt="Agent" className="w-full h-full object-cover" />
          </div>
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping"></div>
              <div className="absolute inset-[-10px] rounded-full border-2 border-purple-500/10 animate-[ping_3s_linear_infinite]"></div>
            </>
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black tracking-tight uppercase">AI Assistant</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">
            {isListening ? 'Processing Audio...' : 'Idle - Waiting to Connect'}
          </p>
        </div>
      </div>

      {/* Interaction Bar */}
      <div className="mt-auto flex flex-col items-center gap-6">
        <button 
          onClick={toggleSession}
          className={`w-full flex items-center justify-center gap-4 py-5 font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 shadow-xl`}
          style={getButtonStyle()}
        >
          {isListening ? (
             <>
               <Phone className="w-4 h-4 fill-current rotate-[135deg]" />
               <span>End Session</span>
             </>
          ) : (
            <>
              <Mic className="w-4 h-4" style={{ color: theme.buttonIconColor }} />
              <span>Initiate Call</span>
            </>
          )}
        </button>
        
        <div className="flex items-center gap-4 opacity-30">
          <div className="w-12 h-0.5 bg-current rounded-full"></div>
          <span className="text-[8px] font-black uppercase tracking-widest">BotForge Intelligence</span>
          <div className="w-12 h-0.5 bg-current rounded-full"></div>
        </div>
      </div>

      {/* Visualizers (Subtle) */}
      {isListening && (
        <div className="absolute bottom-32 left-0 right-0 h-20 flex items-center justify-center gap-1.5 opacity-20 pointer-events-none">
           {[0.3, 0.7, 1.0, 0.6, 0.9, 0.4, 0.8, 0.5, 0.7].map((h, i) => (
              <div 
                key={i} 
                className="w-1 bg-purple-600 rounded-full animate-[pulse_1s_infinite]" 
                style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }}
              ></div>
           ))}
        </div>
      )}
    </div>
  );
};

export default VoicePreviewWindow;
