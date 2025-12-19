
import React from 'react';
import { VoiceThemeConfig } from '../types';
import { Image as ImageIcon, Upload, Palette, Sparkles } from 'lucide-react';

interface VoiceDesignPanelProps {
  theme: VoiceThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<VoiceThemeConfig>>;
}

const ColorInput = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="group flex items-center justify-between py-3 px-1 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-sm">
    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-900 transition-colors">{label}</span>
    <div className="flex items-center gap-3">
      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wide">
        {value}
      </span>
      <div className="relative w-8 h-5 rounded-md overflow-hidden ring-1 ring-gray-200 group-hover:ring-gray-300 transition-all shadow-sm">
        <div className="absolute inset-0" style={{ backgroundColor: value }} />
        <input
          type="color"
          value={value.startsWith('#') ? value : '#000000'}
          onChange={onChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </div>
    </div>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4 px-1">
      <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        {title}
      </h3>
    </div>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const VoiceDesignPanel: React.FC<VoiceDesignPanelProps> = ({ theme, setTheme }) => {
  const updateTheme = (key: keyof VoiceThemeConfig, value: any) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const handleAvatarUpload = () => {
    const randomSeed = Math.floor(Math.random() * 1000);
    updateTheme('agentAvatar', `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`);
  };

  return (
    <div className="w-80 h-full bg-white border-r border-gray-200 flex flex-col z-10 shadow-sm animate-[fadeInLeft_0.3s_ease-out]">
      <div className="h-14 flex items-center px-5 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="text-xs font-bold text-gray-800 tracking-wide uppercase flex items-center gap-2">
          <Palette className="w-4 h-4 text-purple-600" /> Pill Design
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <Section title="Physical Appearance">
           <div className="mb-6 p-4 bg-purple-50 rounded-2xl border border-purple-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-700">Neumorphic Style</span>
                 </div>
                 <input 
                   type="checkbox" 
                   checked={theme.triggerStyle === 'Minimal' /* Using minimal as proxy for special style for now */} 
                   onChange={(e) => updateTheme('triggerStyle', e.target.checked ? 'Minimal' : 'Floating')}
                   className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                 />
              </div>
              <p className="text-[9px] text-purple-900/40 font-bold uppercase tracking-widest">Enables soft-UI shadows and depth</p>
           </div>

           <ColorInput label="Widget Base" value={theme.widgetBg} onChange={(e) => updateTheme('widgetBg', e.target.value)} />
           <ColorInput label="Button Accent" value={theme.buttonBg} onChange={(e) => updateTheme('buttonBg', e.target.value)} />
           <ColorInput label="Button Text" value={theme.buttonTextColor} onChange={(e) => updateTheme('buttonTextColor', e.target.value)} />
           <ColorInput label="Icon Shade" value={theme.buttonIconColor} onChange={(e) => updateTheme('buttonIconColor', e.target.value)} />
        </Section>

        <Section title="Avatar Configuration">
           <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white flex items-center justify-center shadow-md shrink-0">
                 {theme.agentAvatar ? (
                    <img src={theme.agentAvatar} alt="Avatar" className="w-full h-full object-cover" />
                 ) : (
                    <ImageIcon className="w-5 h-5 text-gray-300" />
                 )}
              </div>
              <button 
                 onClick={handleAvatarUpload}
                 className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-gray-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-purple-600 hover:border-purple-200 transition-all shadow-sm active:scale-95"
              >
                 <Upload className="w-3 h-3" /> Update Profile
              </button>
           </div>
        </Section>
        
        <Section title="Shape & Dimensions">
           <div className="space-y-6 px-1">
              <div>
                <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                   <span>Outer Roundedness</span>
                   <span className="text-purple-600">{theme.widgetBorderRadius}</span>
                </div>
                <input 
                   type="range" min="0" max="40" value={parseInt(theme.widgetBorderRadius)} 
                   onChange={(e) => updateTheme('widgetBorderRadius', `${e.target.value}px`)}
                   className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                   <span>Button Roundedness</span>
                   <span className="text-purple-600">{theme.buttonBorderRadius}</span>
                </div>
                <input 
                   type="range" min="0" max="24" value={parseInt(theme.buttonBorderRadius)} 
                   onChange={(e) => updateTheme('buttonBorderRadius', `${e.target.value}px`)}
                   className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
           </div>
        </Section>

        <Section title="Global Theme">
           <ColorInput label="Primary Tone" value={theme.primaryColor} onChange={(e) => updateTheme('primaryColor', e.target.value)} />
           <ColorInput label="Surface Background" value={theme.backgroundColor} onChange={(e) => updateTheme('backgroundColor', e.target.value)} />
           <ColorInput label="Typography" value={theme.textColor} onChange={(e) => updateTheme('textColor', e.target.value)} />
        </Section>
      </div>
    </div>
  );
};

export default VoiceDesignPanel;
