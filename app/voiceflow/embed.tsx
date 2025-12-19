
"use client"
import React from 'react';
import VoicePreviewWindow from '../../components/VoicePreviewWindow';

interface EmbedWrapperProps {
  agent: any;
  mode: string;
  onOpen: () => void;
  onClose: () => void;
  showWelcome: boolean;
  setShowWelcome: (val: boolean) => void;
}

const VoiceEmbed: React.FC<EmbedWrapperProps> = ({ agent, mode, onOpen, onClose }) => {
  const theme = agent.theme || {};
  
  if (mode === 'launcher') {
    return (
      <div className="pointer-events-auto">
        <VoicePreviewWindow 
          theme={theme} 
          mode="launcher" 
          onOpen={onOpen}
        />
      </div>
    );
  }

  return (
    <VoicePreviewWindow 
      theme={theme} 
      onClose={onClose} 
    />
  );
};

export default VoiceEmbed;
