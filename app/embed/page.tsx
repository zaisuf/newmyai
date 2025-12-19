
"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchPublicAgent } from '../../services/firebaseService';
import PreviewWindow from '../../components/PreviewWindow';
import VoicePreviewWindow from '../../components/VoicePreviewWindow';
import { MessageSquare, X, AlertCircle, RefreshCw, Mic } from 'lucide-react';

const EmbedPage: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode') || 'full'; 

  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const loadAgent = useCallback(async () => {
    if (!agentId) {
      setError("Missing Agent ID.");
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
        setError(`Agent ID "${agentId}" not found.`);
      }
    } catch (err: any) {
      console.error("Embed load error:", err);
      setError(err.message || "Connection failed.");
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    loadAgent();
  }, [loadAgent]);

  useEffect(() => {
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
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-6 bg-transparent">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-red-100 text-center animate-[slideUp_0.3s_ease-out]">
          <AlertCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
          <p className="text-xs text-gray-500">{error || "Load failed."}</p>
        </div>
      </div>
    );
  }

  const theme = agent.theme || {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent overflow-hidden">
      {/* LAUNCHER MODE */}
      {mode === 'launcher' && (
        <div className="fixed inset-0 flex items-end justify-end p-4 bg-transparent pointer-events-none">
          {agent.type === 'voice' ? (
            <div className="pointer-events-auto">
              <VoicePreviewWindow 
                theme={theme} 
                mode="launcher" 
                onOpen={handleOpenChat}
              />
            </div>
          ) : (
            <div className="flex flex-col items-end gap-3 pointer-events-auto">
              {showWelcome && theme.showWelcomeBubbles && theme.welcomeMessage && (
                <div 
                  className="relative max-w-[280px] p-4 pr-10 rounded-[20px] rounded-br-none shadow-2xl border border-white/10 animate-[fadeIn_0.5s_ease-out] cursor-pointer"
                  style={{ backgroundColor: theme.launcherTagBg || '#1f2937', color: theme.launcherTagText || '#ffffff' }}
                  onClick={handleOpenChat}
                >
                  <button onClick={(e) => { e.stopPropagation(); setShowWelcome(false); }} className="absolute top-2 right-2 w-5 h-5 bg-black/10 rounded-full flex items-center justify-center">
                    <X className="w-3 h-3" />
                  </button>
                  <p className="text-[11px] font-medium leading-relaxed">{theme.welcomeMessage}</p>
                </div>
              )}
              <button
                onClick={handleOpenChat}
                className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group overflow-hidden border-4 border-white"
                style={{ backgroundColor: theme.launcherBg || '#ef4444' }}
              >
                {theme.launcherLogoUrl ? (
                  <img src={theme.launcherLogoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <MessageSquare className="w-7 h-7" style={{ color: theme.launcherIconColor || '#ffffff' }} />
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* CHAT/SESSION MODE */}
      {mode === 'chat' && (
        <div className="w-full h-full animate-[slideUp_0.3s_ease-out] bg-transparent">
          {agent.type === 'voice' ? (
            <VoicePreviewWindow 
              theme={theme} 
              onClose={handleCloseChat} 
            />
          ) : (
            <PreviewWindow 
              theme={theme} 
              agentConfig={agent.agentConfig || {}} 
              onClose={handleCloseChat} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EmbedPage;
