import StatCard from '@/components/ui/StatCard';
import { studentsApi } from '@/lib/api/students';
import { classesApi } from '@/lib/api/classes';
import { subjectsApi } from '@/lib/api/subjects';
import { enrollmentsApi } from '@/lib/api/enrollments';

const quickLinks = [
  { label: 'Ajouter un élève', href: '/students/new', icon: '➕' },
  { label: 'Nouvelle inscription', href: '/enrollments/new', icon: '🔗' },
  { label: 'Gérer les classes', href: '/classes', icon: '🏫' },
  { label: 'Voir les matières', href: '/subjects', icon: '📚' },
  { label: 'Saisir les notes', href: '/grades', icon: '📝' },
];

async function getStats() {
  try {
    const [students, classes, subjects, enrollments] = await Promise.allSettled([
      studentsApi.getAll(),
      classesApi.getAll(),
      subjectsApi.getAll(),
      enrollmentsApi.getAll(),
    ]);

    return {
      students: students.status === 'fulfilled' ? students.value.length : '—',
      classes: classes.status === 'fulfilled' ? classes.value.length : '—',
      subjects: subjects.status === 'fulfilled' ? subjects.value.length : '—',
      enrollments: enrollments.status === 'fulfilled' ? enrollments.value.length : '—',
    };
  } catch {
    return { students: '—', classes: '—', subjects: '—', enrollments: '—' };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <div style={{ marginBottom: 28, padding: '20px 24px', background: 'linear-gradient(135deg, rgba(79,110,247,0.15) 0%, rgba(79,110,247,0.03) 100%)', border: '1px solid rgba(79,110,247,0.2)', borderRadius: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Bienvenue sur SmartSchool 👋</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Gérez vos élèves, classes, matières et inscriptions depuis un seul endroit.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard label="Élèves" value={stats.students} icon="👤" accentColor="var(--accent-blue)" />
        <StatCard label="Classes" value={stats.classes} icon="🏫" accentColor="var(--accent-violet)" />
        <StatCard label="Matières" value={stats.subjects} icon="📚" accentColor="var(--accent-orange)" />
        <StatCard label="Inscriptions" value={stats.enrollments} icon="🔗" accentColor="var(--accent-green)" />
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
