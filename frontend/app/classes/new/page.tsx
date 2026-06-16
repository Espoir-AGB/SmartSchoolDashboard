'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { categoriesApi, Category } from '@/lib/api/categories';

export default function NewClassPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ level: '', section: '', categoryId: '', examClass: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    categoriesApi.getAll().then(setCategories).catch(() => {});
  }, []);

  const set = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    if (!form.level.trim() || !form.section.trim() || !form.categoryId) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
      const res = await fetch(`${BASE_URL}/classes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: form.level, section: form.section, categoryId: Number(form.categoryId), examClass: form.examClass }),
      });
      if (!res.ok) throw new Error('Erreur lors de la création');
      router.push('/classes');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 14, outline: 'none' };
  const labelStyle = { display: 'block' as const, fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 };

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <Link href="/classes" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>← Classes</Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontSize: 13 }}>Nouvelle classe</span>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 28 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 24 }}>Nouvelle classe</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Niveau *</label>
            <input style={inputStyle} value={form.level} onChange={(e) => set('level', e.target.value)} placeholder="Ex: CI, CP, 6ème" />
          </div>
          <div>
            <label style={labelStyle}>Section *</label>
            <input style={inputStyle} value={form.section} onChange={(e) => set('section', e.target.value)} placeholder="Ex: A, B" />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Catégorie *</label>
          {categories.length === 0 ? (
            <div style={{ padding: '10px 14px', background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.3)', borderRadius: 8, fontSize: 13, color: 'var(--accent-orange)' }}>
              Aucune catégorie. <Link href="/categories/new" style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>Créer une catégorie d'abord →</Link>
            </div>
          ) : (
            <select style={inputStyle} value={form.categoryId} onChange={(e) => set('categoryId', e.target.value)}>
              <option value="">Sélectionner une catégorie</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
        </div>

        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <input type="checkbox" id="examClass" checked={form.examClass} onChange={(e) => set('examClass', e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
          <label htmlFor="examClass" style={{ fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>Classe d'examen</label>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 8, color: 'var(--accent-red)', fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handleSubmit} disabled={loading || categories.length === 0} style={{ flex: 1, padding: '11px', background: loading || categories.length === 0 ? 'var(--text-muted)' : 'var(--accent-violet)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Création...' : 'Créer la classe'}
          </button>
          <Link href="/classes" style={{ padding: '11px 20px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
            Annuler
          </Link>
        </div>
      </div>
    </div>
  );
}
