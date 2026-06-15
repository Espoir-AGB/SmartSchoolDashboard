'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { classesApi, Class } from '@/lib/api/classes';

export default function NewStudentPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    gender: 'M',
    birthdate: '',
    matricule: '',
    parentPhone: '',
    classId: '',
  });

  useEffect(() => {
    classesApi.getAll().then(setClasses).catch(() => {});
  }, []);

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.matricule || !form.classId) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
      const res = await fetch(`${BASE_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, classId: Number(form.classId) }),
      });
      if (!res.ok) throw new Error('Erreur lors de la création');
      router.push('/students');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 14, outline: 'none' };
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 };

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <Link href="/students" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>← Élèves</Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ fontSize: 13 }}>Nouvel élève</span>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 28 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 24 }}>Ajouter un élève</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Prénom *</label>
            <input style={inputStyle} value={form.firstName} onChange={(e) => set('firstName', e.target.value)} placeholder="Jean" />
          </div>
          <div>
            <label style={labelStyle}>Nom *</label>
            <input style={inputStyle} value={form.lastName} onChange={(e) => set('lastName', e.target.value)} placeholder="Kouassi" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Matricule *</label>
            <input style={inputStyle} value={form.matricule} onChange={(e) => set('matricule', e.target.value)} placeholder="STU001" />
          </div>
          <div>
            <label style={labelStyle}>Genre *</label>
            <select style={inputStyle} value={form.gender} onChange={(e) => set('gender', e.target.value)}>
              <option value="M">Garçon</option>
              <option value="F">Fille</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Date de naissance</label>
            <input type="date" style={inputStyle} value={form.birthdate} onChange={(e) => set('birthdate', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Téléphone parent</label>
            <input style={inputStyle} value={form.parentPhone} onChange={(e) => set('parentPhone', e.target.value)} placeholder="+22990000000" />
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Classe *</label>
          <select style={inputStyle} value={form.classId} onChange={(e) => set('classId', e.target.value)}>
            <option value="">Sélectionner une classe</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 8, color: 'var(--accent-red)', fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handleSubmit} disabled={loading} style={{ flex: 1, padding: '11px', background: loading ? 'var(--text-muted)' : 'var(--accent-blue)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Création...' : 'Créer l\'élève'}
          </button>
          <Link href="/students" style={{ padding: '11px 20px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
            Annuler
          </Link>
        </div>
      </div>
    </div>
  );
}
