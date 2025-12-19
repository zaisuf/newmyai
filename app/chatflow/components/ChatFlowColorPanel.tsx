
import React from 'react';
import { ThemeConfig } from '../../../types';
import { Image as ImageIcon, Link as LinkIcon, Palette } from 'lucide-react';

interface ChatFlowColorPanelProps {
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

const ColorInput = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="group flex items-center justify-between py-3 px-1 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-sm">
    <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wide">
        {value && value.startsWith('#') ? value : 'Select'}
      </span>
      <div className="relative w-8 h-5 rounded-md overflow-hidden ring-1 ring-gray-200 group-hover:ring-gray-300 transition-all shadow-sm">
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

const Section = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-3 px-1">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        {title}
      </h3>
    </div>
    <div className="space-y-0.5">
      {children}
    </div>
  </div>
);

const ChatFlowColorPanel: React.FC<ChatFlowColorPanelProps> = ({ theme, setTheme }) => {
  const updateTheme = (key: keyof ThemeConfig, value: any) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const isFrosted = theme.headerStyle === 'Frosted';

  return (
    <div className="w-80 h-full bg-white border-r border-gray-200 flex flex-col z-10">
      <div className="h-14 flex items-center px-5 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="text-xs font-bold text-gray-800 tracking-wide uppercase">
          Theme Assets & Colors
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <Section title="Launcher Widget">
           <div className="mb-4 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <label className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-2">Launcher Logo URL</label>
              <div className="flex gap-2">
                 <div className="w-10 h-10 rounded-lg bg-white border border-blue-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    {theme.launcherLogoUrl ? (
                       <img src={theme.launcherLogoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                       <ImageIcon className="w-4 h-4 text-blue-300" />
                    )}
                 </div>
                 <div className="relative flex-1">
                    <LinkIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                    <input 
                       type="text" 
                       placeholder="https://image.com/logo.png"
                       value={theme.launcherLogoUrl || ''}
                       onChange={(e) => updateTheme('launcherLogoUrl', e.target.value)}
                       className="w-full h-10 pl-7 pr-2 bg-white border border-blue-200 rounded-lg text-[10px] font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all shadow-sm"
                    />
                 </div>
              </div>
           </div>
           
           <ColorInput label="Launcher BG" value={theme.launcherBg || '#ef4444'} onChange={(e) => updateTheme('launcherBg', e.target.value)} />
           <ColorInput label="Icon Color" value={theme.launcherIconColor || '#ffffff'} onChange={(e) => updateTheme('launcherIconColor', e.target.value)} />
        </Section>

        <Section title="Launcher Tag (Welcome)">
           <div className="mb-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 px-1">Tag Message</label>
              <textarea 
                value={theme.welcomeMessage}
                onChange={(e) => updateTheme('welcomeMessage', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none h-20 shadow-inner"
                placeholder="Hello! How can I help?"
              />
           </div>
           <ColorInput label="Tag Background" value={theme.launcherTagBg || '#1f2937'} onChange={(e) => updateTheme('launcherTagBg', e.target.value)} />
           <ColorInput label="Tag Text" value={theme.launcherTagText || '#ffffff'} onChange={(e) => updateTheme('launcherTagText', e.target.value)} />
           <div className="flex items-center justify-between py-3 px-1">
              <span className="text-xs font-semibold text-gray-600">Show Welcome Tag</span>
              <input 
                type="checkbox" 
                checked={theme.showWelcomeBubbles}
                onChange={(e) => updateTheme('showWelcomeBubbles', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
           </div>
        </Section>

        <Section title="Canvas & Backgrounds">
           <ColorInput label="Chat Background" value={theme.chatBg} onChange={(e) => updateTheme('chatBg', e.target.value)} />
           
           {isFrosted ? (
             <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 mt-2 space-y-1">
                <div className="flex items-center gap-2 mb-3">
                   <Palette className="w-3 h-3 text-indigo-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Header 3-Color Mix</span>
                </div>
                <ColorInput label="Tone 1 (Start)" value={theme.headerColor1 || '#2563eb'} onChange={(e) => updateTheme('headerColor1', e.target.value)} />
                <ColorInput label="Tone 2 (Mid)" value={theme.headerColor2 || '#9333ea'} onChange={(e) => updateTheme('headerColor2', e.target.value)} />
                <ColorInput label="Tone 3 (End)" value={theme.headerColor3 || '#ec4899'} onChange={(e) => updateTheme('headerColor3', e.target.value)} />
                <div className="pt-2">
                   <div className="w-full h-8 rounded-lg shadow-inner border border-white" style={{ background: theme.headerBg }}></div>
                   <p className="text-[8px] text-indigo-400 font-bold uppercase mt-2 text-center tracking-widest">Active Gradient Preview</p>
                </div>
             </div>
           ) : (
             <ColorInput label="Header Background" value={theme.headerBg} onChange={(e) => updateTheme('headerBg', e.target.value)} />
           )}
           
           <ColorInput label="Input Area Background" value={theme.footerBg} onChange={(e) => updateTheme('footerBg', e.target.value)} />
        </Section>
        
        <Section title="Typography">
           <ColorInput label="Header Text" value={theme.headerText} onChange={(e) => updateTheme('headerText', e.target.value)} />
           <ColorInput label="Input Text" value={theme.inputBarText} onChange={(e) => updateTheme('inputBarText', e.target.value)} />
           <ColorInput label="Placeholder" value={theme.inputPlaceholder || '#6b7280'} onChange={(e) => updateTheme('inputPlaceholder', e.target.value)} /> 
        </Section>
        
        <Section title="Message Bubbles">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 mb-3">
             <div className="text-[10px] font-bold text-gray-400 mb-2 uppercase">Bot Styles</div>
             <ColorInput label="Background" value={theme.botBubbleBg} onChange={(e) => updateTheme('botBubbleBg', e.target.value)} />
             <ColorInput label="Text Color" value={theme.botBubbleText} onChange={(e) => updateTheme('botBubbleText', e.target.value)} />
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
             <div className="text-[10px] font-bold text-gray-400 mb-2 uppercase">User Styles</div>
             <ColorInput label="Background" value={theme.userBubbleBg} onChange={(e) => updateTheme('userBubbleBg', e.target.value)} />
             <ColorInput label="Text Color" value={theme.userBubbleText} onChange={(e) => updateTheme('userBubbleText', e.target.value)} />
          </div>
        </Section>
        
        <Section title="Components">
          <ColorInput label="Input Field Fill" value={theme.inputBarBg} onChange={(e) => updateTheme('inputBarBg', e.target.value)} />
          <ColorInput label="Send Button" value={theme.sendButtonBg} onChange={(e) => updateTheme('sendButtonBg', e.target.value)} />
          <ColorInput label="Icon Color" value={theme.sendButtonIconColor} onChange={(e) => updateTheme('sendButtonIconColor', e.target.value)} />
          <ColorInput label="Loading Spinner" value={theme.loadingColor} onChange={(e) => updateTheme('loadingColor', e.target.value)} />
        </Section>
      </div>
    </div>
  );
};

export default ChatFlowColorPanel;
