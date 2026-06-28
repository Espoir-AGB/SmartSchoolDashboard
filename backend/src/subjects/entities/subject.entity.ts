import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Class } from 'src/classes/entities/class.entity';
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

  @ManyToOne(() => School, (school) => school.subjects, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  school?: School;
}
