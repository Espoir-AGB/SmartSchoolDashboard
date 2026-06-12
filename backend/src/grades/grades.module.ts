import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { Grade} from './entities/grade.entity';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Class } from 'src/classes/entities/class.entity';
import { AcademicPeriod } from 'src/academic-period/entities/academic-period.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Grade, Student, Subject, Class, AcademicPeriod]),
  ],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
