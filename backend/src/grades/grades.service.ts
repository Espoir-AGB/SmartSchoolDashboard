import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade, GradeType } from './entities/grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { GradeWeightsService } from '../grade-weights/grade-weights.service';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradesRepo: Repository<Grade>,
    private readonly weightsService: GradeWeightsService,
  ) {}

  async create(data: CreateGradeDto) {
    const result = await this.gradesRepo.insert({
      value: data.value,
      comment: data.comment,
      term: data.term ?? 'Trimestre 1',
      type: data.type ?? GradeType.INTERRO,
      studentId: data.studentId,
      subjectId: data.subjectId,
    });
    return this.gradesRepo.findOne({
      where: { id: result.identifiers[0].id },
      relations: { student: true, subject: true },
    });
  }

  findAll() {
    return this.gradesRepo.find({
      relations: {
        student: true,
        subject: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.gradesRepo.findOne({
      where: { id },
      relations: {
        student: true,
        subject: true,
      },
    });
  }

  findByStudent(studentId: number) {
    return this.gradesRepo.find({
      where: {
        student: { id: studentId },
      },
      relations: {
        student: { school: true },
        subject: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getAverageForStudent(studentId: number) {
    const grades = await this.findByStudent(studentId);
    if (grades.length === 0) {
      return {
        studentId,
        general: 0,
        byType: {},
        weighted: 0,
        subjectAverages: {},
        subjectCoefficients: {},
      };
    }

    const total = grades.reduce((sum, grade) => sum + grade.value, 0);
    const general = Number((total / grades.length).toFixed(2));

    const byType: Record<GradeType, number> = {} as Record<GradeType, number>;
    for (const type of Object.values(GradeType)) {
      const typedGrades = grades.filter(g => g.type === type);
      if (typedGrades.length > 0) {
        const typeTotal = typedGrades.reduce((sum, g) => sum + g.value, 0);
        byType[type] = Number((typeTotal / typedGrades.length).toFixed(2));
      }
    }

    const subjectGroups = new Map<number, Grade[]>();
    for (const grade of grades) {
      if (!grade.subjectId) continue;
      if (!subjectGroups.has(grade.subjectId)) {
        subjectGroups.set(grade.subjectId, []);
      }
      subjectGroups.get(grade.subjectId)!.push(grade);
    }

    let weightedSum = 0;
    let totalCoefficient = 0;
    const subjectAverages: Record<number, number> = {};
    const subjectCoefficients: Record<number, number> = {};

    for (const [subjectId, subjectGrades] of subjectGroups.entries()) {
      const subjectTotal = subjectGrades.reduce((sum, grade) => sum + grade.value, 0);
      const subjectAvg = Number((subjectTotal / subjectGrades.length).toFixed(2));
      const coefficient = await this.weightsService.getCoefficientForSubject(subjectId);

      subjectAverages[subjectId] = subjectAvg;
      subjectCoefficients[subjectId] = coefficient;
      weightedSum += subjectAvg * coefficient;
      totalCoefficient += coefficient;
    }

    const weighted = totalCoefficient > 0 ? Number((weightedSum / totalCoefficient).toFixed(2)) : general;

    return {
      studentId,
      general,
      byType,
      weighted,
      subjectAverages,
      subjectCoefficients,
    };
  }

  private calculateSimpleAverages(studentId: number, grades: Grade[]) {
    const total = grades.reduce((sum, grade) => sum + grade.value, 0);
    const general = Number((total / grades.length).toFixed(2));

    const byType: Record<GradeType, number> = {} as Record<GradeType, number>;
    for (const type of Object.values(GradeType)) {
      const typedGrades = grades.filter(g => g.type === type);
      if (typedGrades.length > 0) {
        const typeTotal = typedGrades.reduce((sum, g) => sum + g.value, 0);
        byType[type] = Number((typeTotal / typedGrades.length).toFixed(2));
      }
    }

    return {
      studentId,
      general,
      byType,
      weighted: general,
      subjectAverages: {},
      subjectCoefficients: {},
    };
  }

  async getAverageByType(studentId: number, type: GradeType) {
    const grades = await this.gradesRepo.find({
      where: {
        student: { id: studentId },
        type,
      },
    });

    if (grades.length === 0) {
      return {
        studentId,
        type,
        count: 0,
        average: 0,
      };
    }

    const total = grades.reduce((sum, grade) => sum + grade.value, 0);
    return {
      studentId,
      type,
      count: grades.length,
      average: Number((total / grades.length).toFixed(2)),
    };
  }

  async update(id: number, data: UpdateGradeDto) {
    const grade = await this.findOne(id);
    if (!grade) {
      throw new NotFoundException('Grade not found');
    }

    const updateData: any = {};
    if (data.value !== undefined) updateData.value = data.value;
    if (data.comment !== undefined) updateData.comment = data.comment;
    if (data.term !== undefined) updateData.term = data.term;
    if (data.studentId !== undefined) updateData.studentId = data.studentId;
    if (data.subjectId !== undefined) updateData.subjectId = data.subjectId;

    if (Object.keys(updateData).length === 0) {
      return grade;
    }

    await this.gradesRepo.update(id, updateData);
    return this.gradesRepo.findOne({
      where: { id },
      relations: { student: true, subject: true },
    });
  }

  async remove(id: number) {
    const result = await this.gradesRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Grade not found');
    }
    return { deleted: true };
  }
}
