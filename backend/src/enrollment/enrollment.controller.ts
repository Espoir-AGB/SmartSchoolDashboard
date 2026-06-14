import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentsService } from './enrollment.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly service: EnrollmentsService) {}

  @Post()
  create(@Body() dto: CreateEnrollmentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Get('school-year/:id/students')
    findStudentsBySchoolYear(@Param('id') id: string) {
      return this.service.findStudentsBySchoolYear(+id);
  }
}
