export class CreateClassDto {
  level!: string;
  section?: string;
  examClass?: boolean;

  schoolId!: number;
  categoryId!: number;
}