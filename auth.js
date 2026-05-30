// SECURE: Authentication routes — register, login, logout, refresh
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { query, transaction } = require('../config/db');
const {
  authenticate,
  generateAccessToken,
  generateRefreshToken,
  setAuthCookies,
  clearAuthCookies,
} = require('../middleware/auth');
const {
  authLimiter,
  csrfProtection,
  validatePasswordStrength,
  registerValidation,
  loginValidation,
  handleValidation,
} = require('../middleware/security');

const router = express.Router();

const SALT_ROUNDS = 14;

// SECURE: Hash a refresh token for storage
function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// SECURE: POST /api/auth/register
router.post('/register', authLimiter, registerValidation, handleValidation, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Password strength
    const pwErrors = validatePasswordStrength(password);
    if (pwErrors.length > 0) {
      return res.status(422).json({ error: 'Weak password', details: pwErrors });
    }

    // Check existing user
    const existing = await query(
      'SELECT id FROM users WHERE email = $1 OR username = $2 LIMIT 1',
      [email, username]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Hash password with bcrypt 14 rounds
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user and stats in transaction
    const result = await transaction(async (client) => {
      const user = await client.query(
        `INSERT INTO users (username, email, password_hash, display_name)
         VALUES ($1, $2, $3, $4) RETURNING id, username, email, created_at`,
        [username, email, passwordHash, username]
      );

      await client.query(
        `INSERT INTO user_stats (user_id) VALUES ($1)`,
        [user.rows[0].id]
      );

      return user.rows[0];
    });

    // Generate tokens
    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);

    // Store hashed refresh token
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await query(
      `INSERT INTO refresh_tokens (user_id, token_hash, ip_address, expires_at)
       VALUES ($1, $2, $3::inet, $4)`,
      [result.id, tokenHash, req.ip || '0.0.0.0', expiresAt]
    );

    // Set cookies
    const csrfToken = setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: result.id,
        username: result.username,
        email: result.email,
        displayName: username,
      },
      csrfToken,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// SECURE: POST /api/auth/login
router.post('/login', authLimiter, loginValidation, handleValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user with lockout check
    const userResult = await query(
      `SELECT id, username, email, password_hash, display_name, failed_attempts, locked_until
       FROM users WHERE email = $1 AND is_active = TRUE LIMIT 1`,
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // Check account lockout
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const remaining = Math.ceil((new Date(user.locked_until) - new Date()) / 1000 / 60);
      return res.status(423).json({
        error: `Account locked. Try again in ${remaining} minutes`,
        code: 'ACCOUNT_LOCKED',
      });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      // Increment failed attempts
      const newAttempts = (user.failed_attempts || 0) + 1;
      let lockUntil = null;
      if (newAttempts >= 5) {
        lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min lockout
      }
      await query(
        'UPDATE users SET failed_attempts = $1, locked_until = $2 WHERE id = $3',
        [newAttempts, lockUntil, user.id]
      );

      const remaining = 5 - (user.failed_attempts || 0);
      return res.status(401).json({
        error: `Invalid credentials. ${remaining > 0 ? `${remaining} attempts remaining` : 'Account locked for 15 minutes'}`,
      });
    }

    // Reset failed attempts on success
    await query(
      'UPDATE users SET failed_attempts = 0, locked_until = NULL, last_login_at = NOW() WHERE id = $1',
      [user.id]
    );

    // Generate tokens
    const userData = { id: user.id, username: user.username, email: user.email };
    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    // Store hashed refresh token
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await query(
      `INSERT INTO refresh_tokens (user_id, token_hash, ip_address, expires_at)
       VALUES ($1, $2, $3::inet, $4)`,
      [user.id, tokenHash, req.ip || '0.0.0.0', expiresAt]
    );

    // Set cookies
    const csrfToken = setAuthCookies(res, accessToken, refreshToken);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.display_name,
      },
      csrfToken,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// SECURE: POST /api/auth/logout
router.post('/logout', authenticate, async (req, res) => {
  try {
    // Blacklist the access token
    await query(
      'INSERT INTO token_blacklist (token_jti, user_id, expires_at, reason) VALUES ($1, $2, NOW() + INTERVAL \'15 minutes\', $3)',
      [req.tokenJti, req.user.id, 'logout']
    );

    // Revoke all refresh tokens for this user
    await query(
      'UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL',
      [req.user.id]
    );

    clearAuthCookies(res);

    res.json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// SECURE: POST /api/auth/refresh
router.post('/refresh', authLimiter, async (req, res) => {
  const refreshToken = req.cookies?.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, {
      algorithms: ['HS256'],
      issuer: 'vocabmaster-ai',
    });

    const tokenHash = hashToken(refreshToken);
    const stored = await query(
      `SELECT id, user_id, revoked_at, replaced_by, is_compromised
       FROM refresh_tokens
       WHERE token_hash = $1 AND expires_at > NOW()
       LIMIT 1`,
      [tokenHash]
    );

    if (stored.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const storedToken = stored.rows[0];

    // SECURE: Token reuse detection
    if (storedToken.revoked_at || storedToken.is_compromised) {
      // This token has been reused — possible token theft
      // Revoke ALL tokens for this user
      await query(
        'UPDATE refresh_tokens SET revoked_at = NOW(), is_compromised = TRUE WHERE user_id = $1',
        [storedToken.user_id]
      );
      clearAuthCookies(res);
      return res.status(401).json({ error: 'Token reuse detected. All sessions revoked for security.' });
    }

    // Get user
    const userResult = await query(
      'SELECT id, username, email FROM users WHERE id = $1 AND is_active = TRUE LIMIT 1',
      [storedToken.user_id]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    // Revoke old refresh token (token rotation)
    await query(
      'UPDATE refresh_tokens SET revoked_at = NOW(), replaced_by = $1 WHERE id = $2',
      [decoded.jti, storedToken.id]
    );

    // Generate new tokens
    const userData = { id: user.id, username: user.username, email: user.email };
    const newAccessToken = generateAccessToken(userData);
    const newRefreshToken = generateRefreshToken(userData);

    // Store new hashed refresh token
    const newTokenHash = hashToken(newRefreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await query(
      `INSERT INTO refresh_tokens (user_id, token_hash, ip_address, expires_at)
       VALUES ($1, $2, $3::inet, $4)`,
      [user.id, newTokenHash, req.ip || '0.0.0.0', expiresAt]
    );

    // Set new cookies
    const csrfToken = setAuthCookies(res, newAccessToken, newRefreshToken);

    res.json({
      message: 'Token refreshed',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      csrfToken,
    });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      clearAuthCookies(res);
      return res.status(401).json({ error: 'Refresh token expired. Please login again.' });
    }
    console.error('Refresh error:', err);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// SECURE: GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, username, email, display_name, avatar_url, created_at, last_login_at
       FROM users WHERE id = $1 LIMIT 1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

module.exports = router;
