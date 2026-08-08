import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth, ADMIN_EMAIL, adminSignOut } from './firebase';
import Login from './components/Login';
import StatCard from './components/StatCard';
import DataTable from './components/DataTable';
import TopList from './components/TopList';
import VersionBadge from './components/VersionBadge';
import UserTable from './components/UserTable';
import './App.css';

const CATEGORY_COLORS = {
  'Identity':    '#5856d6',
  'Authority':   '#1c3a6b',
  'Healing':     '#4cd964',
  'Father':      '#ff9500',
  'Purpose':     '#00b5b8',
  'Peace':       '#5ac8fa',
  'Gratitude':   '#f5c518',
  'Word of God': '#ff3b30',
  'Love':        '#ff2d55',
  'Hope':        '#34aadc',
  'Joy':         '#ff9f0a',
  'Purity':      '#bf5af2',
  'Secret Place':'#7b5ea7',
  'Discipline':  '#636366',
};

function formatDateShort(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prayers, setPrayers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([]);
  const [refreshed, setRefreshed] = useState(new Date());

  // Only the designated admin email may use this dashboard — the
  // Email/Password provider is shared with the mobile app, so any user
  // could otherwise sign in here with their own app account.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user && user.email !== ADMIN_EMAIL) {
        adminSignOut();
        setAuthUser(null);
      } else {
        setAuthUser(user);
      }
      setAuthChecked(true);
    });
    return unsubscribe;
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [pSnap, fSnap, favSnap, nSnap, uSnap] = await Promise.all([
        getDocs(query(collection(db, 'Prayers'), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, 'Feedback'), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, 'FavoriteWhispers'), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, 'WhisperNotes'), orderBy('createdAt', 'desc'))),
        getDocs(collection(db, 'LastActive')),
      ]);
      const fmt = snap => snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setPrayers(fmt(pSnap));
      setFeedback(fmt(fSnap));
      setFavorites(fmt(favSnap));
      setNotes(fmt(nSnap));
      setUsers(fmt(uSnap).sort((a, b) => (b.lastActive?.toMillis?.() ?? 0) - (a.lastActive?.toMillis?.() ?? 0)));
      setRefreshed(new Date());
    } catch (e) {
      console.error('Fetch error:', e);
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => { if (authUser) fetchAll(); }, [authUser]);

  // Top favorited verses
  const verseCount = favorites.reduce((acc, f) => {
    if (!acc[f.verse]) acc[f.verse] = { verse: f.verse, category: f.category, count: 0 };
    acc[f.verse].count++;
    return acc;
  }, {});
  const topVerses = Object.values(verseCount).sort((a, b) => b.count - a.count).slice(0, 10);

  // Category breakdown
  const catCount = favorites.reduce((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {});
  const topCategories = Object.entries(catCount).sort((a, b) => b[1] - a[1]);

  // Activity buckets
  const now = Date.now();
  const active1d  = users.filter(u => (u.lastActive?.toMillis?.() ?? 0) > now - 86400000);
  const active7d  = users.filter(u => (u.lastActive?.toMillis?.() ?? 0) > now - 7  * 86400000);
  const active30d = users.filter(u => (u.lastActive?.toMillis?.() ?? 0) > now - 30 * 86400000);

  // Version breakdown
  const versionCount = users.reduce((acc, u) => {
    const v = u.version || 'unknown';
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});

  // Per-user engagement: how many favorites + notes each uid has
  const favsByUid  = favorites.reduce((acc, f) => { acc[f.uid] = (acc[f.uid] || 0) + 1; return acc; }, {});
  const notesByUid = notes.reduce((acc, n)     => { acc[n.uid] = (acc[n.uid] || 0) + 1; return acc; }, {});

  // Wait for the initial auth check before deciding what to render, so we
  // don't flash the login screen while Firebase restores a saved session.
  if (!authChecked) {
    return (
      <div className="loader" style={{ height: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!authUser) {
    return <Login />;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <span className="flame">🔥</span>
          <div>
            <h1>Holy Whisper</h1>
            <p className="sub">Admin Dashboard</p>
          </div>
        </div>
        <div className="header-right">
          {!loading && <span className="refreshed">Updated {refreshed.toLocaleTimeString()}</span>}
          <button className="refresh-btn" onClick={fetchAll} disabled={loading}>
            {loading ? '⏳ Loading…' : '↻ Refresh'}
          </button>
          <button className="logout-btn" onClick={adminSignOut}>Sign Out</button>
        </div>
      </header>

      {loading ? (
        <div className="loader">
          <div className="spinner" />
          <p>Fetching from Firestore…</p>
        </div>
      ) : error ? (
        <div className="error-box">
          <p>⚠️ Could not load data: <code>{error}</code></p>
          <button onClick={fetchAll}>Try again</button>
        </div>
      ) : (
        <main className="main">

          {/* Stat Cards */}
          <div className="stats-grid">
            <StatCard icon="👤" label="Registered Users" value={users.length} color="#5856d6" />
            <StatCard icon="🟢" label="Active (7 days)" value={active7d.length} color="#4cd964" />
            <StatCard icon="🙏" label="Prayer Requests" value={prayers.length} color="#ff9500" />
            <StatCard icon="💬" label="Feedback" value={feedback.length} color="#34aadc" />
            <StatCard icon="❤️" label="Favorites Saved" value={favorites.length} color="#ff2d55" />
            <StatCard icon="📔" label="Journal Notes" value={notes.length} color="#bf5af2" />
          </div>

          {/* ── User Activity — full-width spotlight ── */}
          <section className="card user-activity-card">
            <div className="card-head">
              <h2>👤 User Activity</h2>
              <span className="badge">{users.length} total users</span>
            </div>

            {/* Activity mini-stats */}
            <div className="activity-stats">
              <div className="activity-stat">
                <span className="activity-stat-value" style={{ color: '#4cd964' }}>{active1d.length}</span>
                <span className="activity-stat-label">Today</span>
              </div>
              <div className="activity-stat-divider" />
              <div className="activity-stat">
                <span className="activity-stat-value" style={{ color: '#34aadc' }}>{active7d.length}</span>
                <span className="activity-stat-label">Last 7 Days</span>
              </div>
              <div className="activity-stat-divider" />
              <div className="activity-stat">
                <span className="activity-stat-value" style={{ color: '#ff9500' }}>{active30d.length}</span>
                <span className="activity-stat-label">Last 30 Days</span>
              </div>
              <div className="activity-stat-divider" />
              <div className="activity-stat">
                <span className="activity-stat-value" style={{ color: '#8e8e93' }}>{users.length - active30d.length}</span>
                <span className="activity-stat-label">Inactive 30d+</span>
              </div>

              {/* Version badges */}
              <div className="activity-versions">
                {Object.entries(versionCount).sort((a, b) => b[1] - a[1]).map(([v, count]) => (
                  <VersionBadge key={v} version={v} count={count} total={users.length} />
                ))}
              </div>
            </div>

            {/* Full user table */}
            <UserTable
              users={users}
              favsByUid={favsByUid}
              notesByUid={notesByUid}
            />
          </section>

          <div className="two-col">

            {/* LEFT */}
            <div className="col">

              <section className="card">
                <div className="card-head">
                  <h2>🙏 Prayer Requests</h2>
                  <span className="badge">{prayers.length}</span>
                </div>
                <DataTable
                  columns={['Prayer', 'Date']}
                  rows={prayers.slice(0, 30).map(p => [
                    <span className="wrap">{p.prayer}</span>,
                    <span className="muted">{formatDateShort(p.createdAt)}</span>,
                  ])}
                  emptyText="No prayer requests yet"
                />
              </section>

              <section className="card">
                <div className="card-head">
                  <h2>💬 Feedback</h2>
                  <span className="badge">{feedback.length}</span>
                </div>
                <DataTable
                  columns={['Feedback', 'Date']}
                  rows={feedback.slice(0, 30).map(f => [
                    <span className="wrap">{f.feedback}</span>,
                    <span className="muted">{formatDateShort(f.createdAt)}</span>,
                  ])}
                  emptyText="No feedback yet"
                />
              </section>

              <section className="card">
                <div className="card-head">
                  <h2>📔 Journal Notes</h2>
                  <span className="badge">{notes.length}</span>
                </div>
                <DataTable
                  columns={['User ID', 'Verse', 'Note', 'Date']}
                  rows={notes.slice(0, 25).map(n => [
                    <span className="uid" title={n.uid}>{n.uid?.slice(0, 14)}…</span>,
                    <div>
                      <div className="verse-label">{n.verse}</div>
                      <span className="cat-pill" style={{ background: (CATEGORY_COLORS[n.category] || '#aaa') + '25', color: CATEGORY_COLORS[n.category] || '#aaa' }}>{n.category}</span>
                    </div>,
                    <span className="wrap">{n.note}</span>,
                    <span className="muted">{formatDateShort(n.createdAt)}</span>,
                  ])}
                  emptyText="No journal notes yet"
                />
              </section>

            </div>

            {/* RIGHT */}
            <div className="col">

              <section className="card">
                <div className="card-head">
                  <h2>❤️ Most Favorited Verses</h2>
                  <span className="badge">{Object.keys(verseCount).length} unique</span>
                </div>
                <TopList
                  items={topVerses.map(v => ({
                    label: v.verse,
                    sublabel: v.category,
                    value: v.count,
                    color: CATEGORY_COLORS[v.category] || '#aaa',
                    max: topVerses[0]?.count || 1,
                  }))}
                  emptyText="No favorites yet"
                />
              </section>

              <section className="card">
                <div className="card-head">
                  <h2>📊 Favorites by Category</h2>
                </div>
                <div className="cat-list">
                  {topCategories.map(([cat, count]) => (
                    <div key={cat} className="cat-row">
                      <span className="cat-dot" style={{ background: CATEGORY_COLORS[cat] || '#aaa' }} />
                      <span className="cat-name">{cat}</span>
                      <div className="bar-track">
                        <div className="bar-fill" style={{
                          width: `${(count / (topCategories[0]?.[1] || 1)) * 100}%`,
                          background: CATEGORY_COLORS[cat] || '#aaa',
                        }} />
                      </div>
                      <span className="cat-count">{count}</span>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>

          <footer className="footer">
            Holy Whisper ✦ Admin Dashboard &middot; {prayers.length + feedback.length + favorites.length + notes.length} total records across all collections
          </footer>
        </main>
      )}
    </div>
  );
}
