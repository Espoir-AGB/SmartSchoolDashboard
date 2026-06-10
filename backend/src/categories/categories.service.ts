import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  create(data: Partial<Category>) {
    return this.categoryRepo.save(data);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: number) {
    return this.categoryRepo.findOne({
      where: { id },
      relations: { 
        classes: { students: true, },
      }
    });
  }

  async findStudents(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: {
        classes: {
          students: true,
        },
      },
    });
    return category?.classes?.flatMap(c => c.students) ?? [];
  }

  async findClasses(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: {
        classes: true,
      },
    });
    return category?.classes ?? [];
  }
}