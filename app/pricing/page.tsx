
"use client"
import React, { useState } from 'react';
import { Check, X, ArrowRight, Sparkles, ShieldCheck, Zap, Globe, Cpu, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      price: isAnnual ? '0' : '0',
      description: 'For individuals and hackers exploring AI boundaries.',
      features: [
        '1 Published Agent Unit',
        '1,000 Messages / mo',
        'Basic Analytics Dashboard',
        'Standard Support',
        'ChatiFicial Branding'
      ],
      cta: 'Start for Free',
      highlight: false,
      color: 'slate'
    },
    {
      name: 'Pro',
      price: isAnnual ? '24' : '29',
      description: 'The standard for startups scaling their AI fleet.',
      features: [
        '5 Published Agent Units',
        'Unlimited Messages',
        'Advanced Neural Reasoning',
        'Remove ChatiFicial Branding',
        'Custom Domain Mapping',
        'Priority API Access',
        'Email Support'
      ],
      cta: 'Upgrade to Pro',
      highlight: true,
      color: 'blue'
    },
    {
      name: 'Enterprise',
      price: isAnnual ? '89' : '99',
      description: 'Mission-critical infrastructure for large scale ops.',
      features: [
        '25 Published Agent Units',
        'Dedicated Compute Nodes',
        'Custom Knowledge Hubs',
        'SSO & SAML Security',
        'White-label Experience',
        '99.9% SLA Guarantee',
        'Dedicated Account Manager'
      ],
      cta: 'Contact Sales',
      highlight: false,
      color: 'slate'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* Decorative Blur Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-50 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 h-20 border-b border-slate-100 flex items-center justify-between px-8 md:px-16 backdrop-blur-md bg-white/80 sticky top-0">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-white shadow-xl shadow-slate-900/10 transition-transform hover:scale-105">C</div>
          <span className="font-black text-xl tracking-tighter uppercase text-slate-800">ChatiFicial</span>
        </div>
        <div className="flex gap-8 items-center">
          <button onClick={() => navigate('/')} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Home</button>
          <button onClick={() => navigate('/dashboard')} className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">Dashboard</button>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-40 px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-24 animate-[slideUp_0.6s_ease-out]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-current" /> Transparent Infrastructure
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900 leading-[0.9]">
            Scale with <br/>
            <span className="text-blue-600">Pure Intelligence.</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
            Engineered for high-performance AI units. No complexity. Just the power you need to automate your world.
          </p>

          {/* Toggle Billing */}
          <div className="flex items-center justify-center gap-6">
            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${!isAnnual ? 'text-slate-900' : 'text-slate-300'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-16 h-8 bg-slate-100 rounded-full p-1 relative transition-all hover:bg-slate-200 border border-slate-200 shadow-inner"
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md border border-slate-100 transition-transform duration-300 transform ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`}></div>
            </button>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isAnnual ? 'text-slate-900' : 'text-slate-300'}`}>Yearly</span>
              <span className="px-2 py-0.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-md animate-pulse">Save 20%</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch mb-40">
          {plans.map((plan, i) => (
            <div 
              key={plan.name}
              className={`p-10 rounded-[3rem] border flex flex-col transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.04)] animate-[slideUp_0.8s_ease-out] relative overflow-hidden group
                ${plan.highlight ? 'bg-white border-blue-600 border-2 scale-[1.03] shadow-2xl shadow-blue-500/5 z-10' : 'bg-white border-slate-100 shadow-sm hover:border-blue-200'}
              `}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {plan.highlight && (
                <div className="absolute top-6 right-6">
                   <div className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                      Top Performer
                   </div>
                </div>
              )}

              <div className="mb-12">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 group-hover:text-blue-600 transition-colors">
                  {plan.name} Core
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-slate-900 tracking-tighter">${plan.price}</span>
                  <span className="text-slate-400 font-bold text-sm">/ mo</span>
                </div>
                <p className="mt-6 text-sm font-semibold text-slate-500 leading-relaxed min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-5 mb-12 flex-1">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-4 text-sm font-bold text-slate-600">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${plan.highlight ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    </div>
                    <span className="leading-tight pt-0.5">{feat}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`w-full py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-slate-900/5
                  ${plan.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-900 text-white hover:bg-slate-800'}
                `}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Audit / Comparison */}
        <div className="max-w-5xl mx-auto animate-[slideUp_1s_ease-out]">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Capabilities Audit</h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] mt-4">Fine-grained infrastructure control</p>
          </div>
          
          <div className="bg-white border border-slate-100 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200/40">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="py-8 pl-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">Enterprise Feature</th>
                  <th className="py-8 px-6 text-[11px] font-black text-slate-800 text-center uppercase tracking-widest">Starter</th>
                  <th className="py-8 px-6 text-[11px] font-black text-blue-600 text-center uppercase tracking-widest">Pro</th>
                  <th className="py-8 px-6 text-[11px] font-black text-slate-800 text-center uppercase tracking-widest">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Max AI Units Deployed', starter: '1', pro: '5', enterprise: '25' },
                  { name: 'Monthly Inference Quota', starter: '1k', pro: 'Unlimited', enterprise: 'Unlimited' },
                  { name: 'Neural Context Size', starter: '10MB', pro: '500MB', enterprise: '2GB+' },
                  { name: 'Real-time Voice Latency', starter: '400ms', pro: '40ms', enterprise: '40ms (Priority)' },
                  { name: 'Custom Domain Mapping', starter: false, pro: true, enterprise: true },
                  { name: 'API Key Whitelabeling', starter: false, pro: false, enterprise: true },
                  { name: 'SSO & Identity Sync', starter: false, pro: false, enterprise: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-8 pl-12 text-sm font-bold text-slate-700">{row.name}</td>
                    <td className="py-8 px-6 text-sm text-center text-slate-500 font-semibold">
                      {typeof row.starter === 'boolean' ? 
                        (row.starter ? <Check className="w-5 h-5 mx-auto text-emerald-500" /> : <X className="w-5 h-5 mx-auto text-slate-200" />) : row.starter}
                    </td>
                    <td className="py-8 px-6 text-sm text-center text-blue-600 font-black">
                      {typeof row.pro === 'boolean' ? 
                        (row.pro ? <Check className="w-5 h-5 mx-auto text-blue-600" /> : <X className="w-5 h-5 mx-auto text-slate-200" />) : row.pro}
                    </td>
                    <td className="py-8 px-6 text-sm text-center text-slate-800 font-bold">
                      {typeof row.enterprise === 'boolean' ? 
                        (row.enterprise ? <Check className="w-5 h-5 mx-auto text-slate-900" /> : <X className="w-5 h-5 mx-auto text-slate-200" />) : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Social Proof / Trust */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 text-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex flex-col items-center gap-3">
                <ShieldCheck className="w-10 h-10" />
                <span className="text-[10px] font-black uppercase tracking-widest">SOC2 Type II</span>
             </div>
             <div className="flex flex-col items-center gap-3">
                <Globe className="w-10 h-10" />
                <span className="text-[10px] font-black uppercase tracking-widest">GDPR Ready</span>
             </div>
             <div className="flex flex-col items-center gap-3">
                <Cpu className="w-10 h-10" />
                <span className="text-[10px] font-black uppercase tracking-widest">NVIDIA H100s</span>
             </div>
             <div className="flex flex-col items-center gap-3">
                <Users className="w-10 h-10" />
                <span className="text-[10px] font-black uppercase tracking-widest">10k+ Builders</span>
             </div>
          </div>

          <div className="mt-32 p-12 bg-slate-900 text-white rounded-[4rem] border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="relative z-10 max-w-lg">
              <h4 className="text-3xl font-black mb-4 tracking-tighter leading-none">Custom AI Workspace?</h4>
              <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8">
                Need isolated clusters, custom LLM fine-tuning, or specific data residency? Our solutions team builds for elite performance.
              </p>
              <button className="px-10 py-4 bg-white text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center gap-4">
                Inquire Enterprise <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative z-10 w-full md:w-auto flex justify-center">
               <div className="w-40 h-40 bg-blue-600/20 rounded-full blur-3xl absolute animate-pulse"></div>
               <Cpu className="w-24 h-24 text-blue-600 relative z-10 animate-bounce shadow-2xl" />
            </div>
            {/* Visual background noise */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center font-black text-white text-xs">C</div>
            <span className="font-black text-sm tracking-tighter uppercase text-slate-800">ChatiFicial</span>
          </div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">© 2025 ChatiFicial Labs. Pure Intelligence Secured.</p>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
