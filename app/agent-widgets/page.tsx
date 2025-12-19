"use client"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Mic, 
  ArrowRight, 
  ChevronLeft, 
  Sparkles, 
  Bot, 
  X, 
  Check, 
  Zap, 
  Shield, 
  CreditCard 
} from 'lucide-react';

const AgentWidgetsPage = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<{ id: string, title: string, path: string, cost: string } | null>(null);

  const generateId = () => Math.random().toString(36).substring(2, 12);

  const agentTypes = [
    {
      id: 'chat',
      title: 'Chat Assistant',
      description: 'The industry standard for customer support and lead generation. Intelligent, fast, and fully brandable.',
      icon: MessageSquare,
      color: 'blue',
      path: '/chatflow',
      cost: '19',
      features: ['24/7 Support', 'Custom Branding', 'Lead Capture'],
      preview: (
        <div className="w-full h-full bg-gray-50 rounded-xl p-3 flex flex-col gap-2 overflow-hidden border border-gray-100 shadow-inner">
           <div className="flex gap-2 items-center mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-500 shadow-sm"></div>
              <div className="w-12 h-2 bg-gray-200 rounded"></div>
           </div>
           <div className="self-start bg-white border border-gray-100 p-2 rounded-lg rounded-tl-none shadow-sm max-w-[70%]">
              <div className="w-16 h-1 bg-gray-100 rounded mb-1"></div>
              <div className="w-12 h-1 bg-gray-100 rounded"></div>
           </div>
           <div className="self-end bg-blue-500 p-2 rounded-lg rounded-tr-none shadow-sm max-w-[70%]">
              <div className="w-14 h-1 bg-white/30 rounded"></div>
           </div>
           <div className="mt-auto h-5 bg-white border border-gray-100 rounded-full flex items-center px-2">
              <div className="w-full h-1 bg-gray-100 rounded"></div>
           </div>
        </div>
      )
    },
    {
      id: 'voice',
      title: 'Voice Assistant',
      description: 'The future of human-AI interaction. Real-time low-latency voice calls with native emotional intelligence.',
      icon: Mic,
      color: 'purple',
      path: '/voiceflow',
      cost: '49',
      features: ['Real-time Audio', 'Native Integration', 'Emotional AI'],
      preview: (
        <div className="w-full h-full bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center gap-3 overflow-hidden border border-gray-100 shadow-inner">
           <div className="relative">
              <div className="w-12 h-12 rounded-full bg-purple-500 animate-pulse flex items-center justify-center shadow-lg">
                 <Mic className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full border border-purple-300 animate-[ping_2s_linear_infinite]"></div>
           </div>
           <div className="flex items-center gap-1 h-4">
              {[20, 40, 30, 50, 20].map((h, i) => (
                <div key={i} className="w-1 bg-purple-400 rounded-full" style={{ height: `${h}%` }}></div>
              ))}
           </div>
           <div className="w-16 h-2 bg-gray-200 rounded"></div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[100px]"></div>
      </div>

      <nav className="relative z-20 h-16 border-b border-gray-100 flex items-center justify-between px-8 backdrop-blur-md bg-white/80">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" /> Dashboard
        </button>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-sm">B</div>
          <span className="font-extrabold text-sm tracking-tighter">BOTFORGE</span>
        </div>
        <div className="w-20"></div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-4">
            <Sparkles className="w-3 h-3" /> Step 2: Choose Interface
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Pick your agent's <span className="text-blue-600">modality.</span>
          </h1>
          <p className="text-gray-500 max-w-lg text-lg font-medium leading-relaxed">
            Every business needs a different touch. Select the modality that best fits your customer journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          {agentTypes.map((type) => (
            <div 
              key={type.id}
              onClick={() => setSelectedAgent({ id: type.id, title: type.title, path: type.path, cost: type.cost })}
              className="group relative flex flex-col bg-white border border-gray-200 rounded-[2.5rem] p-8 hover:border-blue-500 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden animate-[slideUp_0.5s_ease-out]"
            >
              <div className="flex justify-between items-start mb-10">
                <div className={`p-4 rounded-2xl bg-${type.color}-50 text-${type.color}-600 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-${type.color}-100`}>
                  <type.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active</span>
                  <div className={`w-1.5 h-1.5 rounded-full bg-${type.color}-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]`}></div>
                </div>
              </div>

              <div className="flex-1 mb-10">
                <h2 className="text-2xl font-bold mb-3">{type.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed font-medium line-clamp-2 mb-6">
                  {type.description}
                </p>
                <div className="w-full h-40 relative group-hover:scale-[1.02] transition-transform duration-500">
                   {type.preview}
                   <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                   <span className="text-lg font-bold">${type.cost}</span>
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">/ Month</span>
                </div>
                <div className={`w-10 h-10 rounded-full bg-${type.color}-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500`}>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div className={`absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity`}>
                 <Bot className="w-32 h-32 rotate-12" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedAgent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden animate-[slideUp_0.3s_ease-out] border border-gray-100 m-4">
            <div className="p-8 border-b border-gray-50 flex items-start justify-between bg-gradient-to-br from-gray-50 to-white">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-3">
                  <CreditCard className="w-3 h-3" /> Subscription Plan
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900">{selectedAgent.title}</h2>
                <p className="text-gray-500 text-sm mt-1 font-medium">Ready to deploy your next-gen {selectedAgent.id} agent.</p>
              </div>
              <button 
                onClick={() => setSelectedAgent(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
               <div className="flex items-baseline gap-2 mb-8 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <span className="text-5xl font-extrabold text-gray-900">${selectedAgent.cost}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">per month</span>
                    <span className="text-xs font-medium text-gray-400">Cancel anytime</span>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    "Gemini 3.0 Pro Intelligence",
                    "Custom UI & Themes",
                    "10,000 Messages/mo",
                    "Knowledge Base Uploads",
                    "Priority Low Latency",
                    "Team Collaboration"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                          <Check className="w-3 h-3" />
                       </div>
                       <span className="text-sm font-semibold text-gray-600">{feat}</span>
                    </div>
                  ))}
               </div>

               <div className="flex gap-4">
                 <button 
                    onClick={() => setSelectedAgent(null)}
                    className="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                 >
                    Later
                 </button>
                 <button 
                    onClick={() => {
                      const newId = generateId();
                      navigate(`${selectedAgent.path}/${newId}`);
                    }}
                    className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                 >
                    Customize Now <ArrowRight className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentWidgetsPage;