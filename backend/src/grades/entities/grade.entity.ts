import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { Class } from '../../classes/entities/class.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  score!: number;

  @Column()
  term!: string; // "trim1", "trim2", "trim3"

  @ManyToOne(() => Subject, (subject) => subject.grades)
  subject!: Subject;
  //@ManyToOne(() => Subject)
  //subject!: Subject;

  @ManyToOne(() => Student, (student) => student.grades)
  student!: Student;

  @ManyToOne(() => Class)
  class!: Class;
}