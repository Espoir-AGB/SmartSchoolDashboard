import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateAcademicPeriodDto } from './dto/create-academic-period.dto';
import { AcademicPeriodsService } from './academic-period.service';

@Controller('academic-periods')
export class AcademicPeriodsController {
  constructor(private readonly service: AcademicPeriodsService) {}

  @Post()
  create(@Body() dto: CreateAcademicPeriodDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('/:schoolId')
    findBySchool(@Param('schoolId') id: string) {
      return this.service.findBySchool(+id);
  }
}