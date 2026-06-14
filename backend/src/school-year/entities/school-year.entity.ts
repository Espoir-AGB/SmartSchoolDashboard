import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';

@Entity()
export class SchoolYear {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; // "2026-2027"

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column({ default: false })
  isCurrent!: boolean;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.schoolYear)
  enrollments!: Enrollment[];
}