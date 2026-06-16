'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Le nom est obligatoire.'); return; }
    setLoading(true);
    setError('');
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
      const res = await fetch(`${BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error('Erreur lors de la création');
      router.push('/categories');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 14, outline: 'none' };

  return (
    <div style={{ maxWidth: 480 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <Link href="/categories" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>← Catégories</Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontSize: 13 }}>Nouvelle catégorie</span>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 28 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Nouvelle catégorie</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Les catégories regroupent les classes. Ex : Primaire, Collège, Lycée.</p>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Nom de la catégorie *</label>
          <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Primaire" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
        </div>

        {error && (
          <div style={{ padding: '10px 14px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 8, color: 'var(--accent-red)', fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handleSubmit} disabled={loading} style={{ flex: 1, padding: '11px', background: loading ? 'var(--text-muted)' : 'var(--accent-violet)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Création...' : 'Créer la catégorie'}
          </button>
          <Link href="/categories" style={{ padding: '11px 20px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
            Annuler
          </Link>
        </div>
      </div>
    </div>
  );
}
