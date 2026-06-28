import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Subject } from '../../subjects/entities/subject.entity';

@Entity()
@Unique(['subject'])
export class SubjectCoefficient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  subjectId!: number;

  @Column('float', { default: 1 })
  coefficient!: number;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  subject!: Subject;
}
