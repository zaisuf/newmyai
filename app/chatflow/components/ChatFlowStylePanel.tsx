
import React, { useState } from 'react';
import { ThemeConfig } from '../../../types';
import { ChevronDown, Sparkles, Plus, Trash2, Layout } from 'lucide-react';

interface ChatFlowStylePanelProps {
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

const GridSelect = ({ label, value, onChange, options }: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
}) => (
  <div className="mb-6">
    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">{label}</div>
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            px-3 py-2 text-xs font-semibold rounded-lg border transition-all duration-200
            ${value === opt.value 
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700'
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
  <div className="mb-6">
    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">{label}</div>
    <div className="relative group">
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-white text-gray-800 rounded-lg py-2.5 px-3 text-xs font-semibold border border-gray-200 hover:border-gray-300 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronDown className="w-3 h-3" />
      </div>
    </div>
  </div>
);

const Divider = () => <div className="h-px bg-gray-100 my-6 mx-1" />;

const ChatFlowStylePanel: React.FC<ChatFlowStylePanelProps> = ({ theme, setTheme }) => {
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
    <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col z-10 shadow-sm">
      <div className="h-14 flex items-center justify-between px-5 border-b border-gray-200 bg-white sticky top-0 z-10">
         <h2 className="text-xs font-bold text-gray-800 tracking-wide uppercase flex items-center gap-2">
          <Layout className="w-4 h-4 text-blue-600" /> Style & Layout
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <div className="mb-8">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-1">Header Configuration</div>
          <div className="space-y-4">
            <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                <button 
                  onClick={() => updateTheme('headerAlignment', 'left')}
                  className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-all ${theme.headerAlignment === 'left' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Left
                </button>
                <button 
                  onClick={() => updateTheme('headerAlignment', 'center')}
                  className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-all ${theme.headerAlignment === 'center' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Center
                </button>
            </div>
            
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-gray-700">Online Status</span>
              <input 
                 type="checkbox" 
                 checked={theme.showStatusIndicator} 
                 onChange={(e) => updateTheme('showStatusIndicator', e.target.checked)}
                 className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <GridSelect 
            label="Header Style"
            value={theme.headerStyle} 
            onChange={(val) => updateTheme('headerStyle', val)}
            options={[
              { label: 'Frosted', value: 'Frosted' },
              { label: 'Rounded', value: 'Rounded' },
              { label: 'Square', value: 'Square' },
              { label: 'Circle', value: 'Circle' },
              { label: 'Hidden', value: 'Hide' },
            ]}
          />

        <Divider />

        <div className="mb-8 bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-[10px] font-black uppercase tracking-widest">Starter Questions</h3>
          </div>
          
          <div className="space-y-3">
             <div className="flex gap-2">
                <input 
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addStarterQuestion()}
                  className="flex-1 bg-white border border-blue-100 rounded-lg p-2 text-xs font-medium focus:outline-none shadow-sm"
                  placeholder="Ask about pricing..."
                />
                <button 
                  onClick={addStarterQuestion}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                   <Plus className="w-4 h-4" />
                </button>
             </div>

             <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {theme.suggestedQuestions.map((q, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/60 p-2 rounded-lg border border-blue-50 group">
                    <span className="text-[10px] font-medium text-gray-600 truncate flex-1 pr-2">{q}</span>
                    <button onClick={() => removeStarterQuestion(i)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {theme.suggestedQuestions.length === 0 && (
                  <p className="text-[10px] text-gray-400 italic text-center py-2">No starters added yet.</p>
                )}
             </div>
          </div>
        </div>

        <Divider />

        <SelectInput 
            label="Input Bar Design"
            value={theme.inputBarStyle} 
            onChange={(e) => updateTheme('inputBarStyle', e.target.value)}
            options={[
              { label: 'Classic Box', value: 'Classic' },
              { label: 'Modern Pill', value: 'Modern' },
              { label: 'Underline Only', value: 'Minimal' },
              { label: 'Neumorphic', value: 'Neumorphic' },
            ]}
          />

        <Divider />

        <SelectInput 
            label="Bot Response Card"
            value={theme.responseCardStyle} 
            onChange={(e) => updateTheme('responseCardStyle', e.target.value)}
            options={[
              { label: 'Standard Bubble', value: 'Classic' },
              { label: 'Glassmorphism', value: 'Glassmorphism' },
              { label: 'Modern Card', value: 'Card' },
              { label: 'Minimal', value: 'Minimal' },
            ]}
          />

        <SelectInput 
            label="Loading Animation"
            value={theme.loadingStyle} 
            onChange={(e) => updateTheme('loadingStyle', e.target.value)}
            options={[
              { label: 'Bouncing Dots', value: 'Three Dots' },
              { label: 'Spinner', value: 'Spinner' },
              { label: 'Pulse', value: 'Pulse' },
            ]}
          />
      </div>
    </div>
  );
};

export default ChatFlowStylePanel;
