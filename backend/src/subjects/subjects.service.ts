import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { Class } from '../classes/entities/class.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}

  async create(data: any) {
    const classes = await this.classRepo.findBy({
      id: In(data.classIds),
    });

    return this.subjectRepo.save({
      name: data.name,
      classes,
    });
  }

  findAll() {
    return this.subjectRepo.find({
      relations: {
        'classes': true,
      },
    });
  }

  findOne(id: number) {
    return this.subjectRepo.findOne({
      where: { id },
      relations: { 
        'classes': true,
      },
    });
  }

  update(id: number, data: any) {
    return this.subjectRepo.update(id, data);
  }

  remove(id: number) {
    return this.subjectRepo.delete(id);
  }
}