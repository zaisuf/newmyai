
import React, { useState } from 'react';
import { ThemeConfig } from '../../../types';
import { Layout, Sparkles, Plus, Trash2, Maximize, AlignLeft } from 'lucide-react';

interface FrostedStylePanelProps {
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

const FrostedStylePanel: React.FC<FrostedStylePanelProps> = ({ theme, setTheme }) => {
  const [newQuestion, setNewQuestion] = useState('');

  const updateTheme = (key: keyof ThemeConfig, value: any) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const addStarter = () => {
    if (!newQuestion.trim()) return;
    updateTheme('suggestedQuestions', [...theme.suggestedQuestions, newQuestion.trim()]);
    setNewQuestion('');
  };

  const removeStarter = (idx: number) => {
    updateTheme('suggestedQuestions', theme.suggestedQuestions.filter((_, i) => i !== idx));
  };

  return (
    <div className="w-80 h-full bg-white border-l border-slate-200 flex flex-col z-10 shadow-sm">
      <div className="h-14 flex items-center px-5 border-b border-slate-200 bg-white sticky top-0 z-20">
        <h2 className="text-xs font-bold text-gray-800 tracking-wide uppercase flex items-center gap-2">
          <Layout className="w-4 h-4 text-indigo-600" /> Frosted Architecture
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <div className="mb-8">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1 flex items-center gap-2">
              <AlignLeft className="w-3 h-3" /> Header Layout
           </div>
           <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button 
                onClick={() => updateTheme('headerAlignment', 'left')}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${theme.headerAlignment === 'left' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
              >
                Left
              </button>
              <button 
                onClick={() => updateTheme('headerAlignment', 'center')}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${theme.headerAlignment === 'center' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
              >
                Center
              </button>
           </div>
        </div>

        <div className="mb-8">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1 flex items-center gap-2">
              <Maximize className="w-3 h-3" /> Corner Geometry
           </div>
           <div className="grid grid-cols-2 gap-2">
              {[
                { l: 'Soft', v: 'rounded-[1.5rem]' },
                { l: 'Standard', v: 'rounded-[2rem]' },
                { l: 'Deep', v: 'rounded-[3rem]' },
                { l: 'Sharp', v: 'rounded-none' }
              ].map(opt => (
                <button 
                  key={opt.l}
                  onClick={() => updateTheme('borderRadius', opt.v)}
                  className={`px-3 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl border transition-all ${theme.borderRadius === opt.v ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                >
                  {opt.l}
                </button>
              ))}
           </div>
        </div>

        <div className="h-px bg-slate-50 my-8" />

        <div className="mb-8 bg-indigo-50/30 p-6 rounded-[2.5rem] border border-indigo-100/50">
           <div className="flex items-center gap-2 mb-6 text-indigo-600">
              <Sparkles className="w-4 h-4" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Neural Starters</h3>
           </div>
           
           <div className="space-y-4">
              <div className="flex gap-2">
                 <input 
                   type="text" 
                   value={newQuestion}
                   onChange={(e) => setNewQuestion(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && addStarter()}
                   placeholder="Ask about..."
                   className="flex-1 bg-white border border-indigo-100 rounded-xl px-4 py-2 text-xs font-bold focus:ring-4 focus:ring-indigo-500/5 outline-none shadow-sm transition-all"
                 />
                 <button 
                   onClick={addStarter}
                   className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-90 transition-all"
                 >
                    <Plus className="w-5 h-5" />
                 </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                 {theme.suggestedQuestions.map((q, i) => (
                    <div key={i} className="flex items-center justify-between bg-white border border-indigo-50 p-3 rounded-xl group shadow-sm">
                       <span className="text-[10px] font-bold text-slate-600 truncate flex-1">{q}</span>
                       <button 
                         onClick={() => removeStarter(i)}
                         className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all ml-2"
                       >
                          <Trash2 className="w-3.5 h-3.5" />
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="mt-12 flex items-center gap-3 p-4 bg-slate-900 rounded-[2rem] text-white">
           <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg"><Sparkles className="w-5 h-5" /></div>
           <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Frosted Preset</p>
              <p className="text-[10px] font-bold opacity-60">High-Fidelity Interaction Layer</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FrostedStylePanel;
