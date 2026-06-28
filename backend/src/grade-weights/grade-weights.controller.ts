import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { GradeWeightsService } from './grade-weights.service';
import { CreateGradeWeightDto } from './dto/create-grade-weight.dto';
import { UpdateGradeWeightDto } from './dto/update-grade-weight.dto';

@Controller('subjects/:subjectId/grade-coefficient')
export class GradeWeightsController {
  constructor(private readonly weightsService: GradeWeightsService) {}

  @Get()
  getCoefficient(@Param('subjectId', ParseIntPipe) subjectId: number) {
    return this.weightsService.getCoefficientForSubject(subjectId);
  }

  @Post()
  setCoefficient(
    @Param('subjectId', ParseIntPipe) subjectId: number,
    @Body() data: CreateGradeWeightDto,
  ) {
    return this.weightsService.setCoefficient(subjectId, data);
  }

  @Patch()
  updateCoefficient(
    @Param('subjectId', ParseIntPipe) subjectId: number,
    @Body() data: UpdateGradeWeightDto,
  ) {
    return this.weightsService.updateCoefficient(subjectId, data);
  }

  @Delete()
  deleteCoefficient(@Param('subjectId', ParseIntPipe) subjectId: number) {
    return this.weightsService.deleteCoefficient(subjectId);
  }
}
