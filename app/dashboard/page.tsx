
"use client"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LogOut, 
  Search, 
  Bell, 
  Bot, 
  MessageSquare, 
  BarChart3, 
  Users, 
  X, 
  Zap, 
  ArrowUpRight,
  Check,
  Sparkles,
  ShieldCheck,
  Mic,
  Activity,
  Database,
  Settings,
  HardDrive,
  Plus,
  Globe,
  Atom,
  ArrowUp
} from 'lucide-react';
import { fetchAgents } from '../../services/firebaseService';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAgents();
        setAgents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const totalMessages = agents.reduce((acc, curr) => acc + (curr.messagesCount || 0), 0);

  const plans = [
    {
      name: 'Starter',
      price: '0',
      description: 'Perfect for side projects and learning.',
      features: ['1 Published Agent', '1,000 Messages/mo', 'Basic Analytics', 'ChatiFicial Branding'],
      current: false
    },
    {
      name: 'Pro',
      price: '29',
      description: 'For startups and serious builders.',
      features: ['5 Published Agents', 'Unlimited Messages', 'Advanced Analytics', 'Remove Branding', 'Custom Domains'],
      current: true
    },
    {
      name: 'Business',
      price: '99',
      description: 'Scale your agency or enterprise.',
      features: ['20 Published Agents', 'Team Collaboration', 'SSO & SAML', 'White-label Option', 'SLA Guarantee'],
      current: false
    }
  ];

  const currentPlan = plans.find(p => p.current) || plans[0];

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex font-sans text-slate-900 selection:bg-blue-100 relative">
      {/* Sidebar - ChatiFicial Branded */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-40 transition-all duration-300">
        <div className="h-20 flex items-center px-6 border-b border-slate-100 cursor-pointer" onClick={() => navigate('/')}>
           <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20 shrink-0">C</div>
           <span className="hidden lg:block font-black text-xl tracking-tighter uppercase text-slate-800 ml-3">ChatiFicial</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4">
           {[
             { icon: LayoutDashboard, label: 'Overview', path: '/dashboard', active: true },
             { icon: Bot, label: 'My Agents', path: '/my-agents' },
             { icon: BarChart3, label: 'Analytics', path: '#' },
             { icon: Users, label: 'Workforce', path: '#' },
             { icon: Database, label: 'Data Base', path: '#' },
             { icon: Settings, label: 'Settings', path: '#' },
           ].map((item, idx) => (
             <button 
               key={idx}
               onClick={() => item.path !== '#' && navigate(item.path)}
               className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${item.active ? 'bg-blue-50 text-blue-600 border border-blue-100/50' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
             >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="hidden lg:block text-sm font-bold">{item.label}</span>
             </button>
           ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
           <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 p-3 text-slate-400 hover:text-red-600 transition-colors">
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="hidden lg:block text-sm font-bold">Sign Out</span>
           </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 ml-20 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
           <div>
             <h1 className="text-xl font-black text-slate-900 tracking-tight">System Terminal</h1>
             <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connection: Secure</p>
             </div>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200 focus-within:bg-white focus-within:shadow-sm transition-all">
                 <Search className="w-4 h-4 text-slate-400" />
                 <input type="text" placeholder="Search agents..." className="bg-transparent border-none text-xs font-medium focus:ring-0 w-40" />
              </div>
              <button 
                onClick={() => navigate('/agent-widgets')}
                className="hidden lg:flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                <Plus className="w-4 h-4" /> New Agent
              </button>
              <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
              </button>
              <div className="w-10 h-10 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden cursor-pointer shadow-sm">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=builder" alt="Avatar" className="w-full h-full object-cover" />
              </div>
           </div>
        </header>

        <div className="p-8 space-y-8 animate-slideUp">
           
           {/* Section 1: Hero Large Chat Input Box (The new main feature) */}
           <section className="w-full">
              <div 
                className="bg-[#0e0e0e] p-10 md:p-14 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden transition-all border border-white/5"
              >
                 <div className="relative z-10 flex flex-col gap-10">
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black tracking-tighter">Unified Agent Console</h2>
                       <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">Query your entire AI fleet from one interface</p>
                    </div>

                    {/* Input Area - Large Visual Style */}
                    <div className="w-full bg-[#1c1c1c] rounded-[2.5rem] p-6 md:p-8 border border-white/5 focus-within:border-blue-500/30 transition-all shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                       <textarea 
                          rows={2}
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="How can I help you today?"
                          className="w-full bg-transparent border-none resize-none text-white placeholder-slate-600 focus:ring-0 text-xl md:text-2xl font-medium outline-none px-2 mb-4"
                       />
                       
                       <div className="flex items-center justify-between border-t border-white/5 pt-6">
                          <div className="flex items-center gap-3">
                             <button className="p-3 bg-[#262626] hover:bg-[#333333] rounded-2xl transition-all border border-white/5 group">
                                <Plus className="w-6 h-6 text-slate-400 group-hover:text-white" />
                             </button>
                             <button className="flex items-center gap-2.5 px-5 py-3 bg-[#262626] hover:bg-[#333333] rounded-2xl transition-all border border-white/5 group">
                                <Globe className="w-4.5 h-4.5 text-slate-400 group-hover:text-blue-400" />
                                <span className="text-xs font-black uppercase tracking-widest text-slate-300">Web Search</span>
                             </button>
                             <button className="flex items-center gap-2.5 px-5 py-3 bg-[#262626] hover:bg-[#333333] rounded-2xl transition-all border border-white/5 group">
                                <Atom className="w-4.5 h-4.5 text-slate-400 group-hover:text-purple-400" />
                                <span className="text-xs font-black uppercase tracking-widest text-slate-300">Deep Think</span>
                             </button>
                          </div>
                          
                          <button className="w-14 h-14 bg-white hover:bg-blue-600 rounded-[1.5rem] flex items-center justify-center transition-all group active:scale-90 shadow-xl shadow-white/5">
                             <ArrowUp className="w-7 h-7 text-black group-hover:text-white transition-colors" />
                          </button>
                       </div>
                    </div>
                 </div>

                 {/* Subtle decorative background icons */}
                 <div className="absolute top-[-10%] right-[-5%] opacity-[0.03] pointer-events-none">
                    <Zap className="w-96 h-96" />
                 </div>
              </div>
           </section>

           {/* Section 2: Quick Status Bar */}
           <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col relative overflow-hidden group">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Aggregate Hits</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">{totalMessages.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-400">/ 25k</span>
                 </div>
                 <div className="absolute top-8 right-8 w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100">
                    <MessageSquare className="w-5 h-5" />
                 </div>
              </div>

              <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col relative overflow-hidden group">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Fleet Composition</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">{agents.length}</span>
                    <span className="text-xs font-bold text-slate-400">Deployed Units</span>
                 </div>
                 <div className="absolute top-8 right-8 w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 border border-purple-100">
                    <Bot className="w-5 h-5" />
                 </div>
              </div>

              {/* Current Plan Card with Upgrade Button */}
              <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col relative overflow-hidden group">
                 <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Plan</p>
                    <button 
                      onClick={() => setShowPlansModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10 active:scale-95 flex items-center gap-1.5"
                    >
                       <Zap className="w-3 h-3 fill-current" /> Upgrade
                    </button>
                 </div>
                 <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-blue-600 uppercase tracking-tight">{currentPlan.name} Tier</span>
                 </div>
                 <div className="absolute bottom-8 right-8 w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
              </div>
           </section>

           {/* Section 3: Fleet Monitor Row */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Operational Status</h2>
                 <button onClick={() => navigate('/my-agents')} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Manage All Units</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {isLoading ? (
                   [1,2,3].map(i => <div key={i} className="h-40 bg-white border border-slate-100 rounded-[2.5rem] animate-pulse"></div>)
                 ) : agents.length > 0 ? (
                   agents.slice(0, 6).map((agent) => (
                     <div key={agent.id} className="bg-white border border-slate-100 p-6 rounded-[2.5rem] hover:shadow-xl transition-all group shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${agent.type === 'voice' ? 'bg-purple-50 text-purple-600 border-purple-50' : 'bg-blue-50 text-blue-600 border-blue-50'}`}>
                              {agent.type === 'voice' ? <Mic className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                           </div>
                           <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                             agent.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                             'bg-slate-50 text-slate-400 border border-slate-100'
                           }`}>
                              {agent.status || 'Live'}
                           </span>
                        </div>

                        <h4 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors mb-auto">{agent.name}</h4>
                        
                        <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                           <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Throughput</p>
                              <p className="text-sm font-black text-slate-800">{agent.messagesCount || 0}</p>
                           </div>
                           <div className="flex gap-1 items-end h-8">
                              {[20, 50, 35, 70, 40, 90, 60].map((h, i) => (
                                 <div key={i} className="w-1 bg-slate-100 rounded-full" style={{ height: `${h}%` }}></div>
                              ))}
                           </div>
                        </div>
                     </div>
                   ))
                 ) : (
                   <div className="col-span-full py-20 text-center bg-white border border-dashed border-slate-200 rounded-[3.5rem]">
                      <Bot className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-sm font-bold text-slate-400">No agents detected in your fleet.</p>
                      <button onClick={() => navigate('/agent-widgets')} className="mt-6 px-10 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">Create First Unit</button>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </main>

      {/* Plans Modal */}
      {showPlansModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-6 animate-fadeIn">
          <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-[3rem] p-12 relative animate-slideUp shadow-2xl flex flex-col gap-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button 
              onClick={() => setShowPlansModal(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors p-3 bg-slate-50 rounded-full shadow-sm"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center max-w-2xl mx-auto">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-6">
                  <Sparkles className="w-3 h-3" /> Growth Infrastructure
               </div>
               <h2 className="text-4xl font-black text-slate-900 tracking-tight">Scale with <span className="text-blue-600">ChatiFicial.</span></h2>
               <p className="text-slate-400 font-semibold text-sm mt-3">Choose the infrastructure that matches your operational requirements.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {plans.map((plan) => (
                  <div 
                    key={plan.name}
                    className={`p-8 rounded-[2.5rem] border flex flex-col transition-all relative group ${
                      plan.current 
                        ? 'bg-blue-600 text-white border-blue-500 shadow-2xl shadow-blue-500/20 scale-105 z-10' 
                        : 'bg-white text-slate-900 border-slate-200 hover:border-blue-500/30 shadow-sm'
                    }`}
                  >
                     {plan.current && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border border-blue-100">
                           Current Plan
                        </div>
                     )}

                     <div className="mb-10">
                        <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${plan.current ? 'text-white/70' : 'text-slate-400'}`}>
                           {plan.name} Tier
                        </h3>
                        <div className="flex items-baseline gap-1">
                           <span className="text-5xl font-black tracking-tighter">${plan.price}</span>
                           <span className={`text-xs font-bold ${plan.current ? 'text-white/60' : 'text-slate-400'}`}>/mo</span>
                        </div>
                        <p className={`mt-4 text-xs font-semibold leading-relaxed ${plan.current ? 'text-white/80' : 'text-slate-500'}`}>
                           {plan.description}
                        </p>
                     </div>

                     <div className="space-y-4 mb-10 flex-1">
                        {plan.features.map((feat, i) => (
                           <div key={i} className="flex items-start gap-3">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                                plan.current ? 'bg-white/20 border-white/10 text-white' : 'bg-blue-50 border-blue-100 text-blue-600'
                              }`}>
                                 <Check className="w-3 h-3" />
                              </div>
                              <span className={`text-[11px] font-bold leading-tight ${plan.current ? 'text-white' : 'text-slate-600'}`}>
                                 {feat}
                              </span>
                           </div>
                        ))}
                     </div>

                     <button 
                       disabled={plan.current}
                       className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                         plan.current 
                           ? 'bg-white/10 text-white/50 cursor-default border border-white/10' 
                           : 'bg-slate-900 text-white hover:bg-slate-800'
                       }`}
                     >
                        {plan.current ? 'Active Terminal' : `Upgrade to ${plan.name}`}
                     </button>
                  </div>
               ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="text-sm font-black text-slate-800 tracking-tight">Enterprise Infrastructure</h4>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">SLA Guarantee & Dedicated Priority Compute</p>
                  </div>
               </div>
               <button className="px-8 py-3 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all text-slate-800 shadow-sm">
                  View Full Feature Audit
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
