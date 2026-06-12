import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Grade } from '../../grades/entities/grade.entity';

@Entity()
export class AcademicPeriod {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; // "Trimestre 1", "Devoir 1", "Semestre 1"

  @Column()
  type!: string; // "trimester" | "semester" | "exam" | "test"

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @OneToMany(() => Grade, (grade) => grade.period)
  grades!: Grade[];
}