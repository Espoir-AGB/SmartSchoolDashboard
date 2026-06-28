import { IsNumber, Min, Max } from 'class-validator';

export class CreateGradeWeightDto {
  @IsNumber()
  @Min(0.1)
  @Max(10)
  coefficient!: number;
}
