import { apiFetch } from './client';

export interface SchoolYear {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  schoolId?: number;
}

export interface CreateSchoolYearPayload {
  name: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  schoolId: number;
}

export const schoolYearsApi = {
  getAll: () => apiFetch<SchoolYear[]>('/school-years'),
  getById: (id: number) => apiFetch<SchoolYear>(`/school-years/${id}`),
  create: (data: CreateSchoolYearPayload) => apiFetch<SchoolYear>('/school-years', { method: 'POST', body: JSON.stringify(data) }),
};