
import React, { useState } from 'react';
import { AgentConfig } from '../types';
import { 
  Brain, Zap, ChevronDown, BookOpen, 
  FileText, Globe, Plus, Trash2, AlertCircle 
} from 'lucide-react';

interface AgentPanelProps {
  config: AgentConfig;
  setConfig: React.Dispatch<React.SetStateAction<AgentConfig>>;
}

const AgentPanel: React.FC<AgentPanelProps> = ({ config, setConfig }) => {
  const [activeSubTab, setActiveSubTab] = useState<'llm' | 'instruction' | 'knowledge'>('llm');
  const [siteUrl, setSiteUrl] = useState('');

  const updateConfig = (key: keyof AgentConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleAddUrl = () => {
    if (!siteUrl.trim()) return;
    
    // Simple URL validation
    if (!siteUrl.startsWith('http')) {
        alert("Please enter a valid URL starting with http:// or https://");
        return;
    }

    const currentUrls = config.crawledUrls || [];
    if (currentUrls.includes(siteUrl.trim())) {
        setSiteUrl('');
        return;
    }

    const newUrls = [...currentUrls, siteUrl.trim()];
    updateConfig('crawledUrls', newUrls);
    
    // Add a log to the knowledge base text
    const crawlText = `\n--- Training URL Added ---\nSource: ${siteUrl.trim()}\n------------------------\n`;
    updateConfig('knowledgeBase', (config.knowledgeBase || '') + crawlText);
    
    setSiteUrl('');
  };

  const handleRemoveUrl = (index: number) => {
    const newUrls = (config.crawledUrls || []).filter((_, i) => i !== index);
    updateConfig('crawledUrls', newUrls);
  };

  const tabs = [
    { id: 'llm', label: 'Model', icon: Zap },
    { id: 'instruction', label: 'Instructions', icon: FileText },
    { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
  ];

  const modelOptions = [
    { group: 'Top Gemini Choices', models: [
      { id: 'google/gemini-2.0-flash-001', label: 'Gemini 2.0 Flash (Recommended)' },
      { id: 'google/gemini-2.0-pro-exp-02-05', label: 'Gemini 2.0 Pro (Exp)' },
      { id: 'google/gemini-flash-1.5', label: 'Gemini Flash 1.5' },
    ]},
    { group: 'Other High Performance', models: [
      { id: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
      { id: 'openai/gpt-4o', label: 'GPT-4o' },
      { id: 'deepseek/deepseek-chat', label: 'DeepSeek V3' },
      { id: 'openai/gpt-4o-mini', label: 'GPT-4o Mini' },
      { id: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B' },
    ]}
  ];

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col z-10 shadow-sm animate-[fadeInRight_0.3s_ease-out]">
      <div className="h-14 flex items-center justify-between px-5 border-b border-gray-200 bg-white sticky top-0 z-20">
        <h2 className="text-[10px] font-black text-gray-800 tracking-widest uppercase flex items-center gap-2">
          <Brain className="w-4 h-4 text-blue-600" />
          Agent Configuration
        </h2>
      </div>

      <div className="flex border-b border-gray-100 bg-gray-50/50 p-1 m-3 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeSubTab === tab.id 
                ? 'bg-white text-blue-600 shadow-sm border border-gray-200' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-5 custom-scrollbar">
        {activeSubTab === 'llm' && (
          <div className="animate-[fadeIn_0.3s_ease-out] space-y-6">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Model Selection</div>
              <div className="relative group">
                <select
                  value={config.model}
                  onChange={(e) => updateConfig('model', e.target.value)}
                  className="w-full bg-white text-gray-800 rounded-lg py-2.5 px-3 text-xs font-semibold border border-gray-200 hover:border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer shadow-sm"
                >
                  {modelOptions.map((group) => (
                    <optgroup key={group.group} label={group.group}>
                      {group.models.map((model) => (
                        <option key={model.id} value={model.id}>{model.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">API Key (optional)</div>
              <div className="relative">
                <input
                  type="password"
                  value={config.apiKey || ''}
                  onChange={(e) => updateConfig('apiKey', e.target.value)}
                  placeholder="Paste OpenRouter API key (optional)"
                  className="w-full bg-white text-gray-800 rounded-lg py-2.5 px-3 text-xs font-semibold border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between text-[10px] text-gray-500 mb-2 font-bold uppercase tracking-wider">
                <span>Creativity</span>
                <span className="text-blue-600">{config.temperature}</span>
              </div>
              <input 
                type="range" min="0" max="2" step="0.1"
                value={config.temperature}
                onChange={(e) => updateConfig('temperature', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        )}

        {activeSubTab === 'instruction' && (
          <div className="animate-[fadeIn_0.3s_ease-out] space-y-4">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">System Prompt</div>
            <textarea
              value={config.systemInstruction}
              onChange={(e) => updateConfig('systemInstruction', e.target.value)}
              placeholder="You are a professional assistant..."
              className="w-full h-[320px] bg-gray-50 text-gray-700 rounded-xl p-4 text-xs font-medium border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none custom-scrollbar shadow-inner"
            />
          </div>
        )}

        {activeSubTab === 'knowledge' && (
          <div className="animate-[fadeIn_0.3s_ease-out] space-y-6">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                 <Globe className="w-3.5 h-3.5 text-blue-600" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Add Data Source</span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="https://example.com"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="flex-1 min-w-0 bg-white border border-blue-200 rounded-lg px-3 py-2 text-[10px] font-medium focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
                <button 
                  onClick={handleAddUrl}
                  disabled={!siteUrl}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {config.crawledUrls && config.crawledUrls.length > 0 && (
                <div className="mt-4 space-y-2">
                   <div className="text-[9px] font-bold text-blue-600 uppercase">Training Sources</div>
                   <div className="max-h-24 overflow-y-auto bg-white/50 rounded-lg p-2 border border-blue-100 custom-scrollbar">
                      {config.crawledUrls.map((url, i) => (
                        <div key={url + i} className="flex items-center justify-between gap-2 text-[8px] font-mono text-gray-500 mb-1 group">
                          <span className="truncate flex-1">{i + 1}. {url}</span>
                          <button 
                            onClick={() => handleRemoveUrl(i)}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Knowledge Base</span>
                 <button onClick={() => updateConfig('knowledgeBase', '')} className="text-[9px] font-bold text-gray-400 hover:text-red-500 uppercase">Clear All</button>
              </div>
              <textarea
                value={config.knowledgeBase}
                onChange={(e) => updateConfig('knowledgeBase', e.target.value)}
                placeholder="Paste business data or documentation here..."
                className="w-full h-[220px] bg-gray-50 text-gray-700 rounded-xl p-4 text-[11px] font-medium border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none custom-scrollbar shadow-inner"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5 border-t border-gray-100 bg-white">
        <button className="w-full py-3.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-gray-800 transition-all active:scale-[0.98]">
            Synchronize
        </button>
      </div>
    </div>
  );
};

export default AgentPanel;
