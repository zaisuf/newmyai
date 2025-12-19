
"use client"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chrome, CheckCircle2, Sparkles, Zap, Bot, ArrowRight } from 'lucide-react';
import { signInWithGoogle } from '../../services/firebaseService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex font-sans text-slate-900 selection:bg-blue-100">
      {/* Left Side: Simplified Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 relative">
        <div className="max-w-md w-full animate-[slideUp_0.5s_ease-out]">
          <div className="mb-10 lg:hidden">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl mb-4">B</div>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Sign In</h2>
            <p className="text-slate-400 font-semibold mt-2 text-lg">Access your workspace and manage your agents.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-5 bg-white border border-slate-200 text-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-4 disabled:opacity-50 active:scale-[0.98] shadow-sm ring-1 ring-slate-200 hover:ring-blue-500/30"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
              ) : (
                <Chrome className="w-5 h-5 text-blue-600" />
              )}
              {loading ? 'Authenticating...' : 'Continue with Google'}
            </button>
            
            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">
              By continuing, you agree to our <a href="#" className="underline">Terms of Service</a>
            </p>
          </div>

          <div className="mt-20 pt-10 border-t border-slate-50">
            <div className="flex flex-col items-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                New to BotForge? <a href="#" className="text-blue-600 hover:text-blue-700 ml-1">Join the community</a>
              </p>
              <button 
                onClick={() => navigate('/')} 
                className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors inline-flex items-center gap-2"
              >
                ← Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Marketing Visuals (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-50 items-center justify-center p-12">
        {/* Background Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-100/50 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-100/50 rounded-full blur-[120px] animate-pulse delay-700"></div>
        
        <div className="relative z-10 max-w-md w-full animate-[fadeIn_0.8s_ease-out]">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-8 shadow-sm">
              <Sparkles className="w-3 h-3" /> Empowering Intelligence
           </div>
           
           <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
              The forge for <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI native</span> agents.
           </h1>
           
           <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
              Join 10,000+ developers building the next generation of voice and chat assistants.
           </p>

           <div className="space-y-4">
              {[
                { icon: Zap, text: "Instant deployment to any platform" },
                { icon: Bot, text: "Advanced Gemini 3.0 Pro reasoning" },
                { icon: CheckCircle2, text: "No-code UI customizer & builder" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-md border border-white rounded-2xl shadow-sm hover:shadow-md transition-all hover:translate-x-1 duration-300">
                   <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                      <item.icon className="w-5 h-5" />
                   </div>
                   <span className="text-sm font-bold text-slate-700">{item.text}</span>
                </div>
              ))}
           </div>
           
           <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
                 ))}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loved by developers worldwide</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
