export default function StatCard({ icon, label, value, color }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      padding: '20px 18px',
      boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      borderTop: `3px solid ${color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</span>
      </div>
      <div style={{ fontSize: 34, fontWeight: 800, color, lineHeight: 1 }}>{value.toLocaleString()}</div>
    </div>
  );
}
