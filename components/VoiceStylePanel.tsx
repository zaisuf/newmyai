
import React from 'react';
import { VoiceThemeConfig } from '../types';
import { Layout, Sparkles } from 'lucide-react';

interface VoiceStylePanelProps {
  theme: VoiceThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<VoiceThemeConfig>>;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-1">{title}</div>
    {children}
  </div>
);

const VoiceStylePanel: React.FC<VoiceStylePanelProps> = ({ theme, setTheme }) => {
  const updateTheme = (key: keyof VoiceThemeConfig, value: any) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col z-10 shadow-sm animate-[fadeInRight_0.3s_ease-out]">
      <div className="h-14 flex items-center justify-between px-5 border-b border-gray-200 bg-white sticky top-0 z-20">
         <h2 className="text-xs font-bold text-gray-800 tracking-wide uppercase flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" /> Interface Behavior
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
         <Section title="Trigger Placement">
            <div className="grid grid-cols-2 gap-2">
               {['Floating', 'BottomBar', 'Fullscreen', 'Minimal'].map((style) => (
                  <button 
                     key={style}
                     onClick={() => updateTheme('triggerStyle', style as any)}
                     className={`px-3 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-lg border transition-all duration-200 
                     ${theme.triggerStyle === style 
                        ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-sm' 
                        : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200 hover:text-gray-600'}`}
                  >
                     {style}
                  </button>
               ))}
            </div>
         </Section>

         <div className="h-px bg-gray-100 my-6" />

         <Section title="Interface Hint">
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
               <div className="flex items-center gap-2 text-purple-700 mb-2">
                  <Layout className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">UX Recommendation</span>
               </div>
               <p className="text-[10px] text-purple-900/60 leading-relaxed font-medium">
                  Use "Floating" for customer support assistants to provide easy access without blocking page content.
               </p>
            </div>
         </Section>
      </div>
    </div>
  );
};

export default VoiceStylePanel;
