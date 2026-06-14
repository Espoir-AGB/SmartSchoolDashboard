import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Index } from 'typeorm';
import { Class } from '../../classes/entities/class.entity';
import { School } from 'src/school/entities/school.entity';

@Entity()
@Index(['name', 'school'], { unique: true }) //unique par ecole
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => School, (school) => school.categories, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  school!: School;

  @OneToMany(() => Class, (classe) => classe.category)
  classes!: Class[];
}