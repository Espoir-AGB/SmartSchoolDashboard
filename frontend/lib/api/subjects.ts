import { apiFetch } from './client';

export interface Subject {
  id: number;
  name: string;
  classIds?: number[];
}

export interface CreateSubjectPayload {
  name: string;
  classIds: number[];
}

export const subjectsApi = {
  getAll: () => apiFetch<Subject[]>('/subjects'),
  getById: (id: number) => apiFetch<Subject>(`/subjects/${id}`),
  create: (data: CreateSubjectPayload) => apiFetch<Subject>('/subjects', { method: 'POST', body: JSON.stringify(data) }),
};
