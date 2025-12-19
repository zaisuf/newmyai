import React from 'react';
import { ThemeConfig } from '../types';

interface ConfigPanelProps {
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

const ColorInput = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
    <span className="text-sm text-gray-300">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-gray-500">{value}</span>
      <input
        type="color"
        value={value}
        onChange={onChange}
        className="h-8 w-8 rounded overflow-hidden cursor-pointer border-none bg-transparent"
      />
    </div>
  </div>
);

const ConfigPanel: React.FC<ConfigPanelProps> = ({ theme, setTheme }) => {
  
  const updateTheme = (key: keyof ThemeConfig, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-gray-900 border-r border-gray-800 w-full md:w-80 h-full overflow-y-auto p-4 custom-scrollbar">
      <h2 className="text-xl font-bold text-white mb-6">UI Configuration</h2>

      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Header Styles</h3>
          <ColorInput label="Background" value={theme.headerBg} onChange={(e) => updateTheme('headerBg', e.target.value)} />
          <ColorInput label="Text Color" value={theme.headerText} onChange={(e) => updateTheme('headerText', e.target.value)} />
        </div>

        {/* Chat Window */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Chat Window</h3>
          <ColorInput label="Background" value={theme.chatBg} onChange={(e) => updateTheme('chatBg', e.target.value)} />
          <ColorInput label="Loading Spinner" value={theme.loadingColor} onChange={(e) => updateTheme('loadingColor', e.target.value)} />
        </div>

        {/* Bot Message */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Bot Response Card</h3>
          <ColorInput label="Bubble Background" value={theme.botBubbleBg} onChange={(e) => updateTheme('botBubbleBg', e.target.value)} />
          <ColorInput label="Text Color" value={theme.botBubbleText} onChange={(e) => updateTheme('botBubbleText', e.target.value)} />
        </div>

        {/* User Message */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">User Query Card</h3>
          <ColorInput label="Bubble Background" value={theme.userBubbleBg} onChange={(e) => updateTheme('userBubbleBg', e.target.value)} />
          <ColorInput label="Text Color" value={theme.userBubbleText} onChange={(e) => updateTheme('userBubbleText', e.target.value)} />
        </div>

        {/* Input Area */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Input Area</h3>
          <ColorInput label="Bar Background" value={theme.inputBarBg} onChange={(e) => updateTheme('inputBarBg', e.target.value)} />
          <ColorInput label="Input Text" value={theme.inputBarText} onChange={(e) => updateTheme('inputBarText', e.target.value)} />
          <ColorInput label="Send Button Bg" value={theme.sendButtonBg} onChange={(e) => updateTheme('sendButtonBg', e.target.value)} />
          <ColorInput label="Send Icon Color" value={theme.sendButtonIconColor} onChange={(e) => updateTheme('sendButtonIconColor', e.target.value)} />
        </div>

        {/* Structure */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Structure</h3>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Border Radius</span>
            <select 
              value={theme.borderRadius}
              onChange={(e) => updateTheme('borderRadius', e.target.value)}
              className="bg-gray-700 text-white rounded p-2 text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
            >
              <option value="rounded-none">Square</option>
              <option value="rounded-md">Small Rounded</option>
              <option value="rounded-xl">Rounded</option>
              <option value="rounded-full">Fully Rounded</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
