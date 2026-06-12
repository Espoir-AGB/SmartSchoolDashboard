import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepo: Repository<Class>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(data: CreateClassDto) {
    const category = await this.categoryRepo.findOneBy({
      id: data.categoryId,
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    return this.classRepo.save({
      level: data.level,
      section: data.section,
      examClass: data.examClass,
      category,
    });
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

  findExamClasses() {
    return this.classRepo.find({
      where: { examClass: true, },
      relations: {
        category: true,
      },
    });
  }

  findSubjectsByClass(classId: number) {
    return this.classRepo.findOne({
      where: { id: classId },
      relations: {
        subjects: true,
      },
    });
  }

}
