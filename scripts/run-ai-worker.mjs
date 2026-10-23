/**
 * Mutiny AI Local Micro-Worker (Footprint: ~350 MB)
 * Powered by Qwen2.5-0.5B-Instruct via Transformers.js ONNX
 * 
 * Run with: node scripts/run-ai-worker.mjs
 * Port: 11435
 */

import http from 'http';
import { pipeline } from '@huggingface/transformers';

const PORT = process.env.AI_WORKER_PORT || 11435;
let generator = null;
let isLoading = true;

console.log('[MUTINY AI] Initializing Qwen2.5-0.5B-Instruct micro architecture (~350 MB)...');

try {
  generator = await pipeline('text-generation', 'onnx-community/Qwen2.5-0.5B-Instruct', {
    dtype: 'q4',
  });
  isLoading = false;
  console.log(`[MUTINY AI] Micro model loaded and ready on http://127.0.0.1:${PORT}`);
} catch (err) {
  console.error('[MUTINY AI] Failed to initialize Qwen micro model:', err);
}

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: isLoading ? 'loading' : 'ready', model: 'Qwen2.5-0.5B-Instruct-Q4' }));
    return;
  }

  if (req.url === '/api/chat' && req.method === 'POST') {
    if (isLoading || !generator) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Model is currently loading' }));
      return;
    }

    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', async () => {
      try {
        const { messages, max_new_tokens = 150, temperature = 0.7 } = JSON.parse(body);
        if (!Array.isArray(messages) || messages.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid messages array' }));
          return;
        }

        const output = await generator(messages, {
          max_new_tokens,
          temperature,
        });

        const reply = output[0]?.generated_text?.at(-1)?.content || '';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply, model: 'qwen2.5-0.5b-onnx-q4' }));
      } catch (genErr) {
        console.error('[MUTINY AI] Generation error:', genErr);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: genErr.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[MUTINY AI] Local worker listening on http://127.0.0.1:${PORT}`);
});
