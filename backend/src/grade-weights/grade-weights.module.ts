import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeWeightsService } from './grade-weights.service';
import { GradeWeightsController } from './grade-weights.controller';
import { SubjectCoefficient } from './entities/grade-weight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectCoefficient])],
  controllers: [GradeWeightsController],
  providers: [GradeWeightsService],
  exports: [GradeWeightsService],
})
export class GradeWeightsModule {}
