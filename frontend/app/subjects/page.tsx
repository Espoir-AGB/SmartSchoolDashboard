'use client';

import { useEffect, useState } from 'react';
import { classesApi, type Class } from '@/lib/api/classes';
import { subjectsApi, type Subject } from '@/lib/api/subjects';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [name, setName] = useState('');
  const [classIds, setClassIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const [subjectData, classData] = await Promise.all([subjectsApi.getAll(), classesApi.getAll()]);
      setSubjects(subjectData);
      setClasses(classData);
    } catch {
      setError('Impossible de charger les matières.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleClass = (id: number) => {
    setClassIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || classIds.length === 0) {
      setError('Le nom et au moins une classe sont obligatoires.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await subjectsApi.create({ name: name.trim(), classIds });
      setName('');
      setClassIds([]);
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
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Matières</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>{subjects.length} matière{subjects.length !== 1 ? 's' : ''} enregistrée{subjects.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Liste des matières</h3>
          </div>
          <div style={{ padding: 16 }}>
            {subjects.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Aucune matière pour l’instant.</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {subjects.map((subject) => (
                  <div key={subject.id} style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontWeight: 600 }}>{subject.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                      Classes associées : {subject.classIds?.length ? subject.classIds.length : 0}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, display: 'grid', gap: 14 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Ajouter une matière</h3>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Nom</label>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex: Mathématiques" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Classes concernées</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {classes.map((classe) => (
                <label key={classe.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                  <input type="checkbox" checked={classIds.includes(classe.id)} onChange={() => toggleClass(classe.id)} />
                  <span>{classe.level} {classe.section}</span>
                </label>
              ))}
            </div>
          </div>
          {error ? <div style={{ color: '#ef4444', fontSize: 13 }}>{error}</div> : null}
          <button type="submit" disabled={loading} style={{ padding: '10px 12px', borderRadius: 8, border: 'none', background: 'var(--accent-blue)', color: '#fff', fontWeight: 600, cursor: loading ? 'wait' : 'pointer' }}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      </div>
    </div>
  );
}
