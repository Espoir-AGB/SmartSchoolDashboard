import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicPeriod } from './entities/academic-period.entity';
import { CreateAcademicPeriodDto } from './dto/create-academic-period.dto';
import { SchoolYear } from 'src/school-year/entities/school-year.entity';

@Injectable()
export class AcademicPeriodsService {
  constructor(
    @InjectRepository(AcademicPeriod)
    private repo: Repository<AcademicPeriod>,

    @InjectRepository(SchoolYear)
    private yearRepo: Repository<SchoolYear>,
  ) {}

  async create(dto: CreateAcademicPeriodDto) {
    const schoolYear = await this.yearRepo.findOneBy({ id: dto.schoolYearId });

    if (!schoolYear) {
      throw new Error('SchoolYear not found');
    }

    const period = this.repo.create({
      name: dto.name,
      type: dto.type,
      order: dto.order,
      schoolYear,
    });

    return this.repo.save(period);
  }

  findAll() {
    return this.repo.find({
      relations: {
        schoolYear: true,
      },
    });
  }

  async findBySchool(schoolId: number) {
    const schoolYears = await this.yearRepo.find({
      where: { school: { id: schoolId } },
      relations: { academicPeriods: true },
    });

    return schoolYears.flatMap(year => year.academicPeriods);
  }
}