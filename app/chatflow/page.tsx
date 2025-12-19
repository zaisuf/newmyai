
"use client"
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Palette, Bot, ArrowLeft, Eye, Check, Loader2 } from 'lucide-react';
import ChatFlowColorPanel from './components/ChatFlowColorPanel';
import ChatFlowStylePanel from './components/ChatFlowStylePanel';
import AgentPanel from '../../components/AgentPanel';
import ChatFlowPreview from './components/ChatFlowPreview';
import { ThemeConfig, AgentConfig } from '../../types';
import { saveAgent, fetchPublicAgent } from '../../services/firebaseService';

const ChatFlowPage: React.FC = () => {
  const navigate = useNavigate();
  const { agentId } = useParams<{ agentId: string }>();
  const [activeTab, setActiveTab] = useState<'design' | 'agent'>('design');
  const [isSaving, setIsSaving] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [theme, setTheme] = useState<ThemeConfig>({
    fontFamily: 'Inter',
    borderRadius: 'rounded-xl',
    containerShape: 'rounded',
    chatBg: '#ffffff',
    headerStyle: 'Rounded',
    headerBg: '#ffffff',
    headerText: '#111827',
    headerAlignment: 'left',
    showStatusIndicator: true,
    footerStyle: 'Rounded',
    footerBg: 'transparent',
    inputBarStyle: 'Classic',
    inputBarBg: '#f3f4f6',
    inputBarText: '#1f2937',
    inputPlaceholder: '#9ca3af',
    sendButtonStyle: 'Black Solid',
    sendButtonBg: '#111827',
    sendButtonIconColor: '#ffffff',
    responseCardStyle: 'Classic',
    botBubbleBg: '#f3f4f6',
    botBubbleText: '#1f2937',
    userBubbleBg: '#111827',
    userBubbleText: '#ffffff',
    loadingStyle: 'Three Dots',
    loadingColor: '#6b7280',
    showLauncher: true,
    launcherBg: '#ef4444',
    launcherIconColor: '#ffffff',
    launcherTagBg: '#1f2937',
    launcherTagText: '#ffffff',
    welcomeMessage: "Hello! I'm your AI partner. How can I assist you today?",
    showWelcomeBubbles: true,
    suggestedQuestions: [
      "What can you do?",
      "How do I sign up?",
      "Pricing details"
    ]
  });

  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    model: 'gemini-3-flash-preview',
    systemInstruction: 'You are a helpful customer support assistant. Be polite and concise.',
    knowledgeBase: '',
    temperature: 0.7,
    crawledUrls: []
  });

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
        console.error("Failed to load existing agent data:", err);
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
        name: 'Chat Assistant Unit',
        type: 'chat',
        theme,
        agentConfig
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/my-agents');
      }, 1500);
    } catch (err) {
      console.error("Failed to save agent", err);
      alert("Error saving agent. Connection failed.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="h-screen w-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black animate-bounce shadow-xl">B</div>
        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
          <Loader2 className="w-4 h-4 animate-spin" /> Retrieving Configuration...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white flex flex-col text-gray-900 overflow-hidden font-sans">
      <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate('/agent-widgets')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
           </button>
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black shadow-sm">B</div>
              <span className="font-black text-lg tracking-tighter uppercase">BotForge</span>
           </div>
        </div>
        
        <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('design')}
            className={`flex items-center gap-2 px-5 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'design' ? 'bg-white text-blue-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            UI Design
          </button>
          <button
            onClick={() => setActiveTab('agent')}
            className={`flex items-center gap-2 px-5 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'agent' ? 'bg-white text-blue-600 shadow-sm border border-gray-200' : 'text-slate-500 hover:text-gray-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            Agent
          </button>
        </div>

        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
              <Eye className="w-4 h-4" /> Preview
           </button>
           <button 
             onClick={handlePublish}
             disabled={isSaving}
             className={`px-6 py-2 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2 min-w-[100px] justify-center ${saveSuccess ? 'bg-green-600 shadow-green-500/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'}`}
           >
              {isSaving ? 'Saving...' : saveSuccess ? <><Check className="w-3.5 h-3.5 stroke-[3px]" /> Saved</> : 'Publish'}
           </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative bg-gray-50/50">
        <div className="flex w-full h-full">
            {activeTab === 'design' ? (
                <ChatFlowColorPanel theme={theme} setTheme={setTheme} />
            ) : (
                <div className="hidden lg:block w-12 bg-white border-r border-gray-200"></div>
            )}
            <div className="flex-1 bg-gray-100 relative overflow-hidden flex items-center justify-center p-8">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                <div className="relative z-10 transition-transform duration-500 hover:scale-[1.01] w-[380px] h-[500px]">
                   <ChatFlowPreview theme={theme} agentConfig={agentConfig} />
                </div>
            </div>
            {activeTab === 'design' ? (
                <ChatFlowStylePanel theme={theme} setTheme={setTheme} />
            ) : (
                <AgentPanel config={agentConfig} setConfig={setAgentConfig} />
            )}
        </div>
      </main>
    </div>
  );
};

export default ChatFlowPage;
