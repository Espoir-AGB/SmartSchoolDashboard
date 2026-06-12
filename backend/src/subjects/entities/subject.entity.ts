import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Class } from 'src/classes/entities/class.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => Class, (classe) => classe.subjects)
  @JoinTable()
  classes!: Class[];

}