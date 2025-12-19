import React from 'react';

interface ExplanationFormatProps {
  content: string;
  textColor?: string;
  accentColor?: string;
}

const ExplanationFormat: React.FC<ExplanationFormatProps> = ({ content, textColor = 'inherit', accentColor = 'inherit' }) => {
  // Normalize common heading shorthand
  const normalized = content.replace(/^Heading:\s*/gim, '# ');

  // Helper to remove unwanted keyboard characters for display only
  // Also remove HTML tags and convert markdown links [text](url) -> 'text (url)'
  const sanitize = (s: string) => {
    if (!s) return s;
    // convert markdown links to plain text: [label](url) -> label (url)
    let out = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');
    // strip any HTML tags to avoid anchor elements or styling
    out = out.replace(/<[^>]*>/g, '');
    // remove quotes, commas, hashes, backticks and asterisks used for markdown bold/italic
    out = out.replace(/["',#`]/g, '');
    // remove leftover asterisks (including double) used for bold/italic
    out = out.replace(/\*+/g, '');
    // collapse multiple spaces
    out = out.replace(/\s{2,}/g, ' ').trim();
    return out;
  };

  // Split lines and iterate, collecting lists and rendering semantic elements
  const lines = normalized.split(/\r?\n/);
  const elements: React.ReactElement[] = [];
  let pendingList: string[] = [];
  let key = 0;
  let firstParagraphRendered = false;

  const flushList = () => {
    if (pendingList.length === 0) return;
    elements.push(
      <ul key={key++} className="ml-6 list-disc list-inside space-y-1">
        {pendingList.map((it, i) => {
          const rawItem = it.replace(/^\-\s*/, '').trim();
          const colonIdx = rawItem.indexOf(':');
          if (colonIdx > 0) {
            const label = sanitize(rawItem.slice(0, colonIdx).trim());
            const value = sanitize(rawItem.slice(colonIdx + 1).trim());
            return (
              <li key={i} className="text-sm font-medium break-words" style={{ color: textColor }}>
                <span>{label}:</span>{' '}
                <span style={{ opacity: 0.88 }}>{value}</span>
              </li>
            );
          }
          return (
            <li key={i} style={{ color: textColor }} className="text-sm font-medium">
              {sanitize(rawItem)}
            </li>
          );
        })}
      </ul>
    );
    pendingList = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) {
      flushList();
      continue; // collapse blank lines
    }

    // List item
    if (/^-\s+/.test(line)) {
      pendingList.push(line);
      continue;
    }

    // Headings - use semantic tags for clearer structure
    const hMatch = line.match(/^(#+)\s+(.*)$/);
    if (hMatch) {
      flushList();
      const level = Math.min(hMatch[1].length, 6);
      const headingRaw = hMatch[2];

      // Collect following lines as explanation until a blank line or next structural marker
      const explLines: string[] = [];
      let j = i + 1;
      while (j < lines.length) {
        const nxt = lines[j].trim();
        if (!nxt) break;
        if (/^-/ .test(nxt)) break; // next list
        if (/^(#+)\s+/.test(nxt)) break; // next heading
        if (/^\d+[\.\)]\s+/.test(nxt)) break; // numbered
        if (nxt.indexOf(':') > 0) break; // label:value
        explLines.push(nxt);
        j++;
      }

      const headingText = sanitize(headingRaw);
        if (explLines.length > 0) {
        const explText = sanitize(explLines.join(' '));
        if (level === 1) {
          elements.push(
            <div key={key++}>
              <h2 style={{ color: textColor }} className="text-sm font-medium mt-4 mb-2">{headingText}</h2>
              <div style={{ color: textColor, opacity: 0.88 }} className="text-sm font-medium leading-relaxed">{explText}</div>
            </div>
          );
        } else {
          elements.push(
            <div key={key++}>
              <h3 style={{ color: textColor }} className="text-sm font-medium mt-2 mb-1">{headingText}</h3>
              <div style={{ color: textColor, opacity: 0.88 }} className="text-sm font-medium leading-relaxed">{explText}</div>
            </div>
          );
        }
        i = j - 1;
      } else {
        if (level === 1) {
          elements.push(<h2 key={key++} style={{ color: textColor }} className="text-sm font-medium mt-4 mb-2">{headingText}</h2>);
        } else {
          elements.push(<h3 key={key++} style={{ color: textColor }} className="text-sm font-medium mt-2 mb-1">{headingText}</h3>);
        }
      }

      continue;
    }

    // Label: Value
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      flushList();
      const label = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      elements.push(
        <p key={key++} className="text-sm font-medium break-words whitespace-normal">
          <span style={{ color: textColor }}>{sanitize(label)}:</span>{' '}
          <span style={{ color: textColor, opacity: 0.88 }}>{sanitize(value)}</span>
        </p>
      );
      continue;
    }

    // Plain paragraph
    flushList();
    elements.push(
      <p key={key++} style={{ color: textColor }} className="text-sm leading-relaxed font-medium break-words whitespace-normal">{sanitize(line)}</p>
    );
  }

  flushList();

  return (
    <div
      className="space-y-2 formatted-content"
      style={{
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        color: textColor,
      }}
    >
      {elements}
      <style jsx>{`
        .formatted-content a { color: inherit !important; text-decoration: none !important; }
      `}</style>
    </div>
  );
};

export default ExplanationFormat;
