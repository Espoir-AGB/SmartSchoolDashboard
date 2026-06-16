import Link from 'next/link';
import { categoriesApi } from '@/lib/api/categories';

export default async function CategoriesPage() {
  const categories = await categoriesApi.getAll().catch(() => []);

  const categoriesWithClasses = await Promise.all(
    categories.map(async (cat) => {
      const classes = await categoriesApi.getClasses(cat.id).catch(() => []);
      return { ...cat, classes };
    })
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Catégories</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>{categories.length} catégorie{categories.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/categories/new" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'var(--accent-violet)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
          ➕ Nouvelle catégorie
        </Link>
      </div>

      {categoriesWithClasses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)' }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>🏷️</p>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>Aucune catégorie</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>Les catégories regroupent les classes (ex: Primaire, Secondaire).</p>
          <Link href="/categories/new" style={{ display: 'inline-flex', padding: '9px 18px', background: 'var(--accent-violet)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            Créer une catégorie
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {categoriesWithClasses.map((cat) => (
            <div key={cat.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: cat.classes.length > 0 ? 16 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                    🏷️
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 15 }}>{cat.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{cat.classes.length} classe{cat.classes.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <Link href="/classes/new" style={{ fontSize: 12, color: 'var(--accent-violet)', fontWeight: 500 }}>
                  + Ajouter une classe
                </Link>
              </div>

              {cat.classes.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  {cat.classes.map((cls) => (
                    <Link key={cls.id} href={`/classes/${cls.id}`} style={{ padding: '5px 12px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 20, fontSize: 13, color: 'var(--accent-violet)', fontWeight: 500 }}>
                      {cls.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
