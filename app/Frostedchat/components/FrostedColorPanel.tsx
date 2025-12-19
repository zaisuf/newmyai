
import React from 'react';
import { ThemeConfig } from '../../../types';
import { Image as ImageIcon, Link as LinkIcon, Palette, Sparkles, Droplets } from 'lucide-react';

interface FrostedColorPanelProps {
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

const ColorInput = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="group flex items-center justify-between py-3 px-1 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors rounded-sm">
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    <div className="flex items-center gap-3">
      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">
        {value && value.startsWith('#') ? value : 'Select'}
      </span>
      <div className="relative w-8 h-5 rounded-md overflow-hidden ring-1 ring-slate-200 shadow-sm transition-transform hover:scale-110">
        <div className="absolute inset-0" style={{ backgroundColor: value && value.startsWith('#') ? value : '#000000' }} />
        <input
          type="color"
          value={value && value.startsWith('#') ? value : '#000000'}
          onChange={onChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </div>
    </div>
  </div>
);

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4 px-1">
      <Icon className="w-3.5 h-3.5 text-indigo-600" />
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h3>
    </div>
    <div className="space-y-0.5">{children}</div>
  </div>
);

const FrostedColorPanel: React.FC<FrostedColorPanelProps> = ({ theme, setTheme }) => {
  const updateTheme = (key: keyof ThemeConfig, value: any) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-80 h-full bg-white border-r border-slate-200 flex flex-col z-10 shadow-sm">
      <div className="h-14 flex items-center px-5 border-b border-slate-200 bg-white sticky top-0 z-20">
        <h2 className="text-xs font-bold text-slate-800 tracking-wide uppercase flex items-center gap-2">
          <Palette className="w-4 h-4 text-indigo-600" /> Frosted Optics
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <Section title="Header Gradient" icon={Sparkles}>
          <div className="bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/50 mb-4">
            <div className="space-y-1">
              <ColorInput label="Tone 1 (Start)" value={theme.headerColor1 || '#2563eb'} onChange={(e) => updateTheme('headerColor1', e.target.value)} />
              <ColorInput label="Tone 2 (Mid)" value={theme.headerColor2 || '#9333ea'} onChange={(e) => updateTheme('headerColor2', e.target.value)} />
              <ColorInput label="Tone 3 (End)" value={theme.headerColor3 || '#ec4899'} onChange={(e) => updateTheme('headerColor3', e.target.value)} />
            </div>
            <div className="mt-4">
              <div className="w-full h-10 rounded-xl shadow-inner border-2 border-white" style={{ background: theme.headerBg }}></div>
              <p className="text-[8px] text-indigo-400 font-black uppercase mt-2 text-center tracking-widest">Active Diffusion</p>
            </div>
          </div>
          <ColorInput label="Header Text" value={theme.headerText} onChange={(e) => updateTheme('headerText', e.target.value)} />
        </Section>

        <Section title="Glass Canvas" icon={Droplets}>
           <ColorInput label="Chat Surface" value={theme.chatBg} onChange={(e) => updateTheme('chatBg', e.target.value)} />
           <ColorInput label="Input Field Fill" value={theme.inputBarBg} onChange={(e) => updateTheme('inputBarBg', e.target.value)} />
           <ColorInput label="Launcher Widget" value={theme.launcherBg} onChange={(e) => updateTheme('launcherBg', e.target.value)} />
        </Section>

        <Section title="Message Layers" icon={ImageIcon}>
           <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-3">
              <div className="text-[8px] font-black text-slate-400 mb-3 uppercase tracking-widest">Assistant Style</div>
              <ColorInput label="Fill" value={theme.botBubbleBg} onChange={(e) => updateTheme('botBubbleBg', e.target.value)} />
              <ColorInput label="Text" value={theme.botBubbleText} onChange={(e) => updateTheme('botBubbleText', e.target.value)} />
           </div>
           <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100">
              <div className="text-[8px] font-black text-indigo-400 mb-3 uppercase tracking-widest">User Style</div>
              <ColorInput label="Fill" value={theme.userBubbleBg} onChange={(e) => updateTheme('userBubbleBg', e.target.value)} />
              <ColorInput label="Text" value={theme.userBubbleText} onChange={(e) => updateTheme('userBubbleText', e.target.value)} />
           </div>
        </Section>

        <Section title="Interactive Elements" icon={Palette}>
           <ColorInput label="Send Action" value={theme.sendButtonBg} onChange={(e) => updateTheme('sendButtonBg', e.target.value)} />
           <ColorInput label="Action Icon" value={theme.sendButtonIconColor} onChange={(e) => updateTheme('sendButtonIconColor', e.target.value)} />
           <ColorInput label="Sync Spinner" value={theme.loadingColor} onChange={(e) => updateTheme('loadingColor', e.target.value)} />
        </Section>
      </div>
    </div>
  );
};

export default FrostedColorPanel;
