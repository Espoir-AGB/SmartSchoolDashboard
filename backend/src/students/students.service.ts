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
    
    const classExists = await this.classRepo.findOneBy({
      id: data.classId,
    });

    if (!classExists) {
      throw new BadRequestException('Class not found');
    }

    return this.studentRepo.save({
      ...data,
      class: classExists,
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

  update(id: number, data: Partial<Student>) {
    return this.studentRepo.update(id, data);
  }

  remove(id: number) {
    return this.studentRepo.delete(id);
  }
}