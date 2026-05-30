// SECURE: Profile routes — get, update profile, change password
const express = require('express');
const bcrypt = require('bcrypt');
const { query } = require('../config/db');
const { authenticate } = require('../middleware/auth');
const { csrfProtection, handleValidation } = require('../middleware/security');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const SALT_ROUNDS = 14;

// SECURE: Validation chains
const updateProfileValidation = [
  body('displayName').optional().trim().isLength({ max: 100 }).escape(),
  body('bio').optional().trim().isLength({ max: 500 }).escape(),
  body('location').optional().trim().isLength({ max: 200 }).escape(),
  body('website').optional().trim().isURL({ require_protocol: false }).withMessage('Invalid URL'),
  body('nativeLanguage').optional().trim().isLength({ max: 50 }).escape(),
  body('targetLanguage').optional().trim().isLength({ max: 50 }).escape(),
  body('dailyWordGoal').optional().isInt({ min: 1, max: 200 }).toInt(),
  body('studyGoal').optional().isIn(['casual', 'regular', 'intensive', 'hardcore']),
  body('avatarUrl').optional().trim().isURL({ require_protocol: true }).withMessage('Invalid avatar URL'),
  body('theme').optional().isIn(['dark', 'light', 'auto']),
  body('notifications').optional().isObject(),
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Must contain an uppercase letter')
    .matches(/[0-9]/).withMessage('Must contain a number')
    .matches(/[^A-Za-z0-9]/).withMessage('Must contain a special character'),
];

function handleProfileValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'Validation failed', details: errors.array().map(e => e.msg) });
  }
  next();
}

// SECURE: GET /api/profile
router.get('/', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT
        u.id, u.username, u.email, u.created_at, u.last_login_at,
        up.display_name, up.avatar_url, up.bio, up.location, up.website,
        up.native_language, up.target_language, up.daily_word_goal, up.study_goal,
        up.notification_preferences, up.theme
      FROM users u
      LEFT JOIN user_profiles up ON up.user_id = u.id
      WHERE u.id = $1 LIMIT 1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const row = result.rows[0];
    res.json({
      profile: {
        id: row.id,
        username: row.username,
        email: row.email,
        displayName: row.display_name || row.username,
        avatarUrl: row.avatar_url || '',
        bio: row.bio || '',
        location: row.location || '',
        website: row.website || '',
        nativeLanguage: row.native_language || '',
        targetLanguage: row.target_language || 'English',
        dailyWordGoal: row.daily_word_goal || 10,
        studyGoal: row.study_goal || 'casual',
        notifications: row.notification_preferences || { email: true, streak_reminder: true, achievement: true },
        theme: row.theme || 'dark',
        createdAt: row.created_at,
        lastLoginAt: row.last_login_at,
      }
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

// SECURE: PUT /api/profile
router.put('/', authenticate, csrfProtection, updateProfileValidation, handleProfileValidation, async (req, res) => {
  try {
    const {
      displayName, bio, location, website,
      nativeLanguage, targetLanguage, dailyWordGoal, studyGoal,
      avatarUrl, theme, notifications
    } = req.body;

    // Upsert profile
    await query(
      `INSERT INTO user_profiles (user_id, display_name, avatar_url, bio, location, website,
        native_language, target_language, daily_word_goal, study_goal,
        notification_preferences, theme)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12)
      ON CONFLICT (user_id) DO UPDATE SET
        display_name = COALESCE(EXCLUDED.display_name, user_profiles.display_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, user_profiles.avatar_url),
        bio = COALESCE(EXCLUDED.bio, user_profiles.bio),
        location = COALESCE(EXCLUDED.location, user_profiles.location),
        website = COALESCE(EXCLUDED.website, user_profiles.website),
        native_language = COALESCE(EXCLUDED.native_language, user_profiles.native_language),
        target_language = COALESCE(EXCLUDED.target_language, user_profiles.target_language),
        daily_word_goal = COALESCE(EXCLUDED.daily_word_goal, user_profiles.daily_word_goal),
        study_goal = COALESCE(EXCLUDED.study_goal, user_profiles.study_goal),
        notification_preferences = COALESCE(EXCLUDED.notification_preferences, user_profiles.notification_preferences),
        theme = COALESCE(EXCLUDED.theme, user_profiles.theme)`,
      [
        req.user.id,
        displayName || null,
        avatarUrl || null,
        bio || null,
        location || null,
        website || null,
        nativeLanguage || null,
        targetLanguage || null,
        dailyWordGoal || 10,
        studyGoal || 'casual',
        JSON.stringify(notifications || { email: true, streak_reminder: true, achievement: true }),
        theme || 'dark',
      ]
    );

    // Update display_name on users table too
    if (displayName) {
      await query('UPDATE users SET display_name = $1 WHERE id = $2', [displayName, req.user.id]);
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// SECURE: PUT /api/profile/password
router.put('/password', authenticate, csrfProtection, changePasswordValidation, handleProfileValidation, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const userResult = await query(
      'SELECT password_hash FROM users WHERE id = $1 LIMIT 1',
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await bcrypt.compare(currentPassword, userResult.rows[0].password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, req.user.id]);

    // Revoke all refresh tokens (force re-login)
    await query(
      'UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL',
      [req.user.id]
    );

    const { clearAuthCookies } = require('../middleware/auth');
    clearAuthCookies(res);

    res.json({ message: 'Password changed. Please login again.' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

module.exports = router;
