export class CreateSchoolYearDto {
  name!: string;
  startDate!: Date;
  endDate!: Date;
  isCurrent?: boolean;
  schoolId!: number;
}