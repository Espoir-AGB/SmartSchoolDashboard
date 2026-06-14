import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolYear } from './entities/school-year.entity';
import { School } from 'src/school/entities/school.entity';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';
import { UpdateSchoolYearDto } from './dto/update-school-year.dto';

@Injectable()
export class SchoolYearService {
  constructor(
    @InjectRepository(SchoolYear)
    private repo: Repository<SchoolYear>,

    @InjectRepository(School)
    private schoolRepo: Repository<School>,
  ) {}

  async create(dto: CreateSchoolYearDto) {
    const school = await this.schoolRepo.findOneBy({ id: dto.schoolId });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    // optionnel : désactiver les anciennes années courantes
    if (dto.isCurrent) {
      await this.repo.update(
        { school: { id: dto.schoolId } },
        { isCurrent: false },
      );
    }

    const year = this.repo.create({
      name: dto.name,
      startDate: dto.startDate,
      endDate: dto.endDate,
      isCurrent: dto.isCurrent ?? false,
      school,
    });

    return this.repo.save(year);
  }

  findAll() {
    return this.repo.find({
      relations: {
        school: true,
        academicPeriods: true,
      },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: {
        school: true,
        academicPeriods: true,
        enrollments: true,
      },
    });
  }

  async update(id: number, dto: UpdateSchoolYearDto) {
    const year = await this.repo.findOneBy({ id });

    if (!year) {
      throw new NotFoundException('SchoolYear not found');
    }

    Object.assign(year, dto);

    return this.repo.save(year);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}