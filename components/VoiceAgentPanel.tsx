
import React, { useState } from 'react';
import { VoiceAgentConfig } from '../types';
import { 
  Mic, Zap, ChevronDown, BookOpen, 
  Globe, Search, Loader2, CheckCircle2, AlertCircle,
  FileText
} from 'lucide-react';

interface VoiceAgentPanelProps {
  config: VoiceAgentConfig;
  setConfig: React.Dispatch<React.SetStateAction<VoiceAgentConfig>>;
}

const VoiceAgentPanel: React.FC<VoiceAgentPanelProps> = ({ config, setConfig }) => {
  const [activeTab, setActiveTab] = useState<'config' | 'instruction' | 'knowledge'>('config');
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlStatus, setCrawlStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const updateConfig = (key: keyof VoiceAgentConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleCrawlSitemap = async () => {
    if (!sitemapUrl.trim()) return;
    setIsCrawling(true);
    setCrawlStatus('idle');

    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(sitemapUrl)}`);
      const data = await response.json();
      if (!data.contents) throw new Error("No content");

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data.contents, "text/xml");
      const locTags = xmlDoc.getElementsByTagName("loc");
      
      const discoveredUrls: string[] = [];
      for (let i = 0; i < locTags.length; i++) {
        const url = locTags[i].textContent;
        if (url) discoveredUrls.push(url);
      }

      if (discoveredUrls.length === 0) {
        const lines = data.contents.split(/\r?\n/);
        const textUrls = lines.filter((l: string) => l.trim().startsWith('http')).map((l: string) => l.trim());
        if (textUrls.length > 0) discoveredUrls.push(...textUrls);
      }

      if (discoveredUrls.length > 0) {
        updateConfig('crawledUrls', discoveredUrls);
        setCrawlStatus('success');
        const timestamp = new Date().toLocaleString();
        const crawlText = `\n--- Voice Sitemap Crawl (${timestamp}) ---\nSource: ${sitemapUrl}\nFound ${discoveredUrls.length} pages.\n--------------------------------\n`;
        updateConfig('knowledgeBase', (config.knowledgeBase || '') + crawlText);
      } else {
        setCrawlStatus('error');
      }
    } catch (err) {
      setCrawlStatus('error');
    } finally {
      setIsCrawling(false);
    }
  };

  const modelOptions = [
    { id: 'google/gemini-2.0-flash-001', label: 'Gemini 2.0 Flash' },
    { id: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
    { id: 'openai/gpt-4o', label: 'GPT-4o' },
    { id: 'deepseek/deepseek-chat', label: 'DeepSeek Chat' }
  ];

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col z-10 animate-[fadeInRight_0.3s_ease-out] shadow-sm">
      <div className="h-14 flex items-center justify-between px-5 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="text-[10px] font-black text-gray-800 tracking-widest uppercase flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-600" />
          Voice Intelligence
        </h2>
      </div>

      <div className="flex border-b border-gray-100 bg-gray-50/50 p-1 m-3 rounded-xl">
        {[
          { id: 'config', label: 'Voice', icon: Mic },
          { id: 'instruction', label: 'Behavior', icon: FileText },
          { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-purple-600 shadow-sm border border-gray-200' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        {activeTab === 'config' && (
          <div className="space-y-6">
            <div>
               <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 block px-1">OpenRouter Model</label>
               <div className="relative group">
                  <select
                      value={config.model}
                      onChange={(e) => updateConfig('model', e.target.value)}
                      className="w-full bg-white text-gray-800 rounded-lg py-2.5 px-3 text-xs font-semibold border border-gray-200 focus:outline-none appearance-none cursor-pointer shadow-sm"
                  >
                      {modelOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
               </div>
            </div>

            <div>
               <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 block px-1">Voice Persona</label>
               <div className="relative group">
                  <select
                      value={config.voiceId}
                      onChange={(e) => updateConfig('voiceId', e.target.value)}
                      className="w-full bg-white text-gray-800 rounded-lg py-2.5 px-3 text-xs font-semibold border border-gray-200 focus:outline-none appearance-none cursor-pointer shadow-sm"
                  >
                      <option value="alloy">Alloy (Neutral)</option>
                      <option value="echo">Echo (Male)</option>
                      <option value="shimmer">Shimmer (Clear)</option>
                      <option value="nova">Nova (Soft)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
               </div>
            </div>
            
            <div>
               <div className="flex justify-between text-[10px] text-gray-500 mb-2 font-bold uppercase tracking-wider">
                  <span>Speed</span>
                  <span className="text-purple-600 font-black">{config.speed}x</span>
               </div>
               <input type="range" min="0.5" max="2" step="0.1" value={config.speed} onChange={(e) => updateConfig('speed', parseFloat(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none accent-purple-600" />
            </div>
          </div>
        )}

        {activeTab === 'instruction' && (
          <div className="space-y-4">
             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Voice System Instructions</div>
             <textarea
               value={config.systemInstruction}
               onChange={(e) => updateConfig('systemInstruction', e.target.value)}
               className="w-full h-40 bg-gray-50 text-gray-700 rounded-xl p-3 text-xs font-medium border border-gray-200 focus:outline-none resize-none shadow-inner"
               placeholder="Instructions for tone and persona..."
             />
             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mt-2">First Interaction</div>
             <textarea
               value={config.firstMessage}
               onChange={(e) => updateConfig('firstMessage', e.target.value)}
               className="w-full h-20 bg-gray-50 text-gray-700 rounded-xl p-3 text-xs font-medium border border-gray-200 focus:outline-none resize-none shadow-inner"
               placeholder="Greeting..."
             />
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="space-y-6">
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                 <Globe className="w-3.5 h-3.5 text-purple-600" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-purple-700">Web Importer</span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="https://site.com/sitemap.xml"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  className="flex-1 min-w-0 bg-white border border-purple-200 rounded-lg px-3 py-2 text-[10px] font-medium focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                />
                <button 
                  onClick={handleCrawlSitemap}
                  disabled={isCrawling || !sitemapUrl}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50"
                >
                  {isCrawling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                </button>
              </div>

              {crawlStatus === 'success' && config.crawledUrls && (
                <div className="mt-3 space-y-2">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 uppercase">
                         <CheckCircle2 className="w-3 h-3" /> Indexed {config.crawledUrls.length} Pages
                      </div>
                      <button onClick={() => setCrawlStatus('idle')} className="text-[9px] text-gray-400 hover:text-gray-600 font-bold uppercase">Reset</button>
                   </div>
                   <div className="max-h-24 overflow-y-auto bg-white/50 rounded-lg p-2 border border-purple-100 custom-scrollbar">
                      {config.crawledUrls.map((url, i) => (
                        <div key={url + i} className="text-[8px] font-mono text-gray-500 truncate mb-1">
                          {i + 1}. {url}
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {crawlStatus === 'error' && (
                <div className="mt-2 text-[9px] font-bold text-red-500 uppercase flex items-center gap-1">
                   <AlertCircle className="w-3 h-3" /> Fetch Failed
                </div>
              )}
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block px-1">Raw Context</span>
              <textarea
                value={config.knowledgeBase}
                onChange={(e) => updateConfig('knowledgeBase', e.target.value)}
                className="w-full h-40 bg-gray-50 text-gray-700 rounded-xl p-4 text-[11px] font-medium border border-gray-200 focus:outline-none resize-none shadow-inner"
                placeholder="Business docs..."
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-5 border-t border-gray-100 bg-white">
        <button className="w-full py-3.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-gray-800 transition-all active:scale-[0.98]">
            Deploy Unit
        </button>
      </div>
    </div>
  );
};

export default VoiceAgentPanel;
