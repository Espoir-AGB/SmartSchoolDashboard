'use client';

import { useEffect, useState } from 'react';
import { schoolYearsApi, type SchoolYear } from '@/lib/api/schoolYears';
import { apiFetch } from '@/lib/api/client';

interface SchoolOption {
  id: number;
  name: string;
}

export default function SchoolYearsPage() {
  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
  const [schools, setSchools] = useState<SchoolOption[]>([]);
  const [form, setForm] = useState({ name: '', startDate: '', endDate: '', isCurrent: false, schoolId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const [yearData, schoolData] = await Promise.all([
        schoolYearsApi.getAll(),
        apiFetch<SchoolOption[]>('/schools'),
      ]);
      setSchoolYears(yearData);
      setSchools(schoolData);
      if (!form.schoolId && schoolData[0]) {
        setForm((current) => ({ ...current, schoolId: String(schoolData[0].id) }));
      }
    } catch {
      setError('Impossible de charger les années scolaires.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.startDate || !form.endDate || !form.schoolId) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await schoolYearsApi.create({
        name: form.name.trim(),
        startDate: form.startDate,
        endDate: form.endDate,
        isCurrent: form.isCurrent,
        schoolId: Number(form.schoolId),
      });
      setForm((current) => ({ ...current, name: '', startDate: '', endDate: '', isCurrent: false }));
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Années scolaires</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>{schoolYears.length} année{schoolYears.length !== 1 ? 's' : ''} enregistrée{schoolYears.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Liste des années</h3>
          </div>
          <div style={{ padding: 16 }}>
            {schoolYears.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Aucune année scolaire pour l’instant.</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {schoolYears.map((year) => (
                  <div key={year.id} style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontWeight: 600 }}>{year.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                      {year.startDate} → {year.endDate} {year.isCurrent ? '• En cours' : ''}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, display: 'grid', gap: 14 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Ajouter une année scolaire</h3>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Nom</label>
            <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Ex: 2024-2025" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Établissement</label>
            <select value={form.schoolId} onChange={(event) => setForm((current) => ({ ...current, schoolId: event.target.value }))} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)' }}>
              <option value="">Sélectionner</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>{school.name}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Date de début</label>
              <input type="date" value={form.startDate} onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Date de fin</label>
              <input type="date" value={form.endDate} onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)' }} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <input type="checkbox" checked={form.isCurrent} onChange={(event) => setForm((current) => ({ ...current, isCurrent: event.target.checked }))} />
            Définir comme année en cours
          </label>
          {error ? <div style={{ color: '#ef4444', fontSize: 13 }}>{error}</div> : null}
          <button type="submit" disabled={loading} style={{ padding: '10px 12px', borderRadius: 8, border: 'none', background: 'var(--accent-blue)', color: '#fff', fontWeight: 600, cursor: loading ? 'wait' : 'pointer' }}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      </div>
    </div>
  );
}
