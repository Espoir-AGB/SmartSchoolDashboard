import StatCard from '@/components/ui/StatCard';

const quickLinks = [
  { label: 'Ajouter un élève', href: '/students/new', icon: '➕' },
  { label: 'Nouvelle inscription', href: '/enrollments/new', icon: '🔗' },
  { label: 'Gérer les classes', href: '/classes', icon: '🏫' },
  { label: 'Voir les matières', href: '/subjects', icon: '📚' },
];

export default function DashboardPage() {
  return (
    <div>
      <div style={{ marginBottom: 28, padding: '20px 24px', background: 'linear-gradient(135deg, rgba(79,110,247,0.15) 0%, rgba(79,110,247,0.03) 100%)', border: '1px solid rgba(79,110,247,0.2)', borderRadius: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Bienvenue sur SmartSchool 👋</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Gérez vos élèves, classes, matières et inscriptions depuis un seul endroit.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard label="Élèves" value="—" icon="👤" accentColor="var(--accent-blue)" sub="Chargement..." />
        <StatCard label="Classes" value="—" icon="🏫" accentColor="var(--accent-violet)" sub="Chargement..." />
        <StatCard label="Matières" value="—" icon="📚" accentColor="var(--accent-orange)" sub="Chargement..." />
        <StatCard label="Inscriptions" value="—" icon="🔗" accentColor="var(--accent-green)" sub="Chargement..." />
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Accès rapide
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
        {quickLinks.map((item) => (
          <a key={item.href} href={item.href} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 18px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, cursor: 'pointer' }}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
