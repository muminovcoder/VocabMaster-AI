// SECURE: VocabMaster AI — Secure API Layer
// Handles all backend communication with httpOnly cookies and CSRF protection
// localStorage continues to work as fallback when offline/unauthorized

const SECURE_API = (() => {
  // Config
  const BASE_URL = !window.location.hostname || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001'
    : 'https://api.vocabmaster-ai.com';

  let csrfToken = null;
  let currentUser = JSON.parse(sessionStorage.getItem('vm_secure_user') || 'null');
  let isSyncing = false;

  // SECURE: Get or generate anonymous device ID
  function getDeviceId() {
    let id = localStorage.getItem('vm_device_id');
    if (!id) {
      const arr = new Uint8Array(24);
      crypto.getRandomValues(arr);
      id = Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
      localStorage.setItem('vm_device_id', id);
    }
    return id;
  }

  // SECURE: Get CSRF token from cookie
  function getCsrfToken() {
    if (csrfToken) return csrfToken;
    const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]*)/);
    csrfToken = match ? match[1] : null;
    return csrfToken;
  }

  // SECURE: Make authenticated API request
  async function apiRequest(method, path, body = null) {
    const url = `${BASE_URL}${path}`;
    const headers = { 'Content-Type': 'application/json' };

    // Only add CSRF for state-changing requests
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const token = getCsrfToken();
      if (token) headers['X-CSRF-Token'] = token;
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        credentials: 'include',
        body: body ? JSON.stringify(body) : null,
      });

      // Handle CSRF token rotation
      const newCsrf = response.headers.get('X-CSRF-Token');
      if (newCsrf) csrfToken = newCsrf;

      const data = await response.json();

      if (!response.ok) {
        // Handle token expiry
        if (data.code === 'TOKEN_EXPIRED') {
          const refreshed = await refreshTokens();
          if (refreshed) return apiRequest(method, path, body);
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(data.error || 'Request failed');
      }

      // Update CSRF from response body
      if (data.csrfToken) csrfToken = data.csrfToken;

      return data;
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        console.warn('SECURE: Backend unavailable — using localStorage fallback');
        return null;
      }
      throw err;
    }
  }

  // SECURE: Register new user
  async function register(username, email, password) {
    const data = await apiRequest('POST', '/api/auth/register', { username, email, password });
    if (data?.user) {
      currentUser = data.user;
      sessionStorage.setItem('vm_secure_user', JSON.stringify(data.user));
      if (data.csrfToken) csrfToken = data.csrfToken;
      triggerAuthEvent('login');
    }
    return data;
  }

  // SECURE: Login
  async function login(email, password) {
    const data = await apiRequest('POST', '/api/auth/login', { email, password });
    if (data?.user) {
      currentUser = data.user;
      sessionStorage.setItem('vm_secure_user', JSON.stringify(data.user));
      if (data.csrfToken) csrfToken = data.csrfToken;
      triggerAuthEvent('login');
    }
    return data;
  }

  // SECURE: Logout
  async function logout() {
    const data = await apiRequest('POST', '/api/auth/logout');
    currentUser = null;
    csrfToken = null;
    sessionStorage.removeItem('vm_secure_user');
    triggerAuthEvent('logout');
    return data;
  }

  // SECURE: Refresh tokens
  async function refreshTokens() {
    const data = await apiRequest('POST', '/api/auth/refresh');
    if (data?.user) {
      currentUser = data.user;
      sessionStorage.setItem('vm_secure_user', JSON.stringify(data.user));
      return true;
    }
    return false;
  }

  // SECURE: Get current user
  async function getCurrentUser() {
    if (!currentUser) return null;
    try {
      const data = await apiRequest('GET', '/api/auth/me');
      if (data?.user) {
        currentUser = data.user;
        sessionStorage.setItem('vm_secure_user', JSON.stringify(data.user));
      }
      return data?.user || currentUser;
    } catch {
      return currentUser;
    }
  }

  // SECURE: Sync all user data to server
  async function syncData(stats, favorites, recentWords, grammar) {
    if (isSyncing) return null;
    isSyncing = true;

    try {
      if (currentUser) {
        // Authenticated sync
        const data = await apiRequest('POST', '/api/progress/sync', {
          stats,
          favorites,
          recentWords,
          grammar,
        });
        return data;
      } else {
        // Anonymous sync via device ID
        const deviceId = getDeviceId();
        const res = await fetch(`${BASE_URL}/api/anonymous/sync`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId, stats, favorites, recentWords, grammar }),
        });
        if (!res.ok) throw new Error('Anonymous sync failed');
        return await res.json();
      }
    } catch (err) {
      // Queue for retry
      queueSync({ stats, favorites, recentWords, grammar });
      console.warn('SECURE: Sync failed — data queued for retry');
      return null;
    } finally {
      isSyncing = false;
    }
  }

  // SECURE: Load user data from server
  async function loadData() {
    if (currentUser) {
      const data = await apiRequest('GET', '/api/progress/load');
      return data;
    }
    // Anonymous load from device ID
    try {
      const deviceId = getDeviceId();
      const res = await fetch(`${BASE_URL}/api/anonymous/load?deviceId=${encodeURIComponent(deviceId)}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  // SECURE: Sync queue for failed requests
  function queueSync(data) {
    const queue = JSON.parse(localStorage.getItem('vm_sync_queue') || '[]');
    queue.push({ data, timestamp: Date.now() });
    // Keep only last 20 entries
    if (queue.length > 20) queue.splice(0, queue.length - 20);
    localStorage.setItem('vm_sync_queue', JSON.stringify(queue));
  }

  // SECURE: Retry queued syncs
  async function retrySyncQueue() {
    const raw = localStorage.getItem('vm_sync_queue');
    if (!raw) return;
    let queue;
    try { queue = JSON.parse(raw); } catch { queue = []; }
    if (!queue.length) return;

    const remaining = [];
    for (const item of queue) {
      // Skip items older than 1 hour
      if (Date.now() - item.timestamp > 3600000) continue;
      try {
        await syncData(item.data.stats, item.data.favorites, item.data.recentWords, item.data.grammar);
      } catch {
        remaining.push(item);
      }
    }
    localStorage.setItem('vm_sync_queue', JSON.stringify(remaining));
  }

  // SECURE: Record word interaction (supports both auth and anonymous)
  async function recordWord(word, action, difficulty) {
    if (currentUser) {
      return apiRequest('POST', '/api/progress/word', { word, action, difficulty });
    }
    return null;
  }

  // SECURE: Check authentication status
  function isAuthenticated() {
    return currentUser !== null;
  }

  // SECURE: Get current user info
  function getUser() {
    return currentUser;
  }

  // SECURE: Trigger custom auth events for the app
  function triggerAuthEvent(type) {
    window.dispatchEvent(new CustomEvent('secure-auth-change', {
      detail: { type, user: currentUser },
    }));
  }

  // SECURE: Get profile
  async function getProfile() {
    if (!currentUser) return null;
    return apiRequest('GET', '/api/profile');
  }

  // SECURE: Update profile
  async function updateProfile(profileData) {
    if (!currentUser) return null;
    return apiRequest('PUT', '/api/profile', profileData);
  }

  // SECURE: Change password
  async function changePassword(currentPassword, newPassword) {
    if (!currentUser) return null;
    return apiRequest('PUT', '/api/profile/password', { currentPassword, newPassword });
  }

  // Public API
  return {
    register,
    login,
    logout,
    refreshTokens,
    getCurrentUser,
    syncData,
    loadData,
    recordWord,
    retrySyncQueue,
    getProfile,
    updateProfile,
    changePassword,
    isAuthenticated,
    getUser,
    getBaseUrl: () => BASE_URL,
  };
})();
