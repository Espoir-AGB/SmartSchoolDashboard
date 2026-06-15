import { apiFetch } from './client';

export interface Class {
  id: number;
  name: string;
  categoryId: number;
}

export const classesApi = {
  getAll: () => apiFetch<Class[]>('/classes'),
  getById: (id: number) => apiFetch<Class>(`/classes/${id}`),
  create: (data: Omit<Class, 'id'>) => apiFetch<Class>('/classes', { method: 'POST', body: JSON.stringify(data) }),
};
