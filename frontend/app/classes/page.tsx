import Link from 'next/link';
import { classesApi } from '@/lib/api/classes';
import { categoriesApi } from '@/lib/api/categories';

export default async function ClassesPage() {
  const [classes, categories] = await Promise.all([
    classesApi.getAll().catch(() => []),
    categoriesApi.getAll().catch(() => []),
  ]);

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Classes</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>{classes.length} classe{classes.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/classes/new" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'var(--accent-violet)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
          ➕ Nouvelle classe
        </Link>
      </div>

      {classes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)' }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>🏫</p>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>Aucune classe</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>Créez d'abord une catégorie, puis ajoutez des classes.</p>
          <Link href="/classes/new" style={{ display: 'inline-flex', padding: '9px 18px', background: 'var(--accent-violet)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            Créer une classe
          </Link>
        </div>
      ) : (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Classe', 'Section', 'Catégorie', 'Exam', ''].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classes.map((cls, i) => (
                <tr key={cls.id} style={{ borderBottom: i < classes.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>
                        🏫
                      </div>
                      <span style={{ fontWeight: 600 }}>{cls.level}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>
                    {cls.section}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {cls.categoryId ? (
                      <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: 'rgba(167,139,250,0.1)', color: 'var(--accent-violet)', fontWeight: 600 }}>
                        {categoryMap[cls.categoryId] ?? '—'}
                      </span>
                    ) : <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>—</span>}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {cls.examClass ? (
                      <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: 'rgba(248,113,113,0.1)', color: 'var(--accent-red)', fontWeight: 600 }}>Examen</span>
                    ) : (
                      <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: 'rgba(34,197,94,0.1)', color: 'var(--accent-green)', fontWeight: 600 }}>Normal</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <Link href={`/classes/${cls.id}`} style={{ fontSize: 12, color: 'var(--accent-violet)', fontWeight: 500 }}>
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
