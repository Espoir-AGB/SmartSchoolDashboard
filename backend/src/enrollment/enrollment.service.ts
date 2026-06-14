import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Enrollment } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Student } from 'src/students/entities/student.entity';
import { Class } from 'src/classes/entities/class.entity';
import { SchoolYear } from 'src/school-year/entities/school-year.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,

    @InjectRepository(SchoolYear)
    private yearRepo: Repository<SchoolYear>,
  ) {}

  async create(dto: CreateEnrollmentDto) {
    const student = await this.studentRepo.findOneBy({ id: dto.studentId });
    const classe = await this.classRepo.findOneBy({ id: dto.classId });
    const year = await this.yearRepo.findOneBy({ id: dto.schoolYearId });

    if (!student || !classe || !year) {
      throw new Error('Invalid enrollment data');
    }

    const enrollment = this.enrollmentRepo.create({
      student,
      class: classe,
      schoolYear: year,
    });

    return this.enrollmentRepo.save(enrollment);
  }

  findAll() {
    return this.enrollmentRepo.find({
      relations: {
        student: true,
        class: true,
        schoolYear: true,
      },
    });
  }
}