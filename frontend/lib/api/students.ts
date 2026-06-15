import { apiFetch } from './client';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  matricule: string;
  parentPhone: string;
  classId: number;
}

export const studentsApi = {
  getAll: () => apiFetch<Student[]>('/students'),
  getById: (id: number) => apiFetch<Student>(`/students/${id}`),
  create: (data: Omit<Student, 'id'>) => apiFetch<Student>('/students', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Student>) => apiFetch<Student>(`/students/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: number) => apiFetch<void>(`/students/${id}`, { method: 'DELETE' }),
};
