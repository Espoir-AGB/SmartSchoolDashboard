import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectCoefficient } from './entities/grade-weight.entity';
import { CreateGradeWeightDto } from './dto/create-grade-weight.dto';
import { UpdateGradeWeightDto } from './dto/update-grade-weight.dto';

@Injectable()
export class GradeWeightsService {
  constructor(
    @InjectRepository(SubjectCoefficient)
    private readonly weightsRepo: Repository<SubjectCoefficient>,
  ) {}

  async getCoefficientForSubject(subjectId: number) {
    const coefficient = await this.weightsRepo.findOne({
      where: { subjectId },
    });
    return coefficient?.coefficient ?? 1;
  }

  async setCoefficient(subjectId: number, data: CreateGradeWeightDto) {
    const existing = await this.weightsRepo.findOne({
      where: { subjectId },
    });

    if (existing) {
      existing.coefficient = data.coefficient;
      return this.weightsRepo.save(existing);
    }

    const newCoefficient = this.weightsRepo.create({
      subjectId,
      coefficient: data.coefficient,
    });
    return this.weightsRepo.save(newCoefficient);
  }

  async updateCoefficient(subjectId: number, data: UpdateGradeWeightDto) {
    const coefficient = await this.weightsRepo.findOne({
      where: { subjectId },
    });

    if (!coefficient) {
      throw new NotFoundException(`Coefficient not found for subject ${subjectId}`);
    }

    if (data.coefficient !== undefined) {
      coefficient.coefficient = data.coefficient;
    }

    return this.weightsRepo.save(coefficient);
  }

  async deleteCoefficient(subjectId: number) {
    const result = await this.weightsRepo.delete({ subjectId });
    if (result.affected === 0) {
      throw new NotFoundException(`Coefficient not found for subject ${subjectId}`);
    }
    return { deleted: true };
  }

  async initializeDefaultCoefficient(subjectId: number) {
    const existing = await this.weightsRepo.findOne({
      where: { subjectId },
    });

    if (existing) {
      return;
    }

    const defaultCoefficient = this.weightsRepo.create({
      subjectId,
      coefficient: 1,
    });

    await this.weightsRepo.save(defaultCoefficient);
  }
}
