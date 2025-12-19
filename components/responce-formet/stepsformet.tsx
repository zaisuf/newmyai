"use client";
import React from 'react';

type Props = {
  content: string;
  textColor?: string;
  accentColor?: string;
};

/**
 * StepsFormat (Explanation-style)
 * - Uses the same parsing/sanitization strategy as `ExplanationFormat` so the UI is consistent.
 * - Renders headings, numbered lists, bullets, label:value, and paragraphs.
 * - All visible text uses `text-sm` and `font-light` for a thinner appearance.
 * - Forces a readable white color (#ffffff) when `textColor` is 'inherit' or not provided.
 */
const StepsFormat: React.FC<Props> = ({ content, textColor = 'inherit' }) => {
  const effectiveTextColor = textColor && textColor !== 'inherit' ? textColor : '#ffffff';

  // Reuse same sanitize rules as ExplanationFormat (links -> plain, strip HTML, remove junk chars)
  const sanitize = (s: string) => {
    if (!s) return s;
    let out = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');
    out = out.replace(/<[^>]*>/g, '');
    out = out.replace(/["',#`]/g, '');
    out = out.replace(/\*+/g, '');
    out = out.replace(/[\*\.<>\{\}\[\]]/g, '');
    out = out.replace(/✅/g, '✔');
    out = out.replace(/\s{2,}/g, ' ').trim();
    return out;
  };

  const lines = content.split(/\r?\n/);
  const elements: React.ReactElement[] = [];
  let pendingList: string[] = [];
  let key = 0;

  const flushList = () => {
    if (pendingList.length === 0) return;
    elements.push(
      <ol key={key++} className="ml-6 list-decimal space-y-1">
        {pendingList.map((it, i) => {
          const raw = it.replace(/^\s*\d+[\.\)]\s*/, '');
          const colonIdx = raw.indexOf(':');
          if (colonIdx > 0) {
            const headRaw = raw.slice(0, colonIdx).trim();
            const explRaw = raw.slice(colonIdx + 1).trim();
            return (
              <li key={i} style={{ color: effectiveTextColor }} className="text-sm font-medium leading-relaxed break-words">
                  <div className="text-sm font-medium">{sanitize(headRaw)}</div>
                  <div className="text-sm font-medium" style={{ opacity: 0.88 }}>{sanitize(explRaw)}</div>
                </li>
            );
          }
          return (
            <li key={i} style={{ color: effectiveTextColor }} className="text-sm font-medium leading-relaxed break-words">
              {sanitize(raw)}
            </li>
          );
        })}
      </ol>
    );
    pendingList = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }

    // Numbered list item
    if (/^\d+[\.|\)]\s+/.test(line)) {
      pendingList.push(line);
      continue;
    }

    // Bullet
    if (/^[-\*•]\s+/.test(line)) {
      flushList();
      const rawItem = line.replace(/^[-\*•]\s+/, '');
      const colonIdx = rawItem.indexOf(':');
      if (colonIdx > 0) {
        const headRaw = rawItem.slice(0, colonIdx).trim();
        const explRaw = rawItem.slice(colonIdx + 1).trim();
        elements.push(
          <ul key={key++} className="ml-6 list-disc space-y-1">
            <li style={{ color: effectiveTextColor }} className="text-sm font-medium leading-relaxed break-words">
              <div className="text-sm font-medium">{sanitize(headRaw)}</div>
              <div className="text-sm font-medium" style={{ opacity: 0.88 }}>{sanitize(explRaw)}</div>
            </li>
          </ul>
        );
      } else {
        elements.push(
          <ul key={key++} className="ml-6 list-disc space-y-1">
            <li style={{ color: effectiveTextColor }} className="text-sm font-medium leading-relaxed break-words">{sanitize(rawItem)}</li>
          </ul>
        );
      }
      continue;
    }

    // Heading shortcut (# ). If a following paragraph/explanation is present (one or more lines),
    // render it together but make the explanation slightly dimmer than the heading.
    const hMatch = line.match(/^(#+)\s+(.*)$/);
    if (hMatch) {
      flushList();
      const level = Math.min(hMatch[1].length, 6);
      const headingText = sanitize(hMatch[2]);

      // Collect following lines as explanation until a blank line or next structural marker
      const explLines: string[] = [];
      let j = i + 1;
      while (j < lines.length) {
        const nxt = lines[j].trim();
        if (!nxt) break; // stop on blank line
        // stop if next line is a list, heading, or label:value
        if (/^\d+[\.\)]\s+/.test(nxt)) break;
        if (/^[-\*•]\s+/.test(nxt)) break;
        if (/^(#+)\s+/.test(nxt)) break;
        if (nxt.indexOf(':') > 0) break;
        explLines.push(nxt);
        j++;
      }

      if (explLines.length > 0) {
        // render heading then explanation with slightly reduced brightness
        const explText = sanitize(explLines.join(' '));
        if (level === 1) {
          elements.push(
            <div key={key++}>
              <div style={{ color: effectiveTextColor }} className="text-sm font-medium mt-4 mb-1">{headingText}</div>
              <div style={{ color: effectiveTextColor, opacity: 0.88 }} className="text-sm font-medium leading-relaxed">{explText}</div>
            </div>
          );
        } else {
          elements.push(
            <div key={key++}>
              <div style={{ color: effectiveTextColor }} className="text-sm font-medium mt-2 mb-1">{headingText}</div>
              <div style={{ color: effectiveTextColor, opacity: 0.88 }} className="text-sm font-medium leading-relaxed">{explText}</div>
            </div>
          );
        }
        // advance the loop index to skip consumed explanation lines
        i = j - 1;
      } else {
  if (level === 1) elements.push(<h2 key={key++} style={{ color: effectiveTextColor }} className="text-sm font-medium mt-4 mb-2">{headingText}</h2>);
  else elements.push(<h3 key={key++} style={{ color: effectiveTextColor }} className="text-sm font-medium mt-2 mb-1">{headingText}</h3>);
      }
      continue;
    }

    // Label: Value
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      flushList();
      const label = sanitize(line.slice(0, colonIndex).trim());
      const value = sanitize(line.slice(colonIndex + 1).trim());
      elements.push(
        <p key={key++} className="text-sm font-medium break-words whitespace-normal">
          <span style={{ color: effectiveTextColor }}>{label}:</span>{' '}
          <span style={{ color: effectiveTextColor }}>{value}</span>
        </p>
      );
      continue;
    }

    // Paragraph
    flushList();
    elements.push(
      <p key={key++} style={{ color: effectiveTextColor }} className="text-sm leading-relaxed font-medium break-words whitespace-normal">{sanitize(line)}</p>
    );
  }

  flushList();

  return (
    <div className="space-y-2 formatted-content" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', color: effectiveTextColor }}>
      {elements}
      <style jsx>{`
        .formatted-content a { color: inherit !important; text-decoration: none !important; }
      `}</style>
    </div>
  );
};

export default StepsFormat;
