import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { Student } from '../students/entities/student.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { Class } from '../classes/entities/class.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepo: Repository<Grade>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,
    
  ) {}

  async create(data: any) {
    const student = await this.studentRepo.findOneBy({ id: data.studentId });
    const subject = await this.subjectRepo.findOneBy({ id: data.subjectId });
    const classEntity = await this.classRepo.findOneBy({ id: data.classId });

    if (!student || !subject || !classEntity) {
      throw new BadRequestException('Invalid student, subject or class');
    }

    return this.gradeRepo.save({
      score: data.score,
      term: data.term,
      student,
      subject,
      class: classEntity,
    });
  }

  findAll() {
    return this.gradeRepo.find({
      relations: {
        student: true,
        subject: true,
        class: true,
      },
    });
  }
}