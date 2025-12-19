import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.API_KEY;
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY not configured on server' }, { status: 401 });
    }

    const body = await req.json();
    const { model, messages, temperature } = body;

    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'X-Title': 'ChatiFicial AI Agent Builder (Proxy)'
      },
      body: JSON.stringify({ model, messages, temperature })
    });

    const text = await r.text();
    return new NextResponse(text, { status: r.status, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error('OpenRouter proxy error', err);
    return NextResponse.json({ error: err?.message || 'Proxy failed' }, { status: 500 });
  }
}
