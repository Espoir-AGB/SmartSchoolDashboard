import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicPeriod } from './entities/academic-period.entity';

@Injectable()
export class AcademicPeriodService {
  constructor(
    @InjectRepository(AcademicPeriod)
    private repo: Repository<AcademicPeriod>,
  ) {}

  create(data: Partial<AcademicPeriod>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}