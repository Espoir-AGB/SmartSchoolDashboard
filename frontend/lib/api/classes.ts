import { apiFetch } from './client';

export interface Class {
  id: number;
  level: string;
  section: string;
  examClass: boolean;
  categoryId?: number;
}

export const classesApi = {
  getAll: () => apiFetch<Class[]>('/classes'),
  getById: (id: number) => apiFetch<Class>(`/classes/${id}`),
  create: (data: { level: string; section: string; examClass?: boolean; categoryId: number }) =>
    apiFetch<Class>('/classes', { method: 'POST', body: JSON.stringify(data) }),
};
