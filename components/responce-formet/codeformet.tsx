import React from 'react';
// Syntax highlighter (Prism) for colored code blocks
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeFormatProps {
  content: string;
  textColor?: string;
}

const CodeFormat: React.FC<CodeFormatProps> = ({ content, textColor = 'inherit' }) => {
  // Parse fenced code block: allow optional language after opening fence
  let explanation = content;
  let codeContent = '';
  let language = '';
  const fenceMatch = content.match(/```(\w+)?\n?([\s\S]*?)```/);
  if (fenceMatch) {
    language = fenceMatch[1] || '';
    codeContent = fenceMatch[2] || '';
    explanation = content.replace(fenceMatch[0], '').trim();
  } else {
    // Fallback: if no triple fence detected, try a simple split
    const parts = content.split('```');
    explanation = parts[0].trim();
    codeContent = parts.length > 1 ? parts[1].trim() : (parts[0] || '').trim();
  }

  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Try to infer language and format JSON if applicable.
  const normalizeLang = (lang: string) => {
    if (!lang) return '';
    const l = lang.toLowerCase();
    const map: Record<string, string> = {
      js: 'javascript',
      jsx: 'jsx',
      ts: 'typescript',
      tsx: 'tsx',
      html: 'markup', // prism uses 'markup' for HTML
      xml: 'markup',
      json: 'json',
      css: 'css',
      scss: 'scss',
      shell: 'bash',
      sh: 'bash',
      py: 'python',
      python: 'python',
    };
    return map[l] || l;
  };

  const inferLanguageFromContent = (code: string) => {
    const t = code.trim();
    if (!t) return '';
    // JSON detection: starts with { or [ and is valid JSON
    if ((t.startsWith('{') || t.startsWith('['))) {
      try {
        JSON.parse(t);
        return 'json';
      } catch (e) {
        // not valid JSON, fallthrough
      }
    }
    // HTML / XML
    if (t.startsWith('<') && /<[a-zA-Z]+/.test(t)) return 'markup';
    // JS/TS heuristics
    if (/\b(function|const|let|var|=>)\b/.test(t)) return 'javascript';
    if (/\b(import|export|interface|type)\b/.test(t)) return 'typescript';
    // CSS
    if (/^[\.\#][a-zA-Z0-9\-_]+\s*\{/.test(t) || /:[\s]*[a-zA-Z\-]+;/.test(t)) return 'css';
    return '';
  };

  // If user specified language, normalize it. If not, try to detect from content.
  language = normalizeLang(language || inferLanguageFromContent(codeContent));

  // If content looks like JSON (even without fence), try to pretty-print it and set language to json
  if (language === 'json' || (!language && (() => { try { JSON.parse(codeContent); return true } catch { return false } })())) {
    try {
      const parsed = JSON.parse(codeContent);
      codeContent = JSON.stringify(parsed, null, 2);
      language = 'json';
    } catch (e) {
      // leave as-is
    }
  }

  // Reuse light sanitizer for the explanation (do not touch code content)
  const sanitize = (s: string) => {
    if (!s) return s;
    let out = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)'); // [label](url) -> label (url)
    out = out.replace(/<[^>]*>/g, ''); // strip HTML
    out = out.replace(/["',#`]/g, ''); // remove quotes, commas, hashes, backticks
    out = out.replace(/\*+/g, ''); // remove asterisks
    out = out.replace(/✅/g, '✔'); // normalize checkmark
    out = out.replace(/\s{2,}/g, ' ').trim();
    return out;
  };

  // Render explanation with the same style rules as Steps/Explanation
  const renderExplanation = () => {
    if (!explanation) return null;
    const lines = explanation.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return null;

    const elems: React.ReactElement[] = [];
    let firstParagraphRendered = false;
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const text = lines[i];

      // Numbered step like '1. Title' or '1) Title' - treat like StepsFormat
        const numberedMatch = text.match(/^\s*(\d+)\s*[\.\)]\s*(.*)$/);
        if (numberedMatch) {
          const title = numberedMatch[2] || numberedMatch[1];
          // If title contains a colon, split into heading + explanation
          const colonIdx = title.indexOf(':');
          if (colonIdx > 0) {
            const headRaw = sanitize(title.slice(0, colonIdx).trim());
            const explRaw = sanitize(title.slice(colonIdx + 1).trim());
            elems.push(
              <div key={key++}>
                    <div style={{ color: textColor }} className="text-sm font-medium">{headRaw}</div>
                    <div style={{ color: textColor, opacity: 0.88 }} className="text-sm font-medium leading-relaxed">{explRaw}</div>
                </div>
            );
          } else {
            elems.push(
              <p key={key++} style={{ color: textColor }} className="text-sm leading-relaxed font-medium">{sanitize(title)}</p>
            );
          }
          continue;
        }

      // List
      if (/^[-\*\u2022]\s+/.test(text)) {
        const items = text.split(/\s*[-\*\u2022]\s+/).filter(Boolean);
        elems.push(
          <ul key={key++} className="ml-5 list-disc list-inside space-y-1">
            {items.map((it, j) => {
              const rawItem = it.trim();
              const colonIdx = rawItem.indexOf(':');
              if (colonIdx > 0) {
                const label = sanitize(rawItem.slice(0, colonIdx).trim());
                const value = sanitize(rawItem.slice(colonIdx + 1).trim());
                return (
                  <li key={j} className="text-sm font-medium break-words" style={{ color: textColor }}>
                    <span>{label}:</span>{' '}
                    <span style={{ opacity: 0.88 }}>{value}</span>
                  </li>
                );
              }
              return (
                <li key={j} style={{ color: textColor }} className="text-sm font-medium">{sanitize(rawItem)}</li>
              );
            })}
          </ul>
        );
        continue;
      }

      // label: value
      const colonIndex = text.indexOf(':');
      if (colonIndex > 0) {
        const label = text.slice(0, colonIndex).trim();
        const value = text.slice(colonIndex + 1).trim();
        elems.push(
          <div key={key++} className="mt-1">
            {/* Use unified size for label and value (text-base) */}
            <div style={{ color: textColor }} className="text-sm font-medium">{sanitize(label)}</div>
            <div style={{ color: textColor, opacity: 0.88 }} className="text-sm font-medium ml-3 leading-relaxed">{sanitize(value)}</div>
          </div>
        );
        continue;
      }

      elems.push(
        <p key={key++} style={{ color: textColor }} className="text-sm leading-relaxed font-medium">{sanitize(text)}</p>
      );
    }

    return elems;
  };

  return (
    <div
      className="w-full pl-2 formatted-code space-y-3"
      style={{
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        color: textColor,
      }}
    >
      {explanation ? renderExplanation() : null}

      <div className="relative group w-full">
        <div className="flex justify-between items-center px-3 py-2 mb-0">
          <div className="text-sm font-medium opacity-50" style={{ color: textColor }}>Code</div>
        </div>
        <div className="relative">
          <div className="w-full bg-black/20 backdrop-blur-sm rounded-md overflow-hidden border border-white/10">
            <SyntaxHighlighter
              language={language || 'text'}
              style={oneDark}
              wrapLongLines={true}
              showLineNumbers={false}
              customStyle={{
                margin: 0,
                padding: '0.75rem 0.75rem',
                background: 'transparent',
                borderRadius: 8,
                // match Tailwind text-sm to slightly reduce code explanation size
                fontSize: '1rem',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace'
              }}
              // let the Prism theme control token colors; avoid forcing a global color here
              codeTagProps={{ style: { whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontWeight: 600 } }}
            >
              {codeContent}
            </SyntaxHighlighter>
          </div>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-800/80 hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-200"
            title="Copy code"
            type="button"
          >
          {isCopied ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emerald-400"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 group-hover:text-gray-200"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
          </button>
        </div>
      </div>

      <style jsx>{`
        .formatted-code a { color: inherit !important; text-decoration: none !important; }
      `}</style>
    </div>
  );
};

export default CodeFormat;
