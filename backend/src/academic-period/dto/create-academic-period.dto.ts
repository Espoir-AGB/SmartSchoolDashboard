export class CreateAcademicPeriodDto {
  name!: string;
  type!: 'SEMESTER' | 'TRIMESTER';
  order!: number;
  schoolYearId!: number;
  startDate?: Date;
  endDate?: Date;
}