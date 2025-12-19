"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { 
  Zap, Palette, Bot, Layers, ArrowRight, Play, 
  Globe, Users, Star, Check, Cpu, Layout, Shield, 
  HelpCircle, MessageSquare, Brain, Mic, 
  Search, BarChart3, ChevronDown, Monitor, Smartphone,
  ExternalLink, Mail, Github, Twitter, Activity,
  Settings, Terminal, Headphones, Sparkles, Languages,
  Calendar, ShoppingCart, Code, Plus, ArrowUp, Lock,
  Share2, Database, Workflow, Cloud, Filter, Eye,
  Command, Box, Layers3, Network, Send
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('Talk');
  const [demoStep, setDemoStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sweepingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      let rafId: number | null = null;
      let kInterval: number | null = null;
      let lenis: any = null;
      let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

      const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
         if (document.querySelector(`script[src="${src}"]`)) return resolve();
         const s = document.createElement('script');
         s.src = src;
         s.async = true;
         s.onload = () => resolve();
         s.onerror = () => reject(new Error(`Failed to load ${src}`));
         document.head.appendChild(s);
      });

      const init = async () => {
         try {
            // Load GSAP + ScrollTrigger if not present
            // using stable CDN versions; if already injected by layout this is a no-op
            // @ts-ignore
            if (!window.gsap) {
               await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
            }
            // @ts-ignore
            if (!window.ScrollTrigger) {
               await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
            }
            // @ts-ignore
            if (!window.Lenis) {
               await loadScript('https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.23/bundled/lenis.min.js');
            }

            // @ts-ignore
            const gsap = window.gsap;
            // @ts-ignore
            const ScrollTrigger = window.ScrollTrigger;
            // @ts-ignore
            const Lenis = window.Lenis;

            if (!gsap || !ScrollTrigger) return;
            gsap.registerPlugin(ScrollTrigger);

            lenis = new Lenis({
               duration: 1.5,
               easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });

            function loop(time: number) {
               if (lenis && typeof lenis.raf === 'function') lenis.raf(time);
               rafId = requestAnimationFrame(loop);
            }
            rafId = requestAnimationFrame(loop);

            const glow = document.getElementById('cursor-glow');
            mouseMoveHandler = (e: MouseEvent) => {
               try {
                  if (glow) {
                     // @ts-ignore
                     gsap.to(glow, {
                        x: e.clientX,
                        y: e.clientY,
                        duration: 0.8,
                        ease: 'power3.out'
                     });
                  }

                  const tiltCards = document.querySelectorAll('.tilt-card');
                  tiltCards.forEach((card: Element) => {
                     const rect = card.getBoundingClientRect();
                     const x = e.clientX - rect.left - rect.width / 2;
                     const y = e.clientY - rect.top - rect.height / 2;
                     // @ts-ignore
                     gsap.to(card, {
                        rotateY: x * 0.05,
                        rotateX: -y * 0.05,
                        duration: 0.5,
                        ease: 'power2.out'
                     });
                  });
               } catch (err) {
                  // swallow
               }
            };
            window.addEventListener('mousemove', mouseMoveHandler);

            const heroTitle = document.querySelectorAll('.hero-title .word');
            // @ts-ignore
            gsap.from(heroTitle, {
               y: 100,
               opacity: 0,
               filter: 'blur(20px)',
               stagger: 0.05,
               duration: 1.5,
               ease: 'expo.out',
               delay: 0.2
            });

            const keywords = ['Talk', 'Listen', 'Sell', 'Support', 'Scale'];
            let kIdx = 0;
            kInterval = window.setInterval(() => {
               kIdx = (kIdx + 1) % keywords.length;
               const swapper = document.getElementById('keyword-swapper');
               // @ts-ignore
               gsap.to(swapper, {
                  y: -20,
                  opacity: 0,
                  duration: 0.3,
                  onComplete: () => {
                     setKeyword(keywords[kIdx]);
                     // @ts-ignore
                     gsap.fromTo(swapper, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
                  }
               });
            }, 3000);

            // sweeping layers
            // @ts-ignore
            gsap.to('.sweep-layer-1', {
               xPercent: -50,
               scrollTrigger: {
                  trigger: sweepingRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.5
               }
            });
            // @ts-ignore
            gsap.to('.sweep-layer-2', {
               xPercent: 50,
               scrollTrigger: {
                  trigger: sweepingRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.5
               }
            });

            // parallax
            // @ts-ignore
            gsap.utils.toArray('.parallax-element').forEach((layer: any) => {
               const depth = layer.dataset.depth || 0.2;
               const movement = -(layer.offsetHeight * depth);
               // @ts-ignore
               gsap.to(layer, {
                  y: movement,
                  ease: "none",
                  scrollTrigger: {
                     trigger: layer,
                     start: "top bottom",
                     end: "bottom top",
                     scrub: true
                  }
               });
            });

            // pinned story
            // @ts-ignore
            ScrollTrigger.create({
               trigger: storyRef.current,
               start: 'top top',
               end: '+=4000',
               pin: true,
               scrub: 1,
               onUpdate: (self: any) => {
                   setDemoStep(Math.min(3, Math.floor(self.progress * 4)));
               }
            });

            const phoneTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: '.device-reveal-section',
                  start: 'top 80%',
                  end: 'top 20%',
                  scrub: 1
               }
            });

            phoneTimeline.from('.phone-mockup', {
               rotateX: 60,
               rotateY: -30,
               z: -500,
               opacity: 0,
               scale: 0.7
            }).from('.floating-widget-demo', {
               x: 100,
               opacity: 0,
               scale: 0,
               duration: 0.5
            }, "-=0.3");

            // horizontal scroll
            // @ts-ignore
            gsap.to('.horizontal-scroll', {
               xPercent: -66,
               ease: 'none',
               scrollTrigger: {
                  trigger: pinnedRef.current,
                  pin: true,
                  scrub: 1,
                  end: '+=2500'
               }
            });

         } catch (err) {
            // fail silently - animations are additive
            // console.warn('Animation init failed', err);
         }
      };

      init();

      return () => {
         if (kInterval) clearInterval(kInterval);
         if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler);
         if (rafId) cancelAnimationFrame(rafId);
         try {
            // @ts-ignore
            if (lenis && typeof lenis.destroy === 'function') lenis.destroy();
            // @ts-ignore
            if (window.ScrollTrigger && typeof window.ScrollTrigger.getAll === 'function') {
               // @ts-ignore
               window.ScrollTrigger.getAll().forEach((t: any) => t.kill());
            }
         } catch (e) {}
      };
  }, []);

  const splitText = (text: string) => text.split(' ').map((word, i) => <span key={i} className="word mr-[0.25em] inline-block">{word}</span>);

   const handleAnchorClick = (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      if (typeof document === 'undefined') return;
      const el = document.getElementById(id);
      if (el) {
         el.scrollIntoView({ behavior: 'smooth', block: 'start' });
         // update the hash without jumping
         history.replaceState(null, '', `#${id}`);
      } else {
         // fallback: set hash
         window.location.hash = id;
      }
   };

   return (
      <div ref={containerRef} className="relative w-full bg-white selection:bg-blue-600 selection:text-white">
      
      {/* CURSOR GLOW */}
      <div id="cursor-glow" className="cursor-glow fixed top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-2xl">
            <span className="font-black text-xl">C</span>
          </div>
          <span className="font-black text-sm tracking-tighter uppercase text-slate-900">ChatiFicial</span>
        </div>

        <div className="hidden lg:flex items-center gap-10 px-10 py-3 bg-white/80 backdrop-blur-2xl border border-slate-100 rounded-full pointer-events-auto shadow-sm">
                {['Platform', 'Intelligence', 'Case Studies', 'Pricing'].map(item => (
                   item === 'Pricing' ? (
                      <button 
                         key={item} 
                         onClick={() => navigate('/pricing')} 
                         className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all focus:outline-none"
                      >
                         {item}
                      </button>
                   ) : (
                      <a 
                         key={item} 
                         href={`#${item.toLowerCase()}`} 
                         onClick={(e) => handleAnchorClick(e, item.toLowerCase())}
                         className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all"
                      >
                         {item}
                      </a>
                   )
                ))}
        </div>

        <div className="pointer-events-auto">
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-3.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '80px 80px'}}></div>
        
        <div className="max-w-7xl mx-auto text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-12 shadow-sm animate-bounce">
            <Sparkles className="w-3 h-3 fill-current" /> Next-Gen AI Units 3.0
          </div>
          
          <h1 className="hero-title text-6xl md:text-[9.5rem] font-[900] tracking-tighter leading-[0.8] mb-12 text-slate-900">
            {splitText("Build AI Agents that")} <br/>
            <span id="keyword-swapper" className="text-blue-600 inline-block min-w-[200px]">{keyword}</span>
            {splitText(", Listen, and Scale.")}
          </h1>

          <p className="text-xl md:text-3xl text-slate-400 font-medium max-w-4xl mx-auto leading-relaxed mb-20 px-4">
             {splitText("The elite workspace for architecting high-performance autonomous units. ChatiFicial combines visual design with deep neural reasoning.")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <div className="magnetic-area">
              <button 
                onClick={() => navigate('/login')}
                className="magnetic-content px-16 py-8 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:bg-blue-600 transition-all flex items-center gap-5"
              >
                Launch Builder <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="magnetic-area">
              <button className="magnetic-content px-12 py-8 bg-white border border-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-50 transition-all flex items-center gap-5">
                Watch Demo <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SWEEPING VELOCITY LAYERS */}
      <section ref={sweepingRef} className="sweeping-section py-60 bg-slate-950 overflow-hidden relative border-y border-white/5">
         <div className="sweep-layer-1 flex whitespace-nowrap mb-10 will-change-transform">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-[14rem] font-black text-white/10 uppercase tracking-tighter mr-20 select-none">40ms LATENCY • REAL TIME VOICE • NEURAL SYNC • </span>
            ))}
         </div>
         <div className="max-w-5xl mx-auto px-6 relative z-10 text-center py-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-blue-400 mb-10">
               <Zap className="w-3 h-3 fill-current" /> High Speed Inference
            </div>
            <h3 className="text-7xl md:text-[11rem] font-black text-white tracking-tighter mb-12 leading-[0.8]">Velocity is <br/> Currency.</h3>
            <p className="text-2xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">We built the architecture for companies that can't wait. Zero loading states. Pure intelligence across every node.</p>
         </div>
         <div className="sweep-layer-2 flex whitespace-nowrap mt-10 will-change-transform">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-[14rem] font-black text-white/10 uppercase tracking-tighter mr-20 select-none">SCALE TO MILLIONS • AUTONOMOUS FLEET • NO CODE ENGINE • </span>
            ))}
         </div>
      </section>

      {/* 3. PINNED WORKFLOW STORY (UPGRADED WITH STYLE VARIATIONS) */}
      <section ref={storyRef} className="relative min-h-screen bg-slate-50 flex items-center justify-center overflow-hidden border-y border-slate-100">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 px-6 items-center w-full h-full">
            <div className="space-y-16">
               <div className="h-72 overflow-hidden relative">
                  <div className={`absolute w-full transition-all duration-700 transform ${demoStep === 0 ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
                     <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 underline decoration-blue-200 underline-offset-8">Step 01</h2>
                     <h3 className="text-[5rem] font-black tracking-tighter text-slate-900 leading-none">Glassmorphism <br/> Design.</h3>
                     <p className="text-xl text-slate-400 mt-6 font-medium leading-relaxed">Elegant, transparent interfaces that blend naturally with high-end luxury aesthetics.</p>
                  </div>
                  <div className={`absolute w-full transition-all duration-700 transform ${demoStep === 1 ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
                     <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-purple-600 mb-6 underline decoration-purple-200 underline-offset-8">Step 02</h2>
                     <h3 className="text-[5rem] font-black tracking-tighter text-slate-900 leading-none">Neumorphic <br/> Depth.</h3>
                     <p className="text-xl text-slate-400 mt-6 font-medium leading-relaxed">Soft physical depth and shadows for tactile, futuristic dashboard experiences.</p>
                  </div>
                  <div className={`absolute w-full transition-all duration-700 transform ${demoStep === 2 ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
                     <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-pink-600 mb-6 underline decoration-pink-200 underline-offset-8">Step 03</h2>
                     <h3 className="text-[5rem] font-black tracking-tighter text-slate-900 leading-none">Cyberpunk <br/> Logic.</h3>
                     <p className="text-xl text-slate-400 mt-6 font-medium leading-relaxed">High-contrast, high-intelligence dark modes for tech-focused developers.</p>
                  </div>
                  <div className={`absolute w-full transition-all duration-700 transform ${demoStep === 3 ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
                     <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-600 mb-6 underline decoration-emerald-200 underline-offset-8">Step 04</h2>
                     <h3 className="text-[5rem] font-black tracking-tighter text-slate-900 leading-none">Professional <br/> Core.</h3>
                     <p className="text-xl text-slate-400 mt-6 font-medium leading-relaxed">Sharp, authoritative enterprise-grade layouts for mission-critical operations.</p>
                  </div>
               </div>

               <div className="flex gap-6">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${demoStep >= i ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
                  ))}
               </div>
            </div>

            <div className="relative flex items-center justify-center h-full">
               <div className="tilt-card w-[420px] aspect-[4/5] relative z-10">
                  {/* STYLE 1: GLASSMORPHISM */}
                  <div className={`absolute inset-0 transition-all duration-1000 transform ${demoStep === 0 ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 rotate-12 pointer-events-none'}`}>
                     <div className="w-full h-full bg-white/30 backdrop-blur-3xl border border-white/50 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.05)] p-10 flex flex-col">
                        <div className="flex items-center gap-4 mb-10">
                           <div className="w-12 h-12 rounded-2xl bg-white/40 border border-white/60 flex items-center justify-center text-blue-600">
                              <Sparkles className="w-6 h-6" />
                           </div>
                           <div className="h-3 w-32 bg-white/40 rounded-full"></div>
                        </div>
                        <div className="space-y-6 flex-1">
                           <div className="bg-white/40 p-5 rounded-3xl rounded-tl-none border border-white/50 w-[80%] shadow-sm"></div>
                           <div className="bg-blue-500/80 p-5 rounded-3xl rounded-tr-none self-end w-[70%] shadow-xl"></div>
                           <div className="bg-white/40 p-5 rounded-3xl rounded-tl-none border border-white/50 w-[85%] shadow-sm"></div>
                        </div>
                        <div className="mt-8 h-14 bg-white/40 rounded-2xl border border-white/60"></div>
                     </div>
                  </div>

                  {/* STYLE 2: NEUMORPHISM */}
                  <div className={`absolute inset-0 transition-all duration-1000 transform ${demoStep === 1 ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 -rotate-12 pointer-events-none'}`}>
                     <div className="w-full h-full bg-[#e0e5ec] rounded-[4rem] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] p-10 flex flex-col border border-white/10">
                        <div className="flex items-center gap-4 mb-10">
                           <div className="w-12 h-12 rounded-full bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] flex items-center justify-center">
                              <Palette className="w-6 h-6 text-purple-600" />
                           </div>
                           <div className="h-3 w-32 bg-[#e0e5ec] rounded-full shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff]"></div>
                        </div>
                        <div className="space-y-6 flex-1">
                           <div className="bg-[#e0e5ec] p-5 rounded-2xl shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] w-[80%]"></div>
                           <div className="bg-[#e0e5ec] p-5 rounded-2xl shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] self-end w-[70%] text-purple-600 font-bold"></div>
                        </div>
                        <div className="mt-8 h-14 bg-[#e0e5ec] rounded-2xl shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]"></div>
                     </div>
                  </div>

                  {/* STYLE 3: CYBER/DARK */}
                  <div className={`absolute inset-0 transition-all duration-1000 transform ${demoStep === 2 ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 rotate-12 pointer-events-none'}`}>
                     <div className="w-full h-full bg-[#050505] border border-white/10 rounded-[4rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] p-10 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
                        <div className="flex items-center gap-4 mb-10">
                           <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                              <Cpu className="w-6 h-6" />
                           </div>
                           <div className="text-[10px] font-black text-white tracking-widest opacity-50 uppercase">Neural.Node_01</div>
                        </div>
                        <div className="space-y-6 flex-1">
                           <div className="bg-white/5 border border-white/10 p-5 rounded-2xl w-[90%] font-mono text-[10px] text-pink-500/60">INIT REASONING...</div>
                           <div className="bg-pink-500 p-5 rounded-2xl self-end w-[60%] shadow-[0_0_30px_rgba(236,72,153,0.4)]"></div>
                           <div className="bg-white/5 border border-white/10 p-5 rounded-2xl w-[80%]"></div>
                        </div>
                        <div className="mt-8 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center px-6">
                           <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                        </div>
                     </div>
                  </div>

                  {/* STYLE 4: PROFESSIONAL */}
                  <div className={`absolute inset-0 transition-all duration-1000 transform ${demoStep === 3 ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 -rotate-12 pointer-events-none'}`}>
                     <div className="w-full h-full bg-white border border-slate-200 rounded-[4rem] shadow-2xl p-10 flex flex-col">
                        <div className="flex items-center justify-between mb-10">
                           <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
                                 <Shield className="w-6 h-6" />
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-xs font-black text-slate-900 uppercase">Secure Agent</span>
                                 <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Enterprise Core</span>
                              </div>
                           </div>
                           <Check className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="space-y-6 flex-1">
                           <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl w-[85%] text-slate-700 font-bold text-sm leading-relaxed shadow-sm">How can I assist with your infrastructure today?</div>
                           <div className="bg-slate-900 p-5 rounded-3xl self-end w-[75%] text-white text-xs font-bold shadow-xl">Audit compliance status.</div>
                        </div>
                        <div className="mt-8 flex gap-3">
                           <div className="flex-1 h-14 bg-slate-50 border border-slate-200 rounded-2xl"></div>
                           <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                              <Send className="w-5 h-5" />
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
               
               {/* Decorative background grid behind the cards */}
               <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] pointer-events-none">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-black m-2"></div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 4. DEVICE ECOSYSTEM (LIVE CHAT PREVIEW) */}
      <section className="device-reveal-section py-60 bg-white overflow-hidden relative">
         <div className="parallax-element absolute top-40 -left-20 text-[20rem] font-black text-slate-50 select-none pointer-events-none z-0" data-depth="0.1">
            MOBILE
         </div>

         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-12">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[10px] font-bold uppercase tracking-widest text-purple-600 mb-4">
                  <Monitor className="w-3 h-3" /> Fully Responsive
               </div>
               <h3 className="text-7xl font-[900] tracking-tighter leading-[0.9] text-slate-900">Native Presence. <br/> Everywhere.</h3>
               <p className="text-2xl text-slate-500 font-medium max-w-lg leading-relaxed">Your agents aren't just bubbles. They are part of your site's DNA. From high-end desktop workflows to minimal mobile orbs.</p>
               
               <div className="space-y-6">
                  {[
                     { t: 'Fluid Adapters', d: 'Widgets morph perfectly between screen sizes.' },
                     { t: 'Logo Sync', d: 'Inject your brand assets into the widget launcher instantly.' },
                     { t: 'Floating Logic', d: 'launcher pods can be positioned anywhere on the viewport.' }
                  ].map(item => (
                     <div key={item.t} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 mt-1">
                           <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                           <h4 className="text-lg font-black text-slate-900">{item.t}</h4>
                           <p className="text-sm text-slate-400 font-medium">{item.d}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="relative flex justify-center py-20" style={{ perspective: '3000px' }}>
               <div className="phone-mockup w-[320px] h-[640px] bg-slate-900 rounded-[3.5rem] border-[12px] border-slate-800 shadow-[0_50px_120px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col transform rotate-Y-12">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-800 rounded-b-3xl z-30"></div>
                  <div className="flex-1 bg-[#fcfcfd] p-0 flex flex-col relative z-20">
                     <div className="bg-white border-b border-slate-100 p-6 pt-12 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                           <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-slate-900 leading-none">Nexus Prime</h4>
                           <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Active Now</p>
                        </div>
                     </div>
                     <div className="flex-1 p-5 space-y-4">
                        <div className="flex justify-start">
                           <div className="max-w-[85%] bg-slate-100 p-4 rounded-3xl rounded-tl-none text-xs font-medium text-slate-600 leading-relaxed shadow-sm">"Welcome back! I've analyzed your recent orders."</div>
                        </div>
                        <div className="flex justify-end">
                           <div className="max-w-[85%] bg-blue-600 p-4 rounded-3xl rounded-tr-none text-xs font-medium text-white leading-relaxed shadow-lg">"Show me my delivery status."</div>
                        </div>
                     </div>
                     <div className="p-5 bg-white border-t border-slate-50 flex items-center gap-3">
                        <div className="flex-1 h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 flex items-center">
                           <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
                        </div>
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white"><Send className="w-4 h-4" /></div>
                     </div>
                  </div>
               </div>
               <div className="floating-widget-demo absolute bottom-20 -right-10 flex flex-col items-end gap-4 z-40">
                  <div className="bg-slate-900 text-white p-4 rounded-[20px] rounded-br-none shadow-2xl border border-white/10 max-w-[200px] animate-bounce">
                     <p className="text-[11px] font-bold leading-tight">"Ask about our fleet pricing!"</p>
                  </div>
                  <div className="w-20 h-20 bg-blue-600 rounded-full shadow-[0_20px_50px_rgba(37,99,235,0.4)] border-4 border-white flex items-center justify-center hover:scale-110 cursor-pointer overflow-hidden group">
                     <MessageSquare className="w-8 h-8 text-white fill-current" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. INTERACTIVE TAB DEMO */}
      <section className="py-40 bg-white border-y border-slate-50">
         <div className="max-w-4xl mx-auto text-center px-6">
            <h3 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-20">Living Interface.</h3>
            
            <div className="bg-slate-50 p-2 rounded-[3rem] border border-slate-100 shadow-sm inline-flex mb-20">
               {['Chat Unit', 'Voice Unit'].map((unit, i) => (
                  <button 
                    key={unit}
                    onClick={() => setActiveTab(i)}
                    className={`px-12 py-4 rounded-[2.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === i ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {unit}
                  </button>
               ))}
            </div>

            <div className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_80px_160px_-20px_rgba(0,0,0,0.1)] overflow-hidden relative min-h-[500px] flex flex-col items-center justify-center p-20">
               {activeTab === 0 ? (
                 <div className="w-full space-y-8 animate-[fadeIn_0.5s_ease-out]">
                    <div className="flex gap-4 items-start">
                       <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg"><Bot className="w-7 h-7" /></div>
                       <div className="bg-slate-50 p-8 rounded-[2.5rem] rounded-tl-none text-left text-xl font-medium text-slate-700 shadow-sm max-w-xl">"I've crawled your support docs. I'm ready to resolve 88% of queries."</div>
                    </div>
                    <div className="flex gap-4 items-start justify-end">
                       <div className="bg-blue-600 p-8 rounded-[2.5rem] rounded-tr-none text-right text-xl font-medium text-white shadow-xl max-w-xl">"Excellent. Deploy to production."</div>
                    </div>
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center gap-12 animate-[fadeIn_0.5s_ease-out]">
                    <div className="relative">
                       <div className="w-56 h-56 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-200"><Mic className="w-24 h-24 text-white" /></div>
                       <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping opacity-20"></div>
                    </div>
                    <p className="text-4xl font-black text-slate-300 italic tracking-tighter">"Transcribing speech at 40ms..."</p>
                 </div>
               )}
            </div>
         </div>
      </section>

      {/* 6. FEATURES GRID */}
      <section id="features-grid" className="py-40 px-6 bg-slate-50 relative">
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-32">
               <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-600 mb-8">Ecosystem Layers</h2>
               <h3 className="text-6xl md:text-[9rem] font-black tracking-tighter text-slate-900 leading-[0.85]">Elite <br/> Engineering.</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
               {[
                 { title: 'Dynamic Context', icon: Brain, desc: 'Index any domain or document instantly.', color: 'blue' },
                 { title: 'Global Logic', icon: Globe, desc: 'Real-time translation for 40+ languages.', color: 'purple' },
                 { title: 'Custom UI Forge', icon: Palette, desc: 'Complete white-label theme customizer.', color: 'pink' },
                 { title: 'Neural Voice', icon: Mic, desc: 'Low-latency native voice engine.', color: 'amber' },
                 { title: 'Logic Nodes', icon: Workflow, desc: 'Automate tasks across 5,000+ apps.', color: 'emerald' },
                 { title: 'Fleet Control', icon: Activity, desc: 'Manage 1 to 100,000 agents instantly.', color: 'indigo' },
               ].map((f, i) => (
                 <div key={i} className="tilt-card glass-card p-14 rounded-[4rem] hover:shadow-2xl transition-all border border-slate-100 bg-white group">
                    <div className={`w-20 h-20 rounded-3xl bg-${f.color}-50 text-${f.color}-600 flex items-center justify-center mb-12 shadow-sm border border-${f.color}-100 group-hover:scale-110 transition-transform`}>
                       <f.icon className="w-10 h-10" />
                    </div>
                    <h4 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{f.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed text-lg">{f.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. HORIZONTAL USE CASES */}
      <section ref={pinnedRef} className="relative h-screen bg-slate-950 overflow-hidden flex items-center">
         <div className="flex horizontal-scroll px-[10%] gap-[15vw]">
            <div className="w-[85vw] shrink-0 flex items-center gap-32">
               <h3 className="text-[20rem] font-black text-white/[0.03] tracking-tighter shrink-0 select-none">REVENUE</h3>
               <div className="max-w-xl text-white">
                  <h4 className="text-8xl font-black mb-12 tracking-tighter leading-none">Convert at <br/> scale.</h4>
                  <p className="text-3xl text-slate-400 font-medium leading-relaxed">Engage high-intent visitors proactively. Close deals while you sleep.</p>
               </div>
            </div>
            <div className="w-[85vw] shrink-0 flex items-center gap-32">
               <h3 className="text-[20rem] font-black text-white/[0.03] tracking-tighter shrink-0 select-none">SUPPORT</h3>
               <div className="max-w-xl text-white">
                  <h4 className="text-8xl font-black mb-12 tracking-tighter leading-none">Deflect 80% <br/> volume.</h4>
                  <p className="text-3xl text-slate-400 font-medium leading-relaxed">Instant resolution for repetitive queries via direct documentation connection.</p>
               </div>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-50 py-40 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-20 mb-40">
               <div className="col-span-1 space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl"><span className="font-black text-3xl">C</span></div>
                    <span className="font-black text-2xl tracking-tighter uppercase text-slate-800">ChatiFicial</span>
                  </div>
                  <p className="text-slate-400 font-medium text-xl leading-relaxed">The elite forge for AI native companies.</p>
                  <div className="flex gap-8">
                     {[Twitter, Github, Mail].map((Icon, i) => (
                        <button key={i} className="w-16 h-16 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-[1.5rem] transition-all border border-slate-100 flex items-center justify-center shadow-sm">
                           <Icon className="w-7 h-7" />
                        </button>
                     ))}
                  </div>
               </div>
               <div><h5 className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 mb-12">Platform</h5><ul className="space-y-8 text-sm font-bold text-slate-500 uppercase tracking-widest"><li><a href="#">Builder</a></li><li><a href="#">Templates</a></li><li><button onClick={() => navigate('/pricing')}>Pricing</button></li></ul></div>
               <div><h5 className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 mb-12">Intelligence</h5><ul className="space-y-8 text-sm font-bold text-slate-500 uppercase tracking-widest"><li><a href="#">Models</a></li><li><a href="#">Latency</a></li><li><a href="#">Vector Hub</a></li></ul></div>
               <div><h5 className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 mb-12">Legal</h5><ul className="space-y-8 text-sm font-bold text-slate-500 uppercase tracking-widest"><li><a href="/privacy">Privacy</a></li><li><a href="/terms">Terms</a></li><li><a href="/gdpr">GDPR</a></li></ul></div>
            </div>
            <div className="pt-20 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-12">
               <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.6em]">© 2025 ChatiFicial Labs. Infrastructure Secured.</p>
               <div className="flex items-center gap-16"><div className="flex items-center gap-4"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)]"></div><span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Global Fleet: Operational</span></div></div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
