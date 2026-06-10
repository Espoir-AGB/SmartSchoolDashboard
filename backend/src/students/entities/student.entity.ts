import { ManyToOne } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Class } from '../../classes/entities/class.entity';

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
}