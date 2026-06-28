import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Class } from 'src/classes/entities/class.entity';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { SchoolYear } from 'src/school-year/entities/school-year.entity';
import { Category } from 'src/categories/entities/category.entity';

export enum AcademicCycleType {
  TRIMESTER = 'TRIMESTER',
  SEMESTER = 'SEMESTER',
}

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'varchar', nullable: true })
  academicCycleType?: AcademicCycleType;

  @Column({ type: 'int', nullable: true })
  periodsPerYear?: number;

  @Column({ type: 'int', nullable: true })
  devoirsPerPeriod?: number;

  @Column({ type: 'int', nullable: true })
  interrogationsPerSubjectPerPeriod?: number;

  @Column({ type: 'int', nullable: true })
  interrogationsPerDevoir?: number;

  @Column({ type: 'varchar', nullable: true })
  bulletinMode?: 'PERIOD' | 'ASSESSMENT';

  @OneToMany(() => Class, (classe) => classe.school)
  classes!: Class[];

  @OneToMany(() => Student, (student) => student.school)
  students!: Student[];

  @OneToMany(() => Subject, (subject) => subject.school)
  subjects!: Subject[];

  @OneToMany(() => SchoolYear, (year) => year.school)
  schoolYears!: SchoolYear[];

  @OneToMany(() => Category, (category) => category.school)
  categories!: Category[];
}