import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Category } from 'src/categories/entities/category.entity';
import { School } from 'src/school/entities/school.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepo: Repository<Class>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,

    @InjectRepository(School)
    private schoolRepo: Repository<School>,
  ) {}

  async create(dto: CreateClassDto) {
    const school = await this.schoolRepo.findOneBy({ id: dto.schoolId });
    if (!school) throw new Error('School not found');

    const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
    if (!category) throw new Error('Category not found');

    const classEntity = this.classRepo.create({
      level: dto.level,
      section: dto.section,
      examClass: dto.examClass,
      school,
      category,
    });

    return this.classRepo.save(classEntity);
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

  findBySchool(schoolId: number) {
    return this.classRepo.find({
      where: {
        school: { id: schoolId },
      },
      relations: {
        school: true,
        category: true,
      },
    });
  }
}
