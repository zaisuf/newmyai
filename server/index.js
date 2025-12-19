#!/usr/bin/env node
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Proxy endpoint to OpenRouter
app.post('/api/openrouter', async (req, res) => {
  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.API_KEY;
    if (!OPENROUTER_API_KEY) {
      return res.status(401).json({ error: 'OPENROUTER_API_KEY not configured on server' });
    }

    const { model, messages, temperature } = req.body;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'X-Title': 'ChatiFicial AI Agent Builder (Proxy)'
      },
      body: JSON.stringify({ model, messages, temperature })
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ error: err.message || 'Proxy failed' });
  }
});

// Serve static build (optional)
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
