import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Student } from 'src/students/entities/student.entity';
import { Class } from 'src/classes/entities/class.entity';
import { SchoolYear } from 'src/school-year/entities/school-year.entity';

import { EnrollmentsService } from './enrollment.service';
import { EnrollmentsController } from './enrollment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Enrollment,
      Student,
      Class,
      SchoolYear,
    ]),
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentModule {}