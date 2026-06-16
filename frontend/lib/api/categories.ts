import { apiFetch } from './client';

export interface Category {
  id: number;
  name: string;
}

export const categoriesApi = {
  getAll: () => apiFetch<Category[]>('/categories'),
  getById: (id: number) => apiFetch<Category>(`/categories/${id}`),
  getClasses: (id: number) => apiFetch<{ id: number; name: string }[]>(`/categories/${id}/classes`),
  getStudents: (id: number) => apiFetch<unknown[]>(`/categories/${id}/students`),
  create: (data: { name: string }) => apiFetch<Category>('/categories', { method: 'POST', body: JSON.stringify(data) }),
};
