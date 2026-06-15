import { apiFetch } from './client';

export interface Enrollment {
  id: number;
  studentId: number;
  classId: number;
  schoolYearId: number;
}

export const enrollmentsApi = {
  getAll: () => apiFetch<Enrollment[]>('/enrollments'),
  create: (data: Omit<Enrollment, 'id'>) => apiFetch<Enrollment>('/enrollments', { method: 'POST', body: JSON.stringify(data) }),
};
