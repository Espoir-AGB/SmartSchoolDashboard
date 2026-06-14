import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { AcademicPeriod } from 'src/academic-period/entities/academic-period.entity';
import { School } from 'src/school/entities/school.entity';

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


  @ManyToOne(() => School, (school) => school.schoolYears, {
  onDelete: 'CASCADE',
  })
  school!: School;
    
  @OneToMany(() => Enrollment, (enrollment) => enrollment.schoolYear)
  enrollments!: Enrollment[];

  @OneToMany(() => AcademicPeriod, (period) => period.schoolYear)
    academicPeriods!: AcademicPeriod[];
}