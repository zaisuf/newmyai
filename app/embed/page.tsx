
"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchPublicAgent } from '../../services/firebaseService';
import { AlertCircle, Loader2 } from 'lucide-react';

// Unified Embed Dispatcher Map

import ThreeDEmbed from '../3dchat/embed.tsx';


const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {
  'chat': ChatflowEmbed,
  '3dchat': ThreeDEmbed,
  'frosted': FrostedEmbed,
  'voice': VoiceEmbed,
  // Add future templates (50+) here
};

const EmbedPage: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode') || 'chat'; // 'launcher' or 'chat'

  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const loadAgent = useCallback(async () => {
    if (!agentId) {
      setError("Missing Unit Identification.");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPublicAgent(agentId);
      if (data) {
        setAgent(data);
      } else {
        setError(`Neural Unit ID "${agentId}" not found in current sector.`);
      }
    } catch (err: any) {
      console.error("Embed load error:", err);
      setError(err.message || "Uplink failed.");
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    loadAgent();
  }, [loadAgent]);

  useEffect(() => {
    // Force transparency for iframe integration
    document.body.style.backgroundColor = 'transparent';
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
  }, []);

  const handleOpenChat = () => {
    window.parent.postMessage({ type: 'BOTFORGE_OPEN' }, '*');
  };

  const handleCloseChat = () => {
    window.parent.postMessage({ type: 'BOTFORGE_CLOSE' }, '*');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-transparent">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin opacity-40" />
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-6 bg-transparent">
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-red-50 text-center animate-[slideUp_0.3s_ease-out] max-w-[280px]">
          <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-3" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Sync Error</p>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">{error || "Unit load failed."}</p>
        </div>
      </div>
    );
  }

  // Determine which template to render from the registry
  const agentType = agent.type || 'chat';
  const EmbedWrapper = TEMPLATE_REGISTRY[agentType] || ChatflowEmbed;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent overflow-hidden">
      <div className={`w-full h-full flex ${mode === 'launcher' ? 'items-end justify-end p-4 pointer-events-none' : 'animate-[slideUp_0.4s_ease-out] bg-transparent'}`}>
        <EmbedWrapper 
          agent={agent}
          mode={mode}
          onOpen={handleOpenChat}
          onClose={handleCloseChat}
          showWelcome={showWelcome}
          setShowWelcome={setShowWelcome}
        />
      </div>
    </div>
  );
};

export default EmbedPage;
