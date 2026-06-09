import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() data: any) {
    return this.studentsService.create(data);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.studentsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.studentsService.remove(id);
  }
}