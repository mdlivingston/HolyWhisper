import { useState } from 'react';

const VERSION_COLORS = {
  '2.0.6': '#4cd964',
  '1.1.9': '#ff9500',
  '1.1.8': '#ff3b30',
};

function relativeTime(ts) {
  if (!ts) return { label: '—', daysAgo: null };
  const ms = ts.toMillis ? ts.toMillis() : ts;
  const diff = Date.now() - ms;
  const daysAgo = Math.floor(diff / 86400000);
  const hoursAgo = Math.floor(diff / 3600000);
  const minsAgo  = Math.floor(diff / 60000);
  let label;
  if (minsAgo < 60)       label = minsAgo <= 1 ? 'Just now' : `${minsAgo}m ago`;
  else if (hoursAgo < 24) label = `${hoursAgo}h ago`;
  else if (daysAgo === 1) label = 'Yesterday';
  else                    label = `${daysAgo}d ago`;
  return { label, daysAgo };
}

function statusColor(daysAgo) {
  if (daysAgo === null) return '#c7c7cc';
  if (daysAgo === 0)   return '#4cd964';
  if (daysAgo <= 3)    return '#34aadc';
  if (daysAgo <= 7)    return '#ff9500';
  if (daysAgo <= 30)   return '#ff9f0a';
  return '#c7c7cc';
}

function statusLabel(daysAgo) {
  if (daysAgo === null) return 'Unknown';
  if (daysAgo === 0)   return 'Today';
  if (daysAgo <= 3)    return 'This week';
  if (daysAgo <= 7)    return 'Active';
  if (daysAgo <= 30)   return 'This month';
  return 'Inactive';
}

const PAGE_SIZE = 15;

export default function UserTable({ users, favsByUid, notesByUid }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = users.filter(u => {
    const ms = u.lastActive?.toMillis?.() ?? 0;
    const daysAgo = ms ? Math.floor((Date.now() - ms) / 86400000) : null;
    if (search && !u.uid?.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'today')    return daysAgo === 0;
    if (filter === 'week')     return daysAgo != null && daysAgo <= 7;
    if (filter === 'month')    return daysAgo != null && daysAgo <= 30;
    if (filter === 'inactive') return daysAgo === null || daysAgo > 30;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = page * PAGE_SIZE < filtered.length;

  return (
    <div>
      {/* Filter bar */}
      <div className="ut-filter-bar">
        <input
          className="ut-search"
          placeholder="🔍  Search by UID…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <div className="ut-filter-pills">
          {[
            { key: 'all',      label: 'All',        color: '#5856d6' },
            { key: 'today',    label: 'Today',      color: '#4cd964' },
            { key: 'week',     label: '7 Days',     color: '#34aadc' },
            { key: 'month',    label: '30 Days',    color: '#ff9500' },
            { key: 'inactive', label: 'Inactive',   color: '#c7c7cc' },
          ].map(f => (
            <button
              key={f.key}
              className={`ut-pill ${filter === f.key ? 'ut-pill-active' : ''}`}
              style={filter === f.key ? { background: f.color, color: '#fff', borderColor: f.color } : {}}
              onClick={() => { setFilter(f.key); setPage(1); }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="ut-count">{visible.length} of {filtered.length} user{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table ut-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>User ID</th>
              <th>Version</th>
              <th>Last Active</th>
              <th>❤️ Favs</th>
              <th>📔 Notes</th>
              <th>FCM Token</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="empty-row"><td colSpan={7}>No users match this filter</td></tr>
            ) : visible.map(u => {
              const { label, daysAgo } = relativeTime(u.lastActive);
              const color = statusColor(daysAgo);
              const favs  = favsByUid[u.uid]  || 0;
              const nts   = notesByUid[u.uid] || 0;
              const vColor = VERSION_COLORS[u.version] || '#8e8e93';
              const isLatest = u.version === '2.0.6';
              return (
                <tr key={u.id} className={daysAgo !== null && daysAgo <= 1 ? 'ut-row-active' : ''}>
                  {/* Status dot + label */}
                  <td>
                    <div className="ut-status">
                      <span className="ut-dot" style={{ background: color }} />
                      <span className="ut-status-label" style={{ color }}>{statusLabel(daysAgo)}</span>
                    </div>
                  </td>
                  {/* UID */}
                  <td>
                    <span className="uid" title={u.uid}>{u.uid?.slice(0, 20)}…</span>
                  </td>
                  {/* Version */}
                  <td>
                    <span className="ut-ver" style={{ background: vColor + '20', color: vColor, border: `1px solid ${vColor}40` }}>
                      {u.version || '—'}
                      {isLatest && <span className="ut-latest">✓ latest</span>}
                    </span>
                  </td>
                  {/* Last active */}
                  <td>
                    <div className="ut-time">
                      <span style={{ color, fontWeight: 600 }}>{label}</span>
                      {u.lastActive && (
                        <span className="muted ut-date">
                          {(u.lastActive.toDate ? u.lastActive.toDate() : new Date(u.lastActive))
                            .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </td>
                  {/* Favs */}
                  <td>
                    <span className={favs > 0 ? 'ut-engagement-high' : 'ut-engagement-zero'}>{favs}</span>
                  </td>
                  {/* Notes */}
                  <td>
                    <span className={nts > 0 ? 'ut-engagement-high' : 'ut-engagement-zero'}>{nts}</span>
                  </td>
                  {/* FCM token */}
                  <td>
                    {u.fcmToken
                      ? <span className="ut-token" title={u.fcmToken}>✓ registered</span>
                      : <span className="muted">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Load more footer */}
      {hasMore && (
        <div className="ut-load-more">
          <button className="ut-load-btn" onClick={() => setPage(p => p + 1)}>
            Load more  <span className="ut-load-hint">({filtered.length - visible.length} remaining)</span>
          </button>
        </div>
      )}
      {!hasMore && filtered.length > PAGE_SIZE && (
        <div className="ut-load-more ut-load-end">
          All {filtered.length} users shown
        </div>
      )}
    </div>
  );
}
