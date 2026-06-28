'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { studentsApi, Student } from '@/lib/api/students';
import { subjectsApi, Subject } from '@/lib/api/subjects';
import { gradesApi, Grade } from '@/lib/api/grades';

function GradesPageClient() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [form, setForm] = useState({ studentId: 0, subjectId: 0, value: '', term: 'Trimestre 1', comment: '' });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    studentsApi.getAll().then(setStudents).catch(() => setStudents([]));
    subjectsApi.getAll().then(setSubjects).catch(() => setSubjects([]));
    gradesApi.getAll().then(setGrades).catch(() => setGrades([]));
  }, []);

  const studentOptions = useMemo(
    () => students.map((student) => ({ value: student.id, label: `${student.firstName} ${student.lastName}` })),
    [students],
  );

  const subjectOptions = useMemo(
    () => subjects.map((subject) => ({ value: subject.id, label: subject.name })),
    [subjects],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Enregistrement…');

    try {
      const payload = {
        studentId: Number(form.studentId),
        subjectId: Number(form.subjectId),
        value: Number(form.value),
        term: form.term,
        comment: form.comment || undefined,
      };

      await gradesApi.create(payload);
      setStatus('Note ajoutée avec succès.');
      setForm({ ...form, value: '', comment: '' });
      const refreshed = await gradesApi.getAll();
      setGrades(refreshed);
    } catch (error) {
      setStatus('Impossible d’ajouter la note. Vérifiez les valeurs.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Saisie des notes</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>Enregistrez des notes par élève et matière pour calculer les moyennes automatiquement.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginBottom: 32, maxWidth: 680 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <label>
            Élève
            <select value={form.studentId} onChange={(event) => setForm({ ...form, studentId: Number(event.target.value) })} style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid var(--border)' }}>
              <option value={0}>Sélectionner un élève</option>
              {studentOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label>
            Matière
            <select value={form.subjectId} onChange={(event) => setForm({ ...form, subjectId: Number(event.target.value) })} style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid var(--border)' }}>
              <option value={0}>Sélectionner une matière</option>
              {subjectOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label>
            Note
            <input
              type="number"
              step="0.01"
              min="0"
              max="20"
              value={form.value}
              onChange={(event) => setForm({ ...form, value: event.target.value })}
              style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid var(--border)' }}
            />
          </label>

          <label>
            Trimestre
            <input
              value={form.term}
              onChange={(event) => setForm({ ...form, term: event.target.value })}
              style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid var(--border)' }}
            />
          </label>

          <label>
            Commentaire (optionnel)
            <input
              value={form.comment}
              onChange={(event) => setForm({ ...form, comment: event.target.value })}
              style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid var(--border)' }}
            />
          </label>

          <button type="submit" style={{ width: 'fit-content', padding: '10px 18px', borderRadius: 10, background: 'var(--accent-blue)', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Enregistrer la note
          </button>
        </div>
      </form>

      {status && <div style={{ marginBottom: 24, color: 'var(--accent-blue)' }}>{status}</div>}

      <div style={{ display: 'grid', gap: 14 }}>
        {grades.length === 0 ? (
          <div style={{ padding: 24, borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            Aucune note enregistrée pour le moment.
          </div>
        ) : (
          grades.map((grade) => (
            <div key={grade.id} style={{ padding: 18, borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
                <div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{grade.student.firstName} {grade.student.lastName}</p>
                  <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: 13 }}>{grade.subject?.name ?? 'Matière non définie'}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{grade.value}</p>
                  <p style={{ margin: 4, color: 'var(--text-secondary)', fontSize: 12 }}>{grade.term}</p>
                </div>
              </div>
              {grade.comment && <p style={{ marginTop: 12, color: 'var(--text-secondary)', fontSize: 13 }}>{grade.comment}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function GradesPage() {
  return <GradesPageClient />;
}
