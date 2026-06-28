import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { GradeType } from './entities/grade.entity';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  create(@Body() data: CreateGradeDto) {
    return this.gradesService.create(data);
  }

  @Get()
  findAll() {
    return this.gradesService.findAll();
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.gradesService.findByStudent(studentId);
  }

  @Get('student/:studentId/average')
  getAverage(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.gradesService.getAverageForStudent(studentId);
  }

  @Get('student/:studentId/average/:type')
  getAverageByType(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('type') type: GradeType,
  ) {
    return this.gradesService.getAverageByType(studentId, type);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gradesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateGradeDto) {
    return this.gradesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gradesService.remove(id);
  }
}