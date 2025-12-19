import React, { useState } from 'react';
import { ThemeConfig, SelectedElement } from '../types';
import { ChevronDown, Type, Box } from './Icons';

interface RightSidebarProps {
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
  selection: SelectedElement;
}

const Accordion = ({ title, children, defaultOpen = true }: React.PropsWithChildren<{ title: string, defaultOpen?: boolean }>) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-1 hover:bg-gray-50 transition-colors"
      >
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</span>
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="pb-6 px-1 space-y-4">{children}</div>}
    </div>
  );
};

const InputRow = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-xs font-medium text-gray-600">{label}</span>
    {children}
  </div>
);

const ColorPicker = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
  <div className="flex items-center gap-2 h-8 bg-white border border-gray-200 rounded px-2 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
    <div className="relative w-4 h-4 rounded-sm overflow-hidden border border-gray-200">
      <div className="absolute inset-0" style={{ backgroundColor: value }} />
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
    </div>
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 text-xs text-gray-700 font-mono outline-none bg-transparent"
    />
    <span className="text-[10px] text-gray-400">100%</span>
  </div>
);

const Select = ({ value, onChange, options }: { value: string, onChange: (val: string) => void, options: { label: string, value: string }[] }) => (
  <div className="relative">
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-8 pl-2 pr-6 bg-white border border-gray-200 rounded text-xs text-gray-700 appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    >
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
      <ChevronDown className="w-3 h-3" />
    </div>
  </div>
);

const RightSidebar: React.FC<RightSidebarProps> = ({ theme, setTheme, selection }) => {
  const updateTheme = (key: keyof ThemeConfig, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const getTitle = () => {
    switch(selection) {
      case 'header': return 'Header Styles';
      case 'bot_message': return 'Bot Message';
      case 'user_message': return 'User Message';
      case 'input_area': return 'Input Area';
      default: return 'Global Settings';
    }
  };

  return (
    <div className="w-[300px] bg-white border-l border-gray-200 flex flex-col h-full z-10">
      
      {/* Tabs */}
      <div className="h-12 border-b border-gray-200 flex items-center px-2 bg-white sticky top-0">
        <button className="flex-1 pb-3 pt-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">Style</button>
        <button className="flex-1 pb-3 pt-3 text-sm font-medium text-gray-500 hover:text-gray-800">General</button>
        <button className="flex-1 pb-3 pt-3 text-sm font-medium text-gray-500 hover:text-gray-800">Interactivity</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
         
         {/* Context Header */}
         <div className="py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Selected Element</span>
            <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-700">{getTitle()}</span>
         </div>

         {/* DISPLAY & SIZING (Visual Mock mostly, but functional for shapes) */}
         <Accordion title="Display & Sizing">
            <div className="grid grid-cols-2 gap-3 mb-3">
               <InputRow label="Width">
                  <div className="flex h-8 bg-gray-50 border border-gray-200 rounded items-center px-2">
                     <span className="text-xs text-gray-500 flex-1">100</span>
                     <span className="text-[10px] text-gray-400">%</span>
                  </div>
               </InputRow>
               <InputRow label="Max W">
                  <div className="flex h-8 bg-gray-50 border border-gray-200 rounded items-center px-2">
                     <span className="text-xs text-gray-500 flex-1">1280</span>
                     <span className="text-[10px] text-gray-400">px</span>
                  </div>
               </InputRow>
            </div>
            
            {(selection === 'header' || selection === 'input_area') && (
              <InputRow label="Shape / Layout">
                 <div className="flex bg-gray-100 p-0.5 rounded border border-gray-200">
                    <button 
                      onClick={() => updateTheme(selection === 'header' ? 'headerStyle' : 'footerStyle', 'Square')}
                      className={`flex-1 py-1 text-[10px] font-medium rounded ${['Square', 'Minimal'].includes(selection === 'header' ? theme.headerStyle : theme.footerStyle) ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                    >
                      Sharp
                    </button>
                    <button 
                      onClick={() => updateTheme(selection === 'header' ? 'headerStyle' : 'footerStyle', 'Rounded')}
                      className={`flex-1 py-1 text-[10px] font-medium rounded ${['Rounded', 'Circle'].includes(selection === 'header' ? theme.headerStyle : theme.footerStyle) ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                    >
                      Round
                    </button>
                 </div>
              </InputRow>
            )}

            {(selection === 'bot_message') && (
               <InputRow label="Card Style">
                  <Select 
                    value={theme.responseCardStyle}
                    onChange={(val) => updateTheme('responseCardStyle', val)}
                    options={[
                       { label: 'Standard Bubble', value: 'Classic' },
                       { label: 'Glassmorphism', value: 'Glassmorphism' },
                       { label: 'Modern Card', value: 'Card' },
                       { label: 'Minimal', value: 'Minimal' },
                    ]}
                  />
               </InputRow>
            )}
         </Accordion>

         {/* TYPOGRAPHY */}
         <Accordion title="Typography">
            <InputRow label="Font Family">
               <div className="h-8 w-full bg-white border border-gray-200 rounded flex items-center px-2 text-xs text-gray-700">
                  {theme.fontFamily}
               </div>
            </InputRow>
            <div className="grid grid-cols-2 gap-3">
               <InputRow label="Size">
                  <div className="flex h-8 bg-white border border-gray-200 rounded items-center px-2">
                     <span className="text-xs text-gray-700 flex-1">14</span>
                     <span className="text-[10px] text-gray-400">px</span>
                  </div>
               </InputRow>
               <InputRow label="Weight">
                  <div className="flex h-8 bg-white border border-gray-200 rounded items-center px-2">
                     <span className="text-xs text-gray-700 flex-1">400</span>
                  </div>
               </InputRow>
            </div>
            
            <InputRow label="Text Color">
               <ColorPicker 
                 value={
                    selection === 'header' ? theme.headerText :
                    selection === 'bot_message' ? theme.botBubbleText :
                    selection === 'user_message' ? theme.userBubbleText :
                    selection === 'input_area' ? theme.inputBarText :
                    '#000000'
                 } 
                 onChange={(val) => {
                    if (selection === 'header') updateTheme('headerText', val);
                    if (selection === 'bot_message') updateTheme('botBubbleText', val);
                    if (selection === 'user_message') updateTheme('userBubbleText', val);
                    if (selection === 'input_area') updateTheme('inputBarText', val);
                 }}
               />
            </InputRow>
         </Accordion>

         {/* BACKGROUND & BORDER */}
         <Accordion title="Background & Border">
            <InputRow label="Fill Color">
               <ColorPicker 
                 value={
                    selection === 'global' ? theme.chatBg :
                    selection === 'header' ? theme.headerBg :
                    selection === 'bot_message' ? theme.botBubbleBg :
                    selection === 'user_message' ? theme.userBubbleBg :
                    selection === 'input_area' ? theme.footerBg :
                    theme.chatBg
                 } 
                 onChange={(val) => {
                    if (selection === 'global') updateTheme('chatBg', val);
                    if (selection === 'header') updateTheme('headerBg', val);
                    if (selection === 'bot_message') updateTheme('botBubbleBg', val);
                    if (selection === 'user_message') updateTheme('userBubbleBg', val);
                    if (selection === 'input_area') updateTheme('footerBg', val);
                 }}
               />
            </InputRow>

            {selection === 'input_area' && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                 <InputRow label="Input Field Fill">
                    <ColorPicker value={theme.inputBarBg} onChange={(val) => updateTheme('inputBarBg', val)} />
                 </InputRow>
                 <div className="h-2"></div>
                 <InputRow label="Send Button">
                    <ColorPicker value={theme.sendButtonBg} onChange={(val) => updateTheme('sendButtonBg', val)} />
                 </InputRow>
              </div>
            )}
         </Accordion>

      </div>
    </div>
  );
};

export default RightSidebar;