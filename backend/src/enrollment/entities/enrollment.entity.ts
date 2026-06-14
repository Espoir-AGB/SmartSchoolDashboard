import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Class } from 'src/classes/entities/class.entity';
import { SchoolYear } from 'src/school-year/entities/school-year.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Student, (student) => student.enrollments, { onDelete: 'CASCADE' })
  student!: Student;

  @ManyToOne(() => Class, (classe) => classe.enrollments)
  class!: Class;

  @ManyToOne(() => SchoolYear, (year) => year.enrollments)
  schoolYear!: SchoolYear;
}