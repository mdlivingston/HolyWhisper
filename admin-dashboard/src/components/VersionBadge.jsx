export default function VersionBadge({ version, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      background: '#f2f2f7',
      borderRadius: 20,
      padding: '4px 12px',
    }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#5856d6' }}>v{version}</span>
      <span style={{ fontSize: 11, color: '#636366' }}>{count} user{count !== 1 ? 's' : ''}</span>
      <span style={{
        fontSize: 10,
        fontWeight: 600,
        color: '#fff',
        background: '#5856d6',
        borderRadius: 10,
        padding: '1px 6px',
      }}>{pct}%</span>
    </div>
  );
}
