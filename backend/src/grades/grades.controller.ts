import { Controller, Get, Post, Body } from '@nestjs/common';
import { GradesService } from './grades.service';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  create(@Body() body: any) {
    return this.gradesService.create(body);
  }

  @Get()
  findAll() {
    return this.gradesService.findAll();
  }
}