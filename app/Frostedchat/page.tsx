
"use client"
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Palette, Bot, ArrowLeft, Check, Loader2 } from 'lucide-react';
import FrostedColorPanel from './components/FrostedColorPanel';
import FrostedStylePanel from './components/FrostedStylePanel';
import AgentPanel from '../../components/AgentPanel';
import FrostedPreview from './components/FrostedPreview';
import { ThemeConfig, AgentConfig } from '../../types';
import { saveAgent, fetchPublicAgent } from '../../services/firebaseService';

const FrostedChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { agentId } = useParams<{ agentId: string }>();
  const [activeTab, setActiveTab] = useState<'design' | 'agent'>('design');
  const [isSaving, setIsSaving] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [theme, setTheme] = useState<ThemeConfig>({
    fontFamily: 'Inter',
    borderRadius: 'rounded-[2rem]',
    containerShape: 'rounded',
    chatBg: '#ffffff',
    headerStyle: 'Frosted',
    headerBg: 'linear-gradient(135deg, #2563eb 0%, #9333ea 50%, #ec4899 100%)',
    headerColor1: '#2563eb',
    headerColor2: '#9333ea',
    headerColor3: '#ec4899',
    headerText: '#ffffff',
    headerAlignment: 'left',
    showStatusIndicator: false,
    footerStyle: 'Minimal',
    footerBg: '#ffffff',
    inputBarStyle: 'Modern',
    inputBarBg: '#f8fafc',
    inputBarText: '#1e293b',
    inputPlaceholder: 'Reply ...',
    sendButtonStyle: 'Frosted Circle',
    sendButtonBg: '#4f46e5',
    sendButtonIconColor: '#ffffff',
    responseCardStyle: 'Classic',
    botBubbleBg: '#f1f5f9',
    botBubbleText: '#334155',
    userBubbleBg: '#4f46e5',
    userBubbleText: '#ffffff',
    loadingStyle: 'Three Dots',
    loadingColor: '#6366f1',
    showLauncher: true,
    launcherBg: '#4f46e5',
    launcherIconColor: '#ffffff',
    launcherTagBg: '#1e293b',
    launcherTagText: '#ffffff',
    welcomeMessage: "A live chat interface that allows for seamless, natural communication.",
    showWelcomeBubbles: true,
    suggestedQuestions: ["How can I help?", "Pricing", "Features"]
  });

  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    model: 'gemini-3-flash-preview',
    systemInstruction: 'You are a professional assistant in a high-end frosted UI environment. Be helpful and elegant.',
    knowledgeBase: '',
    temperature: 0.7,
    crawledUrls: []
  });

  // Sync headerBg when individual gradient colors change
  useEffect(() => {
    if (theme.headerColor1 && theme.headerColor2 && theme.headerColor3) {
      const newGradient = `linear-gradient(135deg, ${theme.headerColor1} 0%, ${theme.headerColor2} 50%, ${theme.headerColor3} 100%)`;
      if (theme.headerBg !== newGradient) {
        setTheme(prev => ({ ...prev, headerBg: newGradient }));
      }
    }
  }, [theme.headerColor1, theme.headerColor2, theme.headerColor3]);

  useEffect(() => {
    const loadExistingAgent = async () => {
      if (!agentId) {
        setIsInitialLoading(false);
        return;
      }
      try {
        const data = await fetchPublicAgent(agentId);
        if (data) {
          if (data.theme) setTheme(prev => ({ ...prev, ...data.theme }));
          if (data.agentConfig) setAgentConfig(prev => ({ ...prev, ...data.agentConfig }));
        }
      } catch (err) {
        console.error("Failed to load existing frosted agent:", err);
      } finally {
        setIsInitialLoading(false);
      }
    };
    loadExistingAgent();
  }, [agentId]);

  const handlePublish = async () => {
    if (!agentId) return;
    setIsSaving(true);
    try {
      await saveAgent(agentId, {
        name: 'Frosted AI Unit',
        type: 'frosted',
        theme,
        agentConfig
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/my-agents');
      }, 1500);
    } catch (err) {
      alert("Error saving agent unit.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black animate-pulse shadow-2xl">F</div>
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.3em]">
          <Loader2 className="w-4 h-4 animate-spin" /> Calibrating Optics...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#fcfcfd] flex flex-col text-slate-900 overflow-hidden font-sans">
      <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate('/agent-widgets')} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
           </button>
           <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black shadow-sm">F</div>
              <span className="font-black text-sm tracking-tight uppercase text-slate-800">Frosted Builder</span>
           </div>
        </div>
        
        <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-2xl p-1">
          <button
            onClick={() => setActiveTab('design')}
            className={`flex items-center gap-2 px-6 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'design' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" /> Optics
          </button>
          <button
            onClick={() => setActiveTab('agent')}
            className={`flex items-center gap-2 px-6 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'agent' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5" /> Neural
          </button>
        </div>

        <div className="flex items-center gap-3">
           <button 
             onClick={handlePublish}
             disabled={isSaving}
             className={`px-8 py-2.5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2 min-w-[120px] justify-center ${saveSuccess ? 'bg-emerald-600 shadow-emerald-500/20' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/10'}`}
           >
              {isSaving ? 'Syncing...' : saveSuccess ? <><Check className="w-3.5 h-3.5 stroke-[3px]" /> Ready</> : 'Deploy Unit'}
           </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        <div className="flex w-full h-full">
            {activeTab === 'design' ? (
                <FrostedColorPanel theme={theme} setTheme={setTheme} />
            ) : (
                <div className="hidden lg:block w-12 bg-white border-r border-slate-200"></div>
            )}
            
            <div className="flex-1 bg-slate-50 relative overflow-hidden flex items-center justify-center p-8">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                
                <div className="relative z-10 w-[420px] h-[650px] transition-all duration-700">
                   <FrostedPreview theme={theme} agentConfig={agentConfig} />
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-xl border border-slate-200 px-6 py-3 rounded-full shadow-xl">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Preview Engine Active</span>
                   </div>
                   <div className="h-4 w-px bg-slate-200"></div>
                   <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700">Refine Colors</button>
                </div>
            </div>

            {activeTab === 'design' ? (
                <FrostedStylePanel theme={theme} setTheme={setTheme} />
            ) : (
                <AgentPanel config={agentConfig} setConfig={setAgentConfig} />
            )}
        </div>
      </main>
    </div>
  );
};

export default FrostedChatPage;
