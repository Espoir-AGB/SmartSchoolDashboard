import { apiFetch } from './client';

export interface Subject {
  id: number;
  name: string;
}

export const subjectsApi = {
  getAll: () => apiFetch<Subject[]>('/subjects'),
  getById: (id: number) => apiFetch<Subject>(`/subjects/${id}`),
  create: (data: Omit<Subject, 'id'>) => apiFetch<Subject>('/subjects', { method: 'POST', body: JSON.stringify(data) }),
};
