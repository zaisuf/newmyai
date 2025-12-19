
"use client"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Lock, Eye, Scale } from 'lucide-react';

const GDPRPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 font-sans selection:bg-blue-100 pb-20">
      <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">C</div>
            <span className="font-black text-lg tracking-tighter uppercase text-slate-800">ChatiFicial</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-16 animate-slideUp">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> Compliance Standard
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">GDPR Commitment</h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            How we protect your data and ensure your privacy rights under the General Data Protection Regulation.
          </p>
        </div>

        <div className="space-y-12">
          <section className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black tracking-tight">Data Protection</h2>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed mb-4">
              ChatiFicial is committed to the security and privacy of our users' data. We implement state-of-the-art encryption and security protocols to ensure that all information processed through our AI agents remains confidential and protected.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Eye, title: "Right to Access", text: "You have the right to request copies of your personal data." },
              { icon: RefreshCw, title: "Right to Rectification", text: "You can request that we correct any information you believe is inaccurate." },
              { icon: Scale, title: "Right to Erasure", text: "Also known as the 'Right to be Forgotten', you can request data deletion." },
              { icon: ShieldCheck, title: "Data Portability", text: "You have the right to request your data in a structured, readable format." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm hover:border-blue-500/30 transition-all">
                <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6 group-hover:text-blue-600 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </section>

          <section className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-xl overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-xl font-black mb-4">Contact Data Protection Officer</h2>
              <p className="text-slate-400 font-medium mb-6">If you have any questions regarding your data privacy or wish to exercise your rights, please reach out to our DPO.</p>
              <button className="px-6 py-3 bg-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all">
                privacy@chatificial.ai
              </button>
            </div>
            <ShieldCheck className="absolute top-1/2 right-[-5%] -translate-y-1/2 w-48 h-48 opacity-[0.03] pointer-events-none" />
          </section>
        </div>
      </main>
    </div>
  );
};

const RefreshCw = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
);

export default GDPRPage;
