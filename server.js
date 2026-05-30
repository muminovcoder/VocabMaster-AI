// SECURE: VocabMaster AI — Maximum Security Backend
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const { pool } = require('./config/db');
const {
  securityHeaders,
  corsOptions,
  globalLimiter,
  csrfProtection,
} = require('./middleware/security');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const profileRoutes = require('./routes/profile');
const anonymousRoutes = require('./routes/anonymous');

const app = express();
const PORT = process.env.PORT || 3001;

// ===== SECURITY MIDDLEWARE STACK =====
// Order matters for security

// 1. Security headers (helmet with strict CSP)
app.use(securityHeaders);

// 2. CORS (strict)
const cors = require('cors');
app.use(cors(corsOptions));

// 3. Cookie parser (for httpOnly token cookies)
app.use(cookieParser(process.env.COOKIE_SECRET));

// 4. Body parsing with size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '1kb' }));

// 5. Global rate limiting
app.use(globalLimiter);

// 6. Trust proxy (for rate limiter IP detection)
app.set('trust proxy', 1);

// ===== HEALTH CHECK =====
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({ status: 'error', message: 'Database unavailable' });
  }
});

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/anonymous', anonymousRoutes);

// ===== PRODUCTION: Serve frontend static files =====
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  const fs = require('fs');
  const frontendDir = path.join(__dirname, '..');

  // Serve static files from root (HTML, JS, etc.)
  app.use(express.static(frontendDir, {
    dotfiles: 'ignore',
    etag: true,
    maxAge: '1h',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      if (filePath.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
      }
    },
  }));

  // SPA fallback — serve index.html for all non-API routes
  const indexPath = path.join(frontendDir, '1779981256843_vocabmaster-ai (1).html');
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });
}

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ===== GLOBAL ERROR HANDLER =====
app.use((err, req, res, next) => {
  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production') {
    console.error('Server error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// ===== GRACEFUL SHUTDOWN =====
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing pool...');
  await pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing pool...');
  await pool.end();
  process.exit(0);
});

// ===== START =====
async function start() {
  try {
    // Test database connection
    await pool.query('SELECT 1');
    console.log('Database connected successfully');

    // Run schema migrations if tables don't exist
    const fs = require('fs');
    const path = require('path');
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf-8');
      // Only migrate if users table doesn't exist
      const tableCheck = await pool.query(
        "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')"
      );
      if (!tableCheck.rows[0].exists) {
        console.log('Running schema migration...');
        await pool.query(schema);
        console.log('Schema migration complete');
      }
    }

    app.listen(PORT, () => {
      console.log(`VocabMaster AI backend running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
