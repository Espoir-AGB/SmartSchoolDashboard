import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() body: any) {
    return this.categoriesService.create(body, body.schoolId);
  }

  @Get()
  findAll(@Query('schoolId') schoolId: string) {
    return this.categoriesService.findAll(+schoolId);
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