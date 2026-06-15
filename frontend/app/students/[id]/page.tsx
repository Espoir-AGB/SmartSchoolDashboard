import Link from 'next/link';
import { studentsApi } from '@/lib/api/students';
import { classesApi } from '@/lib/api/classes';

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [student, classes] = await Promise.all([
    studentsApi.getById(Number(id)).catch(() => null),
    classesApi.getAll().catch(() => []),
  ]);

  if (!student) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ fontSize: 32, marginBottom: 12 }}>😕</p>
        <p style={{ fontWeight: 600, marginBottom: 16 }}>Élève introuvable</p>
        <Link href="/students" style={{ color: 'var(--accent-blue)', fontSize: 13 }}>← Retour à la liste</Link>
      </div>
    );
  }

  const className = classes.find((c) => c.id === student.classId)?.name ?? '—';
  const initials = `${student.firstName[0]}${student.lastName[0]}`;
  const isMale = student.gender === 'M';

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <Link href="/students" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>← Élèves</Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontSize: 13 }}>{student.firstName} {student.lastName}</span>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '28px 28px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: isMale ? 'rgba(79,110,247,0.15)' : 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: isMale ? 'var(--accent-blue)' : 'var(--accent-violet)', flexShrink: 0 }}>
            {initials}
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{student.firstName} {student.lastName}</h2>
            <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: isMale ? 'rgba(79,110,247,0.1)' : 'rgba(167,139,250,0.1)', color: isMale ? 'var(--accent-blue)' : 'var(--accent-violet)', fontWeight: 600 }}>
              {isMale ? 'Garçon' : 'Fille'}
            </span>
          </div>
        </div>

        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Matricule', value: student.matricule, mono: true },
            { label: 'Classe', value: className },
            { label: 'Date de naissance', value: student.birthdate ? new Date(student.birthdate).toLocaleDateString('fr-FR') : '—' },
            { label: 'Téléphone parent', value: student.parentPhone || '—' },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.label}</span>
              <span style={{ fontSize: 14, fontWeight: 500, fontFamily: row.mono ? 'monospace' : 'inherit' }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 28px 24px', display: 'flex', gap: 10 }}>
          <Link href={`/students/${id}/edit`} style={{ padding: '9px 18px', background: 'var(--accent-blue)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            ✏️ Modifier
          </Link>
          <Link href="/students" style={{ padding: '9px 18px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
            ← Retour
          </Link>
        </div>
      </div>
    </div>
  );
}
