import React from 'react';
import CodeFormat from './codeformet';
import ExplanationFormat from './explanationformet';



interface ResponseRendererProps {
  content: string;
  textColor?: string;
  accentColor?: string;
}

// Simple heuristics to pick a renderer:
// - fenced code (```) -> CodeFormat
// - numbered steps ("1.", "1)") or lines starting with digits -> StepsFormat
// - otherwise -> ExplanationFormat
const ResponseRenderer: React.FC<ResponseRendererProps> = ({ content, textColor = 'inherit', accentColor = 'inherit' }) => {
  if (!content) return null;

  const trimmed = content.trim();

  // Code block heuristic
  if (/```/.test(trimmed)) {
    return <CodeFormat content={trimmed} textColor={textColor} />;
  }

  // JSON-like or code-like single-line (starts with { or [ and contains : or ")
  if (/^\s*[\{\[]/.test(trimmed) && /:\s*"?\w+"?/.test(trimmed)) {
    const codeFence = "```json\n" + trimmed + "\n```";
    return <CodeFormat content={codeFence} textColor={textColor} />;
  }

  // Steps heuristic: numbered lines or lines starting with digits
  const lines = trimmed.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const numbered = lines.some(l => /^\d+\s*[\.|\)]\s+/.test(l));
  const startsWithStep = /^steps?:?/i.test(lines[0] || '');
  
  

  // Fallback to explanation format (paragraphs, lists, headings)
  return <ExplanationFormat content={trimmed} textColor={textColor} accentColor={accentColor} />;
};

export default ResponseRenderer;
