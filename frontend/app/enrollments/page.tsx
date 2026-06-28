'use client';

import { useEffect, useState } from 'react';
import { enrollmentsApi, type Enrollment } from '@/lib/api/enrollments';
import { studentsApi, type Student } from '@/lib/api/students';
import { classesApi, type Class } from '@/lib/api/classes';
import { schoolYearsApi, type SchoolYear } from '@/lib/api/schoolYears';

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
  const [form, setForm] = useState({ studentId: '', classId: '', schoolYearId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const [enrollData, studentData, classData, yearData] = await Promise.all([
        enrollmentsApi.getAll(),
        studentsApi.getAll(),
        classesApi.getAll(),
        schoolYearsApi.getAll(),
      ]);
      setEnrollments(enrollData);
      setStudents(studentData);
      setClasses(classData);
      setSchoolYears(yearData);
    } catch {
      setError('Impossible de charger les inscriptions.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.studentId || !form.classId || !form.schoolYearId) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await enrollmentsApi.create({
        studentId: Number(form.studentId),
        classId: Number(form.classId),
        schoolYearId: Number(form.schoolYearId),
      });
      setForm({ studentId: '', classId: '', schoolYearId: '' });
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
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Inscriptions</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>{enrollments.length} inscription{enrollments.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Liste des inscriptions</h3>
          </div>
          <div style={{ padding: 16 }}>
            {enrollments.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Aucune inscription pour l’instant.</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {enrollments.map((item) => (
                  <div key={item.id} style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontWeight: 600 }}>Inscription #{item.id}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Élève #{item.studentId} • Classe #{item.classId} • Année #{item.schoolYearId}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, display: 'grid', gap: 14 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Nouvelle inscription</h3>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Élève</label>
            <select value={form.studentId} onChange={(event) => setForm((current) => ({ ...current, studentId: event.target.value }))} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)' }}>
              <option value="">Sélectionner</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Classe</label>
            <select value={form.classId} onChange={(event) => setForm((current) => ({ ...current, classId: event.target.value }))} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)' }}>
              <option value="">Sélectionner</option>
              {classes.map((classe) => (
                <option key={classe.id} value={classe.id}>{classe.level} {classe.section}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Année scolaire</label>
            <select value={form.schoolYearId} onChange={(event) => setForm((current) => ({ ...current, schoolYearId: event.target.value }))} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)' }}>
              <option value="">Sélectionner</option>
              {schoolYears.map((year) => (
                <option key={year.id} value={year.id}>{year.name}</option>
              ))}
            </select>
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
