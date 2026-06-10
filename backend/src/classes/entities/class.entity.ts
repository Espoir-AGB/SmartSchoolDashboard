import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Category } from 'src/categories/entities/category.entity';
@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  level!: string; // "6ème", "1ère", "Terminale"

  @Column({ nullable: true })
  section?: string; // "A", "B", etc (optionnel)

  @Column({ default: false })
  examClass!: boolean;

  @OneToMany(() => Student, (student) => student.class)
  students!: Student[];

  @ManyToOne(() => Category, (category) => category.classes)
  category!: Category;

  get fullName(): string {
    return this.section ? `${this.level} ${this.section}` : this.level;
  }
}
