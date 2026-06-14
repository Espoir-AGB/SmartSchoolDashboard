import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { CategoriesModule } from './categories/categories.module';
import { SubjectsModule } from './subjects/subjects.module';
import { GradesModule } from './grades/grades.module';
import { AcademicPeriodModule } from './academic-period/academic-period.module';
import { SchoolModule } from './school/school.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { SchoolYearModule } from './school-year/school-year.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,

    }),

    StudentsModule,

    ClassesModule,

    CategoriesModule,

    SubjectsModule,

    GradesModule,

    AcademicPeriodModule,

    SchoolModule,

    EnrollmentModule,

    SchoolYearModule,
  ],
})
export class AppModule {}