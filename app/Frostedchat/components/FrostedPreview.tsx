
import React, { useState, useRef, useEffect } from 'react';
import { ThemeConfig, AgentConfig, ChatMessage } from '../../../types';
import { Send, X, Smile, Paperclip, MoreHorizontal } from 'lucide-react';
import { sendMessageToGemini } from '../../../services/geminiService';

interface FrostedPreviewProps {
  theme: ThemeConfig;
  agentConfig?: AgentConfig;
  onClose?: () => void;
}

const FrostedPreview: React.FC<FrostedPreviewProps> = ({ theme, agentConfig, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'user', text: 'Hello, how are you doing?', timestamp: new Date() },
    { role: 'model', text: "I'm doing well, thank you! How can I help you today?", timestamp: new Date() },
    { role: 'user', text: 'I have a question about the return policy for a product I purchased.', timestamp: new Date() }
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(
        input,
        agentConfig?.model || 'gemini-3-flash-preview',
        agentConfig?.systemInstruction,
        agentConfig?.temperature
      );
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'Communication error. Check API.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden relative bg-white"
      style={{ borderRadius: theme.borderRadius || '2rem' }}
    >
      {/* Header - The iconic frosted gradient */}
      <div 
        className="p-8 pt-10 relative overflow-hidden shrink-0"
        style={{ background: theme.headerBg }}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 0%, transparent 40%)' }}></div>
        <div className="relative z-10 flex items-start justify-between">
           <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-600 font-black text-xl shadow-xl">C</div>
              <div>
                <h2 className="text-3xl font-black text-white tracking-tighter leading-none">ChatFlow</h2>
                <p className="text-white/80 text-xs font-semibold mt-2 leading-relaxed max-w-[200px]">
                  {theme.welcomeMessage || "A live chat interface that allows for seamless communication."}
                </p>
              </div>
           </div>
           <button onClick={onClose} className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all">
              <X className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-2 mb-2">
               {msg.role === 'model' && (
                 <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=model" alt="bot" className="w-full h-full object-cover" />
                 </div>
               )}
               <span className={`text-[10px] font-black uppercase tracking-widest text-slate-400 ${msg.role === 'user' ? 'hidden' : ''}`}>Assistant</span>
            </div>
            
            <div 
              className={`p-4 text-sm leading-relaxed max-w-[85%] shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-[20px] rounded-tr-none' 
                  : 'bg-slate-100 text-slate-700 rounded-[20px] rounded-tl-none'
              }`}
            >
               {msg.text}
            </div>
            
            <div className={`mt-2 text-[9px] font-bold text-slate-300 uppercase tracking-widest ${msg.role === 'user' ? 'mr-1' : 'ml-1'}`}>
               {idx === messages.length - 1 ? 'Just Now' : '08:16 AM'}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100 animate-pulse bg-slate-100"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assistant</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl rounded-tl-none flex gap-1.5 items-center">
               <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer / Input Area */}
      <div className="p-6 border-t border-slate-100 bg-white">
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-2 pl-4">
           <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Smile className="w-5 h-5" />
           </button>
           <input 
             type="text" 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             placeholder="Reply ..."
             className="flex-1 bg-transparent border-none text-sm font-medium text-slate-700 placeholder-slate-400 focus:ring-0 outline-none"
           />
           <button className="text-slate-300 hover:text-slate-500 transition-colors">
              <Paperclip className="w-4 h-4" />
           </button>
           <button 
             onClick={handleSend}
             disabled={!input.trim()}
             className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
           >
              <Send className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default FrostedPreview;
