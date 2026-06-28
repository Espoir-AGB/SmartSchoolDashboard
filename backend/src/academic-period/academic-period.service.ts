import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const schoolYear = await this.yearRepo.findOne({
      where: { id: dto.schoolYearId },
      relations: { school: true },
    });

    if (!schoolYear) {
      throw new NotFoundException('SchoolYear not found');
    }

    const school = schoolYear.school;
    if (school?.academicCycleType && school.academicCycleType !== dto.type) {
      throw new BadRequestException(
        `This school is configured for ${school.academicCycleType} periods, so ${dto.type} is not allowed.`,
      );
    }

    if (school?.periodsPerYear && dto.order > school.periodsPerYear) {
      throw new BadRequestException(
        `Order ${dto.order} exceeds the configured periods per year (${school.periodsPerYear}).`,
      );
    }

    const period = this.repo.create({
      name: dto.name,
      type: dto.type,
      order: dto.order,
      startDate: dto.startDate,
      endDate: dto.endDate,
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