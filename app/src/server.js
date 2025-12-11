// server.js — minimal + safe improvements
'use strict';

const express = require('express');
const cors = require('cors');

const app = express();

// Config
const PORT = parseInt(process.env.PORT || '3000', 10);
const APP_NAME = process.env.APP_NAME || 'my-app';
const APP_VERSION = process.env.APP_VERSION || '0.0.0';
const ENABLE_CORS = process.env.ENABLE_CORS === 'true';

// Middleware
app.use(express.json({
  // optional: limit: '1mb'
}));

if (ENABLE_CORS) {
  app.use(cors());
}

// Simple request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`);
  });
  next();
});

// Routes
app.get('/', (req, res) => {
  res.type('html').send(`
    <html>
      <head><title>${APP_NAME}</title></head>
      <body style="font-family:system-ui,Segoe UI,Roboto,Arial;text-align:center;padding:50px;">
        <h1 style="font-size:48px">${APP_NAME} - v${APP_VERSION}</h1>
        <p style="font-size:20px">Service is running.</p>
        <p><a href="/health">/health</a> • <a href="/ready">/ready</a></p>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime_seconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get('/ready', (req, res) => {
  res.json({ ready: true, timestamp: new Date().toISOString() });
});

app.post('/api/echo', (req, res) => {
  const payload = req.body || {};
  res.json({ ok: true, received: payload });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'not_found' });
});

// JSON body parse error handler + central error handler
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    // bad JSON
    console.warn('Bad JSON received:', err.message);
    return res.status(400).json({ error: 'invalid_json', message: 'Malformed JSON' });
  }
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  res.status(500).json({ error: 'internal_server_error' });
});

// Start server with graceful shutdown
const server = app.listen(PORT, () => {
  console.log(`${APP_NAME} listening on port ${PORT} (v${APP_VERSION})`);
});

// Graceful shutdown handler
const gracefulShutdown = () => {
  console.log('Graceful shutdown triggered, closing server..');
  server.close((err) => {
    if (err) {
      console.error('Error while closing HTTP server:', err);
      process.exit(1);
    }
    console.log('HTTP server closed, exiting process.');
    process.exit(0);
  });

  // force exit after 10s
  setTimeout(() => {
    console.warn('Forcing shutdown after timeout.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// log unhandled exceptions/rejections, then exit so process manager can restart
process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err && err.stack ? err.stack : err);
  // give logs a moment to flush then exit
  setTimeout(() => process.exit(1), 100);
});

process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason);
  setTimeout(() => process.exit(1), 100);
});

module.exports = app;
