interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  accentColor?: string;
  sub?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  accentColor = 'var(--accent-blue)',
  sub,
}: StatCardProps) {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: `${accentColor}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}
        >
          {icon}
        </span>
      </div>
      <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</p>}
    </div>
  );
}