
"use client"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, Zap, ShieldCheck } from 'lucide-react';

const TermsPage = () => {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-[10px] font-black uppercase tracking-widest text-amber-600 mb-4">
            <Scale className="w-3.5 h-3.5" /> Legal Framework
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Terms of Service</h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            By using ChatiFicial, you agree to these conditions. Please read them carefully.
          </p>
        </div>

        <div className="space-y-12">
          <div className="grid md:grid-cols-3 gap-6">
             {[
               { icon: Zap, title: "Usage", text: "Fair use of AI resources." },
               { icon: ShieldCheck, title: "Safety", text: "No malicious bot behavior." },
               { icon: FileText, title: "Ownership", text: "You own your data & agents." }
             ].map((item, i) => (
               <div key={i} className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
                 <item.icon className="w-6 h-6 text-slate-900 mb-4" />
                 <h4 className="font-black text-sm mb-2">{item.title}</h4>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.text}</p>
               </div>
             ))}
          </div>

          <section className="space-y-6 text-slate-600 font-medium">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing or using the ChatiFicial platform, you agree to be bound by these Terms of Service. If you do not agree, you may not use the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">2. Account Responsibility</h2>
              <p className="leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. ChatiFicial cannot be held liable for any loss resulting from unauthorized access.
              </p>
            </div>

            <div>
               <h2 className="text-2xl font-black text-slate-900 mb-4">3. Prohibited Conduct</h2>
               <p className="leading-relaxed">
                 Users are prohibited from creating AI agents that engage in harassment, fraud, or the generation of illegal content. Any violation of this policy will result in immediate termination of the service.
               </p>
            </div>

            <div>
               <h2 className="text-2xl font-black text-slate-900 mb-4">4. Intellectual Property</h2>
               <p className="leading-relaxed">
                 You retain all rights to the knowledge bases and data you provide. ChatiFicial retains all rights to the underlying platform infrastructure and technology.
               </p>
            </div>
          </section>

          <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 text-center">
             <h3 className="text-lg font-black text-slate-900 mb-2">Review Complete?</h3>
             <p className="text-sm text-slate-500 font-semibold mb-6">Continue building your AI fleet with confidence.</p>
             <button onClick={() => navigate('/dashboard')} className="px-10 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
               Return to Dashboard
             </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
