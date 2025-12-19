"use client"
import React, { Suspense, ReactNode, Component } from 'react';
// Use react-router-dom for browser routing APIs
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';

// Lazy load the Pages
const ChatFlowPage = React.lazy(() => import('./app/chatflow/page'));
const VoiceFlowPage = React.lazy(() => import('./app/voiceflow/page'));
const LoginPage = React.lazy(() => import('./app/login/page'));
const DashboardPage = React.lazy(() => import('./app/dashboard/page'));
const PricingPage = React.lazy(() => import('./app/pricing/page'));
const AgentWidgetsPage = React.lazy(() => import('./app/agent-widgets/page'));
const MyAgentsPage = React.lazy(() => import('./app/my-agents/page'));
const EmbedPage = React.lazy(() => import('./app/embed/page'));

// New informational pages
const PrivacyPage = React.lazy(() => import('./app/privacy/page'));
const TermsPage = React.lazy(() => import('./app/terms/page'));
const GDPRPage = React.lazy(() => import('./app/gdpr/page'));

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component to catch and handle UI crashes gracefully.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Fix: Explicitly declare state and initialize it as a class field to resolve property existence errors in TypeScript
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    // Fix: Access state through 'this' correctly typed via inheritance from Component
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg border border-red-500/30">
            <h2 className="text-xl font-bold text-red-400 mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-4 text-sm">The application encountered a critical error and could not render.</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    // Fix: Access props correctly typed via inheritance from Component
    return this.props.children;
  }
}

const Loader = ({ text }: { text: string }) => (
  <div className="h-screen w-screen flex items-center justify-center bg-white text-slate-900 font-sans">
    <div className="flex flex-col items-center gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{text}</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
        <Suspense fallback={<Loader text="Initializing ChatiFicial..." />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chatflow/:agentId" element={<ChatFlowPage />} />
            <Route path="/voiceflow/:agentId" element={<VoiceFlowPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/agent-widgets" element={<AgentWidgetsPage />} />
            <Route path="/my-agents" element={<MyAgentsPage />} />
            <Route path="/embed/:agentId" element={<EmbedPage />} />
            
            {/* Informational Routes */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/gdpr" element={<GDPRPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
    </ErrorBoundary>
  );
};

export default App;