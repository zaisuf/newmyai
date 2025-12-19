
export interface ThemeConfig {
  fontFamily: string;
  borderRadius: string;
  containerShape: 'rounded' | 'square';
  chatBg: string;
  headerStyle: string;
  headerBg: string;
  headerText: string;
  headerAlignment: 'left' | 'center';
  showStatusIndicator: boolean;
  footerStyle: string;
  footerBg: string;
  inputBarStyle: string;
  inputBarBg: string;
  inputBarText: string;
  inputPlaceholder: string;
  sendButtonStyle: string;
  sendButtonBg: string;
  sendButtonIconColor: string;
  responseCardStyle: string;
  botBubbleBg: string;
  botBubbleText: string;
  userBubbleBg: string;
  userBubbleText: string;
  loadingStyle: string;
  loadingColor: string;
  showLauncher: boolean;
  launcherBg: string;
  launcherIconColor: string;
  launcherLogoUrl?: string;
  launcherTagBg: string;
  launcherTagText: string;
  welcomeMessage: string;
  showWelcomeBubbles: boolean;
  suggestedQuestions: string[];
  // Additional optional properties used by specific preview/components
  headerColor1?: string;
  headerColor2?: string;
  headerColor3?: string;
  profileSubtitle?: string;
  profileBorderColor?: string;
  showPhoneButton?: boolean;
  showVideoButton?: boolean;
}

export interface AgentConfig {
  model: string;
  systemInstruction: string;
  knowledgeBase: string;
  temperature: number;
  crawledUrls?: string[];
  apiKey?: string;
}

export type SelectedElement = 'global' | 'header' | 'bot_message' | 'user_message' | 'input_area' | 'launcher';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'response' | 'condition';
  title: string;
  description: string;
  x: number;
  y: number;
}

export interface VoiceThemeConfig {
  visualizerType: 'Orb' | 'Waveform' | 'Bar' | 'Ripple' | 'Circle';
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  triggerStyle: 'Floating' | 'BottomBar' | 'Fullscreen' | 'Minimal';
  textColor: string;
  widgetBg: string;
  buttonBg: string;
  buttonTextColor: string;
  buttonIconColor: string;
  agentAvatar: string;
  widgetBorderRadius: string;
  buttonBorderRadius: string;
}

export interface VoiceAgentConfig {
  voiceId: string;
  stability: number;
  speed: number;
  model: string;
  systemInstruction: string;
  firstMessage: string;
  knowledgeBase: string;
  crawledUrls?: string[];
}
