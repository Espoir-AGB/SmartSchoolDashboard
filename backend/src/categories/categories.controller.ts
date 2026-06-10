import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() body: any) {
    return this.categoriesService.create(body);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Get(':id/classes')
    getClasses(@Param('id') id: string) {
      return this.categoriesService.findClasses(+id);
  }

  @Get(':id/students')
    getStudents(@Param('id') id: string) {
      return this.categoriesService.findStudents(+id);
  }

}