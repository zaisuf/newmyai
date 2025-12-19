
import React, { useState } from 'react';
import { ThemeConfig } from '../types';
import { ChevronDown, Sparkles, Plus, Trash2, Layout, Type as TypeIcon, Layers } from 'lucide-react';

interface StylePanelProps {
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

const GridSelect = ({ label, value, onChange, options }: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
}) => (
  <div className="mb-8">
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">{label}</div>
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            px-3 py-3 text-[11px] font-bold rounded-xl border transition-all duration-300
            ${value === opt.value 
              ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/10' 
              : 'bg-white text-slate-500 border-slate-100 hover:border-blue-200 hover:text-slate-900'
            }
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

const SelectInput = ({ label, value, onChange, options }: { 
  label: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}) => (
  <div className="mb-8">
    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">{label}</div>
    <div className="relative group">
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-white text-slate-800 rounded-xl py-3 px-4 text-xs font-bold border border-slate-100 hover:border-blue-200 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer shadow-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  </div>
);

const Divider = () => <div className="h-px bg-slate-50 my-8 mx-1" />;

const StylePanel: React.FC<StylePanelProps> = ({ theme, setTheme }) => {
  const [newQuestion, setNewQuestion] = useState('');

  const updateTheme = (key: keyof ThemeConfig, value: any) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const addStarterQuestion = () => {
    if (!newQuestion.trim()) return;
    updateTheme('suggestedQuestions', [...theme.suggestedQuestions, newQuestion.trim()]);
    setNewQuestion('');
  };

  const removeStarterQuestion = (index: number) => {
    updateTheme('suggestedQuestions', theme.suggestedQuestions.filter((_, i) => i !== index));
  };

  return (
    <div className="w-80 h-full bg-white border-l border-slate-200 flex flex-col z-10 shadow-sm">
      <div className="h-14 flex items-center justify-between px-6 border-b border-slate-100 bg-white sticky top-0 z-10">
         <h2 className="text-[10px] font-black text-slate-800 tracking-[0.2em] uppercase flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-blue-600" /> Interface Forge
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {/* Font Selection */}
        <SelectInput 
          label="Global Font Family"
          value={theme.fontFamily}
          onChange={(e) => updateTheme('fontFamily', e.target.value)}
          options={[
            { label: 'Inter (Modern)', value: 'Inter' },
            { label: 'Roboto (Clean)', value: 'Roboto' },
            { label: 'Merriweather (Classic)', value: 'Merriweather' },
            { label: 'Monospace (Tech)', value: 'monospace' },
          ]}
        />

        <Divider />

        {/* Header Customization */}
        <div className="mb-8">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Header Configuration</div>
          <div className="space-y-4">
            <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100 shadow-inner">
                <button 
                  onClick={() => updateTheme('headerAlignment', 'left')}
                  className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${theme.headerAlignment === 'left' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Left
                </button>
                <button 
                  onClick={() => updateTheme('headerAlignment', 'center')}
                  className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${theme.headerAlignment === 'center' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Center
                </button>
            </div>
            
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-700">Online Indicator</span>
              <div className="relative inline-flex items-center cursor-pointer">
                <input 
                   type="checkbox" 
                   checked={theme.showStatusIndicator} 
                   onChange={(e) => updateTheme('showStatusIndicator', e.target.checked)}
                   className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </div>
          </div>
        </div>

        <GridSelect 
            label="Header Shape"
            value={theme.headerStyle} 
            onChange={(val) => updateTheme('headerStyle', val)}
            options={[
              { label: 'Pill', value: 'Circle' },
              { label: 'Rounded', value: 'Rounded' },
              { label: 'Flush', value: 'Square' },
              { label: 'Hidden', value: 'Hide' },
            ]}
          />

        <Divider />

        {/* Starter Questions */}
        <div className="mb-8 bg-blue-50/50 p-5 rounded-[2rem] border border-blue-100/50 shadow-sm">
          <div className="flex items-center gap-2 mb-5 text-blue-600">
            <Sparkles className="w-4 h-4 fill-current" />
            <h3 className="text-[10px] font-black uppercase tracking-widest">Query Starters</h3>
          </div>
          
          <div className="space-y-4">
             <div className="flex gap-2">
                <input 
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addStarterQuestion()}
                  className="flex-1 bg-white border border-blue-100/50 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm placeholder:text-slate-300"
                  placeholder="New prompt..."
                />
                <button 
                  onClick={addStarterQuestion}
                  className="w-12 h-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center active:scale-90"
                >
                   <Plus className="w-5 h-5 stroke-[3px]" />
                </button>
             </div>

             <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {theme.suggestedQuestions.map((q, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/80 p-3 rounded-xl border border-blue-50/50 group hover:border-blue-200 transition-all">
                    <span className="text-[10px] font-bold text-slate-600 truncate flex-1 pr-3">{q}</span>
                    <button onClick={() => removeStarterQuestion(i)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                       <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {theme.suggestedQuestions.length === 0 && (
                  <p className="text-[10px] text-slate-400 font-bold italic text-center py-4 uppercase tracking-widest">Workspace Empty</p>
                )}
             </div>
          </div>
        </div>

        <Divider />

        {/* Design Blocks */}
        <SelectInput 
            label="Input Bar Engine"
            value={theme.inputBarStyle} 
            onChange={(e) => updateTheme('inputBarStyle', e.target.value)}
            options={[
              { label: 'Modern Inset', value: 'Modern' },
              { label: 'Standard Box', value: 'Classic' },
              { label: 'Minimal Line', value: 'Minimal' },
              { label: 'Neumorphic Soft', value: 'Neumorphic' },
            ]}
          />

        <SelectInput 
            label="Response Card Aesthetic"
            value={theme.responseCardStyle} 
            onChange={(e) => updateTheme('responseCardStyle', e.target.value)}
            options={[
              { label: 'Floating Bubble', value: 'Classic' },
              { label: 'Glass Morphism', value: 'Glassmorphism' },
              { label: 'Shadowed Card', value: 'Card' },
              { label: 'Minimal Edge', value: 'Minimal' },
            ]}
          />

        <SelectInput 
            label="Thinking Animation"
            value={theme.loadingStyle} 
            onChange={(e) => updateTheme('loadingStyle', e.target.value)}
            options={[
              { label: 'Neural Dots', value: 'Three Dots' },
              { label: 'Core Spinner', value: 'Spinner' },
              { label: 'Pulse Wave', value: 'Pulse' },
            ]}
          />
      </div>
    </div>
  );
};

export default StylePanel;
