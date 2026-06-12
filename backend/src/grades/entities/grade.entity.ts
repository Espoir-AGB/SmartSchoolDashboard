import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { Class } from '../../classes/entities/class.entity';
import { AcademicPeriod } from '../../academic-period/entities/academic-period.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  score!: number;

  @ManyToOne(() => Subject, (subject) => subject.grades)
  subject!: Subject;

  @ManyToOne(() => Student, (student) => student.grades)
  student!: Student;

  @ManyToOne(() => Class)
  class!: Class;

  @ManyToOne(() => AcademicPeriod, (period) => period.grades)
  period!: AcademicPeriod;
}