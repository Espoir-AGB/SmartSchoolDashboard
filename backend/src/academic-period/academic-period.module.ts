import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AcademicPeriod } from './entities/academic-period.entity';
import { SchoolYear } from 'src/school-year/entities/school-year.entity';

import { AcademicPeriodsService } from './academic-period.service';
import { AcademicPeriodsController } from './academic-period.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AcademicPeriod,
      SchoolYear,
    ]),
  ],
  controllers: [AcademicPeriodsController],
  providers: [AcademicPeriodsService],
})
export class AcademicPeriodModule {}