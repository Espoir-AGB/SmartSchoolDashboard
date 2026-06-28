import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class UpdateGradeWeightDto {
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  @Max(10)
  coefficient?: number;
}
