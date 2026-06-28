import { IsNumber, IsString, IsOptional, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { GradeType } from '../entities/grade.entity';

export class CreateGradeDto {
  @Type(() => Number)
  @IsNumber()
  studentId!: number;

  @Type(() => Number)
  @IsNumber()
  subjectId!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(20)
  value!: number;

  @IsOptional()
  @IsEnum(GradeType)
  type?: GradeType;

  @IsOptional()
  @IsString()
  term?: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
