
"use client"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  MessageSquare, 
  Mic, 
  Trash2, 
  Globe, 
  Copy, 
  CheckCircle2, 
  ArrowUpRight, 
  Bot,
  Calendar,
  Clock,
  ChevronLeft,
  Code,
  X,
  Check,
  Zap,
  Layout,
  MoreVertical,
  Activity
} from 'lucide-react';
import { fetchAgents, removeAgent } from '../../services/firebaseService';

const MyAgentsPage = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'chat' | 'voice'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState<any>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    const loadAgents = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAgents();
        setAgents(data);
      } catch (err) {
        console.error("Failed to load agents", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadAgents();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Confirm deletion of this AI agent?")) {
      await removeAgent(id);
      setAgents(prev => prev.filter(a => a.id !== id));
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredAgents = agents.filter(agent => {
    const name = agent.name || 'Untitled Agent';
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || agent.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getEmbedCode = (agent: any) => {
    const baseUrl = window.location.origin;
    const agentId = agent.id;
    const isVoice = agent.type === 'voice';

    if (isVoice) {
      return `<!-- BotForge Voice Agent Widget Box -->
<iframe 
  src="${baseUrl}/embed/${agentId}?mode=chat" 
  width="400" 
  height="500" 
  style="border:none; border-radius:32px; box-shadow:0 20px 50px rgba(0,0,0,0.1); position:fixed; bottom:24px; right:24px; z-index:999999;" 
  allow="microphone" 
  allowtransparency="true">
</iframe>`;
    }

    return `<!-- BotForge Chat AI Agent Deployment Code -->
<iframe id="botforge-launcher" src="${baseUrl}/embed/${agentId}?mode=launcher" style="position:fixed; bottom:0; right:0; width:350px; height:200px; border:none; z-index:999999; background:transparent;" allowtransparency="true"></iframe>
<iframe id="botforge-chat" src="${baseUrl}/embed/${agentId}?mode=chat" style="position:fixed; bottom:20px; right:20px; width:450px; height:700px; border:none; z-index:999998; background:transparent; display:none; border-radius:24px; box-shadow:0 10px 50px rgba(0,0,0,0.2);" allowtransparency="true"></iframe>
<script>
  window.addEventListener('message', function(e) {
    const launcher = document.getElementById('botforge-launcher');
    const chat = document.getElementById('botforge-chat');
    if (e.data.type === 'BOTFORGE_OPEN') { chat.style.display = 'block'; launcher.style.display = 'none'; }
    if (e.data.type === 'BOTFORGE_CLOSE') { chat.style.display = 'none'; launcher.style.display = 'block'; }
  }, false);
</script>`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <nav className="h-16 bg-white/70 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <button 
             onClick={() => navigate('/dashboard')}
             className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-all rounded-lg hover:bg-slate-50"
           >
             <ChevronLeft className="w-4 h-4" /> Dashboard
           </button>
           <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-sm shadow-sm">B</div>
              <h1 className="font-extrabold text-sm tracking-tight text-slate-800">Agent Library</h1>
           </div>
        </div>
        
        <button 
          onClick={() => navigate('/agent-widgets')}
          className="px-6 py-2 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10 active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Forge Intelligence
        </button>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-8 md:p-12 relative z-10">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 mb-16">
           <div className="space-y-1">
             <h2 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">Your <span className="text-blue-600">Workspace</span></h2>
             <p className="text-slate-400 font-medium text-sm">Deploy and manage your fleet of high-performance AI agents.</p>
           </div>
           
           <div className="flex flex-col md:flex-row gap-4">
             <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  type="text" 
                  placeholder="Filter agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all shadow-sm placeholder:text-slate-400"
                />
             </div>
             
             <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                {['all', 'chat', 'voice'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setFilter(t as any)}
                    className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${filter === t ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
           </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[400px] bg-slate-50 rounded-[2.5rem] border border-slate-100 animate-pulse"></div>
            ))}
          </div>
        ) : filteredAgents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 animate-[slideUp_0.4s_ease-out]">
            {filteredAgents.map((agent) => (
              <div 
                key={agent.id} 
                className="group relative flex flex-col bg-white rounded-[2.5rem] border border-slate-200 p-8 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 cursor-pointer overflow-hidden shadow-sm"
              >
                 <div className="flex justify-between items-start mb-8">
                    <div 
                      onClick={() => navigate(agent.type === 'voice' ? `/voiceflow/${agent.id}` : `/chatflow/${agent.id}`)}
                      className={`p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 shadow-sm ${agent.type === 'voice' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}
                    >
                       {agent.type === 'voice' ? <Mic className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                    </div>
                    
                    <div className="flex flex-col gap-2 items-end">
                       <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${agent.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full inline-block mr-1.5 ${agent.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                          {agent.status}
                       </span>
                    </div>
                 </div>

                 <div className="mb-8" onClick={() => navigate(agent.type === 'voice' ? `/voiceflow/${agent.id}` : `/chatflow/${agent.id}`)}>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">{agent.name}</h3>
                    <p className="text-xs text-slate-400 font-semibold line-clamp-2 leading-relaxed h-8 mb-4">
                       {agent.agentConfig?.systemInstruction || "Ready to assist with your operational tasks."}
                    </p>
                    <div 
                      onClick={(e) => { e.stopPropagation(); copyToClipboard(`${window.location.origin}/embed/${agent.id}`, agent.id); }}
                      className="inline-flex items-center gap-2.5 px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-all w-full"
                    >
                       <Globe className="w-3.5 h-3.5 text-blue-500" />
                       <span className="truncate flex-1 font-mono tracking-tighter">.../embed/{agent.id}</span>
                       {copiedId === agent.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100" />}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                           <Calendar className="w-3 h-3" /> Deployed
                        </div>
                        <div className="text-[11px] font-black text-slate-700">{agent.createdDate}</div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                           <Activity className="w-3 h-3 text-blue-500" /> Calls
                        </div>
                        <div className="text-[11px] font-black text-slate-700">{agent.messagesCount || 0} hits</div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                    <div className="flex gap-2">
                       <button 
                         onClick={(e) => { e.stopPropagation(); setShowEmbedModal(agent); }}
                         className="p-3 bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-2xl border border-slate-100 transition-all"
                       >
                         <Code className="w-4.5 h-4.5" />
                       </button>
                       <button 
                         onClick={(e) => handleDelete(e, agent.id)}
                         className="p-3 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl border border-slate-100 transition-all"
                       >
                          <Trash2 className="w-4.5 h-4.5" />
                       </button>
                    </div>
                    
                    <button 
                      onClick={() => navigate(agent.type === 'voice' ? `/voiceflow/${agent.id}` : `/chatflow/${agent.id}`)}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10 active:scale-95"
                    >
                      Configure <ArrowUpRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 bg-slate-50/50 rounded-[4rem] border border-dashed border-slate-200">
             <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                <Bot className="w-10 h-10 text-slate-200" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 mb-2">Workspace Empty</h3>
             <p className="text-slate-400 text-sm mb-10 font-semibold">You haven't forged any agents yet.</p>
             <button 
                onClick={() => navigate('/agent-widgets')}
                className="px-10 py-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-105 transition-all"
              >
                Create First Agent
             </button>
          </div>
        )}
      </main>

      {/* Embed Modal */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-[3rem] p-12 relative animate-[slideUp_0.3s_ease-out] shadow-2xl">
            <button 
              onClick={() => setShowEmbedModal(null)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors p-3 bg-slate-50 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-6 mb-10">
               <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border shadow-sm ${showEmbedModal.type === 'voice' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                  {showEmbedModal.type === 'voice' ? <Mic className="w-8 h-8" /> : <Code className="w-8 h-8" />}
               </div>
               <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    {showEmbedModal.type === 'voice' ? 'Voice Agent Unit' : 'Deployment Code'}
                  </h2>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
                    {showEmbedModal.type === 'voice' ? 'Voice Agent Unit Deployment Code' : 'SaaS-Grade Integration Snippet'}
                  </p>
               </div>
            </div>

            <div className="space-y-6">
               <div className="bg-slate-950 rounded-[2rem] p-8 relative">
                  <div className="flex justify-between items-center mb-6">
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       {showEmbedModal.type === 'voice' ? 'Voice Widget Box (Recommended)' : 'Main Script Block'}
                     </span>
                     <button 
                       onClick={() => {
                         navigator.clipboard.writeText(getEmbedCode(showEmbedModal));
                         setCodeCopied(true);
                         setTimeout(() => setCodeCopied(false), 2000);
                       }}
                       className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 text-white ${showEmbedModal.type === 'voice' ? 'bg-purple-600 hover:bg-purple-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                     >
                        {codeCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {codeCopied ? 'Copied' : 'Copy Code'}
                     </button>
                  </div>
                  <pre className={`text-[11px] font-mono bg-black/40 rounded-2xl p-6 overflow-x-auto max-h-60 custom-scrollbar leading-relaxed ${showEmbedModal.type === 'voice' ? 'text-purple-300/60' : 'text-blue-300/60'}`}>
                     {getEmbedCode(showEmbedModal)}
                  </pre>
               </div>

               <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-200">
                  <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-3">Implementation Instructions</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                    Paste this code before the closing <code className="text-blue-600">&lt;/body&gt;</code> tag of your website. 
                    {showEmbedModal.type === 'voice' 
                      ? " The widget is now a standalone unit. Just place the iframe where you want it to appear (default is bottom-right)." 
                      : " The dual-iframe architecture ensures your core site performance remains untouched."}
                  </p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAgentsPage;
