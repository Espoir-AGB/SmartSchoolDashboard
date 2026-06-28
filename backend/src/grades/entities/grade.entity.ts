import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Subject } from '../../subjects/entities/subject.entity';

export enum GradeType {
  INTERRO = 'interro',       // Contrôle / test court
  DEVOIR = 'devoir',         // Travail à la maison
  EXAMEN = 'examen',         // Examen final
  PROJET = 'projet',         // Projet collectif
}

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  studentId!: number;

  @Column({ nullable: true })
  subjectId?: number;

  @Column('float')
  value!: number;

  @Column({ type: 'enum', enum: GradeType, default: GradeType.INTERRO })
  type!: GradeType;

  @Column({ nullable: true })
  comment?: string;

  @Column({ default: 'Trimestre 1' })
  term!: string;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  student!: Student;

  @ManyToOne(() => Subject, { nullable: true, onDelete: 'SET NULL' })
  subject!: Subject | null;

  @CreateDateColumn()
  createdAt!: Date;
}
