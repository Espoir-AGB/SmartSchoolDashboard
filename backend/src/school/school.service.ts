import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepo: Repository<School>,
  ) {}

  create(dto: CreateSchoolDto) {
    const school = this.schoolRepo.create(dto);
    return this.schoolRepo.save(school);
  }

  findAll() {
    return this.schoolRepo.find();
  }

  async findOne(id: number) {
    const school = await this.schoolRepo.findOneBy({ id });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    return school;
  }

  async update(id: number, dto: UpdateSchoolDto) {
    const school = await this.findOne(id);

    Object.assign(school, dto);

    return this.schoolRepo.save(school);
  }

  remove(id: number) {
    return this.schoolRepo.delete(id);
  }
}