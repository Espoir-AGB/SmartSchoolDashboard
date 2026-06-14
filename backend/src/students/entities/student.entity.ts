import { ManyToOne, OneToMany } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Class } from '../../classes/entities/class.entity';
import { Grade } from 'src/grades/entities/grade.entity';
import { School } from 'src/school/entities/school.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    firstname!: string;
    
    @Column()
    lastname!: string;
    
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

    @OneToMany(() => Grade, (grade) => grade.student)
    grades!: Grade[];

    @ManyToOne(() => School, (school) => school.students)
    school!: School;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
    enrollments!: Enrollment[];
}