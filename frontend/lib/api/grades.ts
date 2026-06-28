import { apiFetch } from './client';

export interface Grade {
  id: number;
  value: number;
  term: string;
  comment?: string;
  createdAt: string;
  student: {
    id: number;
    firstName: string;
    lastName: string;
  };
  subject: {
    id: number;
    name: string;
  } | null;
}

export type CreateGradePayload = {
  studentId: number;
  subjectId: number;
  value: number;
  term?: string;
  comment?: string;
};

export const gradesApi = {
  getAll: () => apiFetch<Grade[]>('/grades'),
  getByStudent: (studentId: number) => apiFetch<Grade[]>(`/grades/student/${studentId}`),
  create: (data: CreateGradePayload) => apiFetch<Grade>('/grades', { method: 'POST', body: JSON.stringify(data) }),
};
