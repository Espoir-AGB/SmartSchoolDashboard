import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';


@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}
  
  create(createClassDto: CreateClassDto) {
    return this.classRepo.save(createClassDto);
  }

  findAll() {
    return this.classRepo.find();
  }

  findOne(id: number) {
    return this.classRepo.find();
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return this.classRepo.update(id, updateClassDto);
  }

  remove(id: number) {
    return this.classRepo.delete(id);
  }
  
  findStudentsByClass(classId: number) {
    return this.classRepo.findOne({
      where: { id: classId },
      relations: {
        students: true,
      },
    });
  }
}
