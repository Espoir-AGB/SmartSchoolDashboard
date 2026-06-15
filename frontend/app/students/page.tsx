import Link from 'next/link';
import { studentsApi } from '@/lib/api/students';
import { classesApi } from '@/lib/api/classes';

export default async function StudentsPage() {
  const [students, classes] = await Promise.all([
    studentsApi.getAll().catch(() => []),
    classesApi.getAll().catch(() => []),
  ]);

  const classMap = Object.fromEntries(classes.map((c) => [c.id, c.name]));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Élèves</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>{students.length} élève{students.length !== 1 ? 's' : ''} enregistré{students.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/students/new" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'var(--accent-blue)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
          ➕ Ajouter un élève
        </Link>
      </div>

      {students.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)' }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>👤</p>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>Aucun élève pour l'instant</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>Commencez par ajouter votre premier élève.</p>
          <Link href="/students/new" style={{ display: 'inline-flex', padding: '9px 18px', background: 'var(--accent-blue)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            Ajouter un élève
          </Link>
        </div>
      ) : (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Matricule', 'Nom complet', 'Genre', 'Classe', 'Téléphone parent', ''].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={student.id} style={{ borderBottom: i < students.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 12, background: 'rgba(79,110,247,0.12)', color: 'var(--accent-blue)', padding: '3px 8px', borderRadius: 5 }}>
                      {student.matricule}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: student.gender === 'M' ? 'rgba(79,110,247,0.15)' : 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: student.gender === 'M' ? 'var(--accent-blue)' : 'var(--accent-violet)', flexShrink: 0 }}>
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <span style={{ fontWeight: 500 }}>{student.firstName} {student.lastName}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: student.gender === 'M' ? 'rgba(79,110,247,0.1)' : 'rgba(167,139,250,0.1)', color: student.gender === 'M' ? 'var(--accent-blue)' : 'var(--accent-violet)', fontWeight: 600 }}>
                      {student.gender === 'M' ? 'Garçon' : 'Fille'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>
                    {classMap[student.classId] ?? '—'}
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>
                    {student.parentPhone}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <Link href={`/students/${student.id}`} style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 500 }}>
                      Voir →
                    </Link>
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
