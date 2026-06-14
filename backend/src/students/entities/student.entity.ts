import { ManyToOne, OneToMany } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Class } from '../../classes/entities/class.entity';
import { School } from 'src/school/entities/school.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    firstName!: string;
    
    @Column()
    lastName!: string;
    
    @Column()
    gender!: string;
    
    @Column()
    birthdate!: string;
    
    @Column({ unique: true })
    matricule!: string;
    
    @Column()
    parentPhone!: string;
    
    @ManyToOne(() => Class, (classe) => classe.students)
    class!: Class;

    @ManyToOne(() => School, (school) => school.students)
    school!: School;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
    enrollments!: Enrollment[];
}