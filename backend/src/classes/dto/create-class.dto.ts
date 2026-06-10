import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateClassDto {
  @IsString()
  level!: string;

  @IsOptional()
  @IsString()
  section?: string;

  @IsBoolean()
  examClass!: boolean;

  @IsNumber()
  categoryId!: number;
}