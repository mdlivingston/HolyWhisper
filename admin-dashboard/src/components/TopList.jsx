export default function TopList({ items, emptyText }) {
  if (!items.length) {
    return <p style={{ textAlign: 'center', color: '#c7c7cc', padding: 32, fontSize: 13 }}>{emptyText || 'No data'}</p>;
  }
  return (
    <div className="top-list">
      {items.map((item, i) => (
        <div key={item.label} className="top-item">
          <span className="top-rank">#{i + 1}</span>
          <div className="top-info">
            <div className="top-verse">{item.label}</div>
            {item.sublabel && (
              <div className="top-cat" style={{ color: item.color }}>{item.sublabel}</div>
            )}
          </div>
          <div className="top-bar-wrap">
            <div className="top-bar">
              <div
                className="top-bar-fill"
                style={{
                  width: `${(item.value / item.max) * 100}%`,
                  background: item.color,
                }}
              />
            </div>
          </div>
          <span className="top-count">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
