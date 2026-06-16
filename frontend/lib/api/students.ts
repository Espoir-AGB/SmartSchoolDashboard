import { apiFetch } from './client';

export interface StudentClass {
  id: number;
  level: string;
  section: string;
  examClass: boolean;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  matricule: string;
  parentPhone: string;
  class: StudentClass;
}

export const studentsApi = {
  getAll: () => apiFetch<Student[]>('/students'),
  getById: (id: number) => apiFetch<Student>(`/students/${id}`),
  create: (data: {
    firstName: string;
    lastName: string;
    gender: string;
    birthdate: string;
    matricule: string;
    parentPhone: string;
    classId: number;
  }) => apiFetch<Student>('/students', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<{ firstName: string; lastName: string; gender: string; birthdate: string; matricule: string; parentPhone: string; classId: number }>) =>
    apiFetch<Student>(`/students/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: number) => apiFetch<void>(`/students/${id}`, { method: 'DELETE' }),
};
