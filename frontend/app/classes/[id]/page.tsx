import Link from 'next/link';
import { classesApi } from '@/lib/api/classes';
import { categoriesApi } from '@/lib/api/categories';
import { studentsApi } from '@/lib/api/students';

export default async function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [cls, categories, allStudents] = await Promise.all([
    classesApi.getById(Number(id)).catch(() => null),
    categoriesApi.getAll().catch(() => []),
    studentsApi.getAll().catch(() => []),
  ]);

  if (!cls) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ fontSize: 32, marginBottom: 12 }}>😕</p>
        <p style={{ fontWeight: 600, marginBottom: 16 }}>Classe introuvable</p>
        <Link href="/classes" style={{ color: 'var(--accent-violet)', fontSize: 13 }}>← Retour aux classes</Link>
      </div>
    );
  }

  const categoryName = categories.find((c) => c.id === cls.categoryId)?.name ?? '—';
  const students = allStudents.filter((s) => s.class?.id === cls.id);

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <Link href="/classes" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>← Classes</Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontSize: 13 }}>{cls.level} {cls.section}</span>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            🏫
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{cls.level} — Section {cls.section}</h2>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              {cls.categoryId && (
                <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: 'rgba(167,139,250,0.1)', color: 'var(--accent-violet)', fontWeight: 600 }}>
                  {categoryName}
                </span>
              )}
              <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: cls.examClass ? 'rgba(248,113,113,0.1)' : 'rgba(34,197,94,0.1)', color: cls.examClass ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 600 }}>
                {cls.examClass ? 'Classe d\'examen' : 'Classe normale'}
              </span>
            </div>
          </div>
        </div>
        <div style={{ padding: '16px 28px' }}>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Élèves inscrits</p>
          <p style={{ fontSize: 28, fontWeight: 700 }}>{students.length}</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600 }}>Élèves de cette classe</h3>
        <Link href="/students/new" style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 500 }}>+ Ajouter un élève</Link>
      </div>

      {students.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Aucun élève dans cette classe pour l'instant.</p>
        </div>
      ) : (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Élève', 'Matricule', 'Genre', ''].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={student.id} style={{ borderBottom: i < students.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: student.gender === 'M' ? 'rgba(79,110,247,0.15)' : 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: student.gender === 'M' ? 'var(--accent-blue)' : 'var(--accent-violet)', flexShrink: 0 }}>
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <span style={{ fontWeight: 500 }}>{student.firstName} {student.lastName}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 12, background: 'rgba(79,110,247,0.12)', color: 'var(--accent-blue)', padding: '3px 8px', borderRadius: 5 }}>
                      {student.matricule}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: student.gender === 'M' ? 'rgba(79,110,247,0.1)' : 'rgba(167,139,250,0.1)', color: student.gender === 'M' ? 'var(--accent-blue)' : 'var(--accent-violet)', fontWeight: 600 }}>
                      {student.gender === 'M' ? 'Garçon' : 'Fille'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <Link href={`/students/${student.id}`} style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 500 }}>Voir →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
