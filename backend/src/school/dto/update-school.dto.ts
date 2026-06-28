import { AcademicCycleType } from '../entities/school.entity';

export class UpdateSchoolDto {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  academicCycleType?: AcademicCycleType;
  periodsPerYear?: number;
  devoirsPerPeriod?: number;
  interrogationsPerSubjectPerPeriod?: number;
  interrogationsPerDevoir?: number;
  bulletinMode?: 'PERIOD' | 'ASSESSMENT';
}