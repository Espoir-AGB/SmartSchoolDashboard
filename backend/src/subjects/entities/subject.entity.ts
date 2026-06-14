import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Class } from 'src/classes/entities/class.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import { School } from 'src/school/entities/school.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Class, (classe) => classe.subjects)
  @JoinTable()
  classes!: Class[];

  @OneToMany(() => Grade, (grade) => grade.subject)
  grades!: Grade[];

  @ManyToOne(() => School, (school) => school.subjects)
  school!: School;
}
