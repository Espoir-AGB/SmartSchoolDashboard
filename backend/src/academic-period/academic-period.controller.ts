import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AcademicPeriodService } from './academic-period.service';

@Controller('periods')
export class AcademicPeriodController {
  constructor(private readonly service: AcademicPeriodService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}