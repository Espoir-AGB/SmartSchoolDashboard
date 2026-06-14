import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { Class } from 'src/classes/entities/class.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}

  async create(dto: CreateSubjectDto) {
    const classes = await this.classRepo.findBy({
      id: In(dto.classIds || []),
    });

    const subject = this.subjectRepo.create({
      name: dto.name,
      classes,
    });

    return this.subjectRepo.save(subject);
  }

  findAll() {
    return this.subjectRepo.find({
      relations: {
        classes: true,
      },
    });
  }

  async findOne(id: number) {
    const subject = await this.subjectRepo.findOne({
      where: { id },
      relations: {
        classes: true,
      },
    });

    if (!subject) throw new NotFoundException('Subject not found');

    return subject;
  }

  async update(id: number, dto: UpdateSubjectDto) {
    const classes = dto.classIds
      ? await this.classRepo.findBy({ id: In(dto.classIds) })
      : undefined;

    return this.subjectRepo.save({
      id,
      name: dto.name,
      classes,
    });
  }

  remove(id: number) {
    return this.subjectRepo.delete(id);
  }

  // 🔥 IMPORTANT ROUTE LOGIC
  async findByClass(classId: number) {
    return this.subjectRepo
      .createQueryBuilder('subject')
      .leftJoin('subject.classes', 'class')
      .where('class.id = :classId', { classId })
      .getMany();
  }
}