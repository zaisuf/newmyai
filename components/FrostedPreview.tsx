"use client"
import React from 'react'
import { ThemeConfig, AgentConfig } from '../types'

type Props = {
  theme: ThemeConfig
  agentConfig: AgentConfig
}

const FrostedPreview: React.FC<Props> = ({ theme, agentConfig }) => {
  const headerStyle: React.CSSProperties = {
    background: theme.headerBg || 'linear-gradient(135deg, #2563eb 0%, #9333ea 50%, #ec4899 100%)',
    color: theme.headerText || '#ffffff'
  }

  return (
    <div className="w-full h-full max-w-[420px] max-h-[650px] rounded-3xl shadow-2xl overflow-hidden" style={{ fontFamily: theme.fontFamily }}>
      <div className="px-5 py-4" style={headerStyle}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-black">F</div>
          <div>
            <div className="text-xs font-black tracking-tight">Frosted AI Unit</div>
            <div className="text-[10px] opacity-80">{agentConfig.model}</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white h-[520px] flex flex-col gap-4" style={{ background: theme.chatBg }}>
        <div className="flex-1 overflow-auto flex flex-col gap-3">
          <div className="self-start max-w-[80%] bg-white/80 border border-slate-100 rounded-2xl p-3 shadow-sm" style={{ color: theme.botBubbleText, background: theme.botBubbleBg }}>
            <div className="text-sm">Hello — I'm your frosted assistant. How can I assist today?</div>
          </div>

          <div className="self-end max-w-[75%] bg-indigo-600 text-white rounded-2xl p-3 shadow" style={{ background: theme.userBubbleBg, color: theme.userBubbleText }}>
            <div className="text-sm">Show me pricing</div>
          </div>

          <div className="self-start max-w-[80%] bg-white/80 border border-slate-100 rounded-2xl p-3 shadow-sm" style={{ color: theme.botBubbleText, background: theme.botBubbleBg }}>
            <div className="text-sm">Sure — our starter plan is $9/mo, with advanced options available.</div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-3">
            <input className="flex-1 px-4 py-2 rounded-full border border-slate-200 bg-white text-sm" placeholder={theme.inputPlaceholder || 'Reply ...'} />
            <button className="px-4 py-2 rounded-full text-white font-bold" style={{ background: theme.sendButtonBg || '#4f46e5' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrostedPreview
