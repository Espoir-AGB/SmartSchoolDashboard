import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SchoolYear } from 'src/school-year/entities/school-year.entity';

@Entity()
export class AcademicPeriod {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; 
  // "Semestre 1", "Trimestre 1"

  @Column()
  type!: 'SEMESTER' | 'TRIMESTER';

  @Column()
  order!: number; 
  // 1, 2, 3

  @Column({ nullable: true })
  startDate?: Date;

  @Column({ nullable: true })
  endDate?: Date;

  @ManyToOne(() => SchoolYear, (year) => year.academicPeriods, {
    onDelete: 'CASCADE',
  })
  schoolYear!: SchoolYear;
}