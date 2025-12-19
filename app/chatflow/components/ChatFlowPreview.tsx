
import React, { useState, useRef, useEffect } from 'react';
import { ThemeConfig, AgentConfig, ChatMessage } from '../../../types';
import { Send, ChevronDown, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../../../services/geminiService';

interface ChatFlowPreviewProps {
  theme: Partial<ThemeConfig>;
  agentConfig?: Partial<AgentConfig>;
  onClose?: () => void;
}

const ChatFlowPreview: React.FC<ChatFlowPreviewProps> = (props) => {
  const { 
    theme = {} as Partial<ThemeConfig>, 
    agentConfig = {} as Partial<AgentConfig>, 
    onClose 
  } = props;

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: theme.welcomeMessage || 'Hello! How can I help you today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(
        textToSend,
        agentConfig?.model || 'gemini-3-flash-preview',
        agentConfig?.systemInstruction,
        agentConfig?.temperature
      );

      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Chat Preview Error:", error);
      
      let errorMessage = "Service unavailable. Please check your connection.";
      if (error?.message?.includes('API_KEY')) {
        errorMessage = "API Key error. Please verify your environment variables.";
      }

      const errorMsg: ChatMessage = { role: 'model', text: errorMessage, timestamp: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const getHeaderClasses = () => {
    if (theme.headerStyle === 'Hide') return 'hidden';
    let shape = theme.headerStyle === 'Rounded' ? 'rounded-xl' : theme.headerStyle === 'Circle' ? 'rounded-full' : 'rounded-none';
    const align = theme.headerAlignment === 'center' ? 'justify-center' : 'justify-between';
    return `p-4 flex items-center ${align} shadow-sm transition-all duration-300 shrink-0 ${shape} relative`;
  };

  const getInputStyles = () => {
    const base = "flex-1 outline-none text-sm transition-all";
    if (theme.inputBarStyle === 'Modern') return `${base} rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5`;
    if (theme.inputBarStyle === 'Minimal') return `${base} border-b border-gray-200 bg-transparent px-2 py-2`;
    if (theme.inputBarStyle === 'Neumorphic') {
      return `${base} rounded-2xl border-none px-4 py-2.5 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]`;
    }
    return `${base} rounded-lg border border-gray-100 bg-gray-50 px-4 py-2.5`;
  };

  const getResponseCardClasses = (role: 'user' | 'model') => {
     let base = "max-w-[85%] p-3.5 text-sm leading-relaxed shadow-sm transition-all duration-300";
     if (theme.responseCardStyle === 'Glassmorphism') base += " backdrop-blur-md border border-white/20";
     if (theme.responseCardStyle === 'Card') base += " border border-gray-100 shadow-md";
     return base;
  };

  return (
    <div className={`flex flex-col w-full h-full max-h-full overflow-hidden border border-gray-100 bg-white shadow-2xl
          ${theme.containerShape === 'rounded' ? 'rounded-3xl' : 'rounded-none'}
         `}
         style={{ 
           backgroundColor: theme.chatBg || '#ffffff', 
           fontFamily: theme.fontFamily || 'sans-serif' 
         }}>
      
      {theme.headerStyle !== 'Hide' && (
        <div className={getHeaderClasses()} style={{ backgroundColor: theme.headerBg || '#ffffff', color: theme.headerText || '#000000' }}>
          <div className={`flex items-center gap-3 ${theme.headerAlignment === 'center' ? 'flex-col text-center' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden border-2 border-white/50 shadow-sm shrink-0">
              <img src={theme.launcherLogoUrl || "https://api.dicebear.com/7.x/bottts/svg?seed=bot"} alt="bot" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-xs tracking-tight">AI Assistant</h3>
              {theme.showStatusIndicator !== false && (
                <div className={`flex items-center gap-1.5 ${theme.headerAlignment === 'center' ? 'justify-center' : ''}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest">Active Now</p>
                </div>
              )}
            </div>
          </div>
          {onClose && theme.headerAlignment !== 'center' && (
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.2s_ease-out]`}>
            <div 
              className={getResponseCardClasses(msg.role)}
              style={{
                backgroundColor: msg.role === 'user' ? (theme.userBubbleBg || '#111827') : (theme.botBubbleBg || '#f3f4f6'),
                color: msg.role === 'user' ? (theme.userBubbleText || '#ffffff') : (theme.botBubbleText || '#1f2937'),
                borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '4px 20px 20px 20px'
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {messages.length === 1 && Array.isArray(theme.suggestedQuestions) && theme.suggestedQuestions.length > 0 && (
          <div className="flex flex-col items-start gap-2 mt-4 px-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
               <Sparkles className="w-3 h-3" /> Quick Starters
            </div>
            <div className="flex flex-wrap gap-2">
              {theme.suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-xs font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none animate-pulse">
               <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-4 transition-all shrink-0 ${theme.footerStyle === 'Rounded' ? 'rounded-xl m-2' : ''}`}>
        <div className="flex gap-2 items-center w-full">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={theme.inputPlaceholder || 'Type a message...'}
            className={getInputStyles()}
            style={{ 
              color: theme.inputBarText || '#1f2937', 
              backgroundColor: theme.inputBarBg || '#f3f4f6'
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-50 shrink-0 w-11 h-11 shadow-sm rounded-xl"
            style={{ backgroundColor: theme.sendButtonBg || '#111827' }}
          >
            <Send className="w-4 h-4" style={{ color: theme.sendButtonIconColor || '#ffffff' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatFlowPreview;
