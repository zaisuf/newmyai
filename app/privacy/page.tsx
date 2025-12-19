
"use client"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, FileText, Globe, Users } from 'lucide-react';

const PrivacyPage = () => {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">
            <Lock className="w-3.5 h-3.5" /> Security First
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            Last updated: May 20, 2024. Your privacy is our top priority. Here's how we handle your data.
          </p>
        </div>

        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">1. Information Collection</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              We collect information you provide directly to us when you create an account, use our AI builders, or communicate with us. This includes your name, email address, and any data you upload to train your AI agents.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {[
                { icon: FileText, title: "Usage Data", text: "How you use our builder and tools." },
                { icon: Globe, title: "Device Data", text: "IP address and browser settings." },
                { icon: Users, title: "Contact Info", text: "Email and billing information." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
                  <item.icon className="w-5 h-5 text-blue-600 mb-4" />
                  <h4 className="font-black text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">2. How We Use Data</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              We use the collected data to provide, maintain, and improve our services, including the training of your custom AI models. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">3. Data Security</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              ChatiFicial employs industry-standard security measures to protect your information. All data transmissions are encrypted via SSL, and knowledge bases are stored in secure, isolated environments.
            </p>
          </section>

          <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 mt-12">
            <h3 className="font-black text-slate-800 mb-2">Questions?</h3>
            <p className="text-sm text-slate-500 font-semibold">If you have any questions about this Privacy Policy, please contact us at support@chatificial.ai</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
