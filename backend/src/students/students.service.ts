import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Class } from '../classes/entities/class.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}

  async create(data: any) {
    if (!data.classId) {
      throw new BadRequestException('classId is required');
    }

    const classExists = await this.classRepo.findOne({
      where: { id: data.classId },
      relations: {
        category: {
          school: true,
        },
      },
    });

    if (!classExists) {
      throw new BadRequestException('Class not found');
    }

    return this.studentRepo.save({
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      birthdate: data.birthdate,
      matricule: data.matricule,
      parentPhone: data.parentPhone,
      class: { id: data.classId },
      school: classExists.category.school, // automatique
    });
  }

  findAll() {
    return this.studentRepo.find({
      relations: {
        class: true,
      },
    });
  }

  findOne(id: number) {
    return this.studentRepo.findOne({
      where: { id },
      relations: {
        class: true,
      },
    });
  }

 findBySchool(schoolId: number) {
    return this.studentRepo.find({
      where: {
        school: { id: schoolId },
      },
      relations: {
        class: true,
      },
    });
  }

  update(id: number, data: Partial<Student>) {
    return this.studentRepo.update(id, data);
  }

  remove(id: number) {
    return this.studentRepo.delete(id);
  }
}