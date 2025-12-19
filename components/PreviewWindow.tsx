
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ThemeConfig, AgentConfig, ChatMessage } from '../types';
import { Send, ChevronDown, Sparkles, Key, AlertCircle, ExternalLink, RefreshCw, Bot } from 'lucide-react';
import { sendMessageToLLM } from '../services/llmService';
import ResponseRenderer from './responce-formet/responseRenderer';

interface PreviewWindowProps {
  theme: Partial<ThemeConfig>;
  agentConfig?: Partial<AgentConfig>;
  onClose?: () => void;
}

const PreviewWindow: React.FC<PreviewWindowProps> = (props) => {
  const { 
    theme = {} as Partial<ThemeConfig>, 
    agentConfig = {} as Partial<AgentConfig>, 
    onClose 
  } = props;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [needsKey, setNeedsKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message. Prefer an API key passed in the agent config or Vite env.
  useEffect(() => {
    const init = async () => {
      const keyFromAgent = agentConfig?.apiKey;
      const keyFromEnv = typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_OPENROUTER_API_KEY : undefined;

      // Do not force the platform key UI in embed/preview — rely on agent/env key or show errors on send.
      setNeedsKey(false);
      setMessages([{
        role: 'model',
        text: theme.welcomeMessage || 'Hello! I am your AI assistant. How can I help today?',
        timestamp: new Date()
      }]);

      // If you'd like to prompt users to link a platform key, you can enable detection of window.aistudio here.
    };

    init();
  }, [theme.welcomeMessage, agentConfig?.apiKey]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleConnectKey = async () => {
    // @ts-ignore
    await window.aistudio.openSelectKey();
    // Proceed immediately as per race condition rules
    setNeedsKey(false);
    setMessages([{ 
      role: 'model', 
      text: theme.welcomeMessage || 'OpenRouter connection successful. Ready to assist.', 
      timestamp: new Date() 
    }]);
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const activeModel = agentConfig?.model || (typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_OPENROUTER_DEFAULT_MODEL : undefined) || 'google/gemini-2.0-flash-001';

      const envKey = typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_OPENROUTER_API_KEY : undefined;
      const responseText = await sendMessageToLLM(
        textToSend,
        activeModel,
        agentConfig?.systemInstruction,
        agentConfig?.temperature,
        agentConfig?.knowledgeBase,
        // pass apiKey from agent config or Vite env (no process.env in client)
        agentConfig?.apiKey || envKey || undefined
      );

      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Chat Interaction Fault:", error);
      
      if (error?.message === 'API_KEY_MISSING' || error?.message === 'API_KEY_UNAUTHORIZED') {
        setNeedsKey(true);
      } else {
        const errorMsg: ChatMessage = { 
          role: 'model', 
          text: `Error: ${error.message || "OpenRouter connection failed."}`, 
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, errorMsg]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getHeaderClasses = () => {
    if (theme.headerStyle === 'Hide') return 'hidden';
    let shape = theme.headerStyle === 'Rounded' ? 'rounded-xl' : theme.headerStyle === 'Circle' ? 'rounded-full' : 'rounded-none';
    const align = theme.headerAlignment === 'center' ? 'justify-center' : 'justify-between';
    return `p-5 flex items-center ${align} shadow-sm border-b border-gray-100 transition-all duration-300 shrink-0 ${shape} relative`;
  };

  const getInputStyles = () => {
    const base = "flex-1 outline-none text-sm font-medium transition-all duration-200";
    if (theme.inputBarStyle === 'Modern') return `${base} rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm focus:border-blue-500/50`;
    if (theme.inputBarStyle === 'Minimal') return `${base} border-b border-gray-200 bg-transparent px-2 py-3 focus:border-blue-500`;
    if (theme.inputBarStyle === 'Neumorphic') {
      return `${base} rounded-2xl border-none px-5 py-3 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]`;
    }
    return `${base} rounded-xl border border-gray-200 bg-white px-4 py-3 focus:ring-2 focus:ring-blue-500/10`;
  };

  const getBubbleStyles = (role: 'user' | 'model') => {
    const isUser = role === 'user';
    let styles: React.CSSProperties = {
      backgroundColor: isUser ? (theme.userBubbleBg || '#111827') : (theme.botBubbleBg || '#f3f4f6'),
      color: isUser ? (theme.userBubbleText || '#ffffff') : (theme.botBubbleText || '#1f2937'),
      borderRadius: isUser ? '20px 20px 4px 20px' : '4px 20px 20px 20px',
      fontFamily: theme.fontFamily || 'Inter'
    };

    if (theme.responseCardStyle === 'Glassmorphism' && !isUser) {
       styles.backdropFilter = 'blur(12px)';
       styles.backgroundColor = 'rgba(255, 255, 255, 0.4)';
       styles.border = '1px solid rgba(255, 255, 255, 0.2)';
    }

    return styles;
  };

  if (needsKey) {
    return (
      <div className={`flex flex-col w-full h-full border border-gray-100 bg-white shadow-2xl items-center justify-center p-10 text-center
            ${theme.containerShape === 'rounded' ? 'rounded-[2.5rem]' : 'rounded-none'}`}
           style={{ backgroundColor: theme.chatBg || '#ffffff', fontFamily: theme.fontFamily || 'Inter' }}>
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-blue-100/50">
          <Bot className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">Connect OpenRouter</h3>
        <p className="text-sm text-slate-500 mb-10 max-w-[280px] font-medium leading-relaxed">
          To build and test your agents, select your OpenRouter API key from the platform dialog.
        </p>
        
        <button 
          onClick={handleConnectKey}
          className="w-full py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-3"
        >
          <Key className="w-4 h-4" /> Link API Key
        </button>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> Billing Documentation
          </a>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline"
          >
            <RefreshCw className="w-3 h-3" /> Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-full h-full max-h-full overflow-hidden border border-gray-100 bg-white shadow-2xl
          ${theme.containerShape === 'rounded' ? 'rounded-[2.5rem]' : 'rounded-none'}
         `}
         style={{ 
           backgroundColor: theme.chatBg || '#ffffff', 
           fontFamily: theme.fontFamily || 'Inter' 
         }}>
      
      {theme.headerStyle !== 'Hide' && (
        <div className={getHeaderClasses()} style={{ backgroundColor: theme.headerBg || '#ffffff', color: theme.headerText || '#000000' }}>
          <div className={`flex items-center gap-3 ${theme.headerAlignment === 'center' ? 'flex-col text-center' : ''}`}>
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center overflow-hidden border-2 border-white shadow-md shrink-0">
              <img src={theme.launcherLogoUrl || "https://api.dicebear.com/7.x/bottts/svg?seed=builder"} alt="bot" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-black text-sm tracking-tight leading-none mb-1">AI Assistant</h3>
              {theme.showStatusIndicator !== false && (
                <div className={`flex items-center gap-2 ${theme.headerAlignment === 'center' ? 'justify-center' : ''}`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">OpenRouter Live</p>
                </div>
              )}
            </div>
          </div>
          {onClose && theme.headerAlignment !== 'center' && (
            <button onClick={onClose} className="p-2.5 hover:bg-black/5 rounded-2xl transition-colors">
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      <div className="flex-1 p-6 overflow-y-auto space-y-5 custom-scrollbar bg-transparent">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[slideUp_0.3s_ease-out]`}>
            <div 
              className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-sm`}
              style={getBubbleStyles(msg.role)}
            >
              {msg.role === 'model' ? (
                <ResponseRenderer content={msg.text} textColor={(theme.botBubbleText as string) || '#1f2937'} accentColor={(theme.sendButtonBg as string) || '#111827'} />
              ) : (
                <div>{msg.text}</div>
              )}
            </div>
          </div>
        ))}
        
        {messages.length === 1 && Array.isArray(theme.suggestedQuestions) && theme.suggestedQuestions.length > 0 && (
          <div className="flex flex-col items-start gap-3 mt-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">
               <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Suggested Queries
            </div>
            <div className="flex flex-wrap gap-2">
              {theme.suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-5 py-2.5 bg-white border border-gray-200 text-slate-600 rounded-full text-xs font-bold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-3xl rounded-tl-none animate-pulse">
               <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-6 bg-transparent transition-all shrink-0 ${theme.footerStyle === 'Rounded' ? 'rounded-[2rem] m-2' : ''}`}>
        <div className="flex gap-3 items-center w-full">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={theme.inputPlaceholder || 'Talk to AI Assistant...'}
            className={getInputStyles()}
            style={{ 
              color: theme.inputBarText || '#1f2937', 
              backgroundColor: theme.inputBarBg || '#f3f4f6'
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-50 shrink-0 w-14 h-14 shadow-lg rounded-2xl"
            style={{ backgroundColor: theme.sendButtonBg || '#111827' }}
          >
            <Send className="w-5 h-5" style={{ color: theme.sendButtonIconColor || '#ffffff' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewWindow;
