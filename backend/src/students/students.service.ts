import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { read, utils } from 'xlsx';
import { Student } from './entities/student.entity';
import { Class } from '../classes/entities/class.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}

  async create(data: any) {
    if (!data.classId) {
      throw new BadRequestException('classId is required');
    }

    const classExists = await this.classRepo.findOne({
      where: { id: data.classId },
      relations: {
        category: {
          school: true,
        },
      },
    });

    if (!classExists) {
      throw new BadRequestException('Class not found');
    }

    return this.studentRepo.save({
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      birthdate: data.birthdate,
      matricule: data.matricule,
      parentPhone: data.parentPhone,
      class: { id: data.classId },
      school: classExists.category.school, // automatique
    });
  }

  async importFromSpreadsheet(file: any) {
    const workbook = read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    if (!sheet) {
      throw new BadRequestException('Spreadsheet is empty');
    }

    const rows = utils.sheet_to_json<Record<string, any>>(sheet, { defval: '' });
    if (rows.length === 0) {
      throw new BadRequestException('No data found in spreadsheet');
    }

    const imported: any[] = [];
    for (const row of rows) {
      const firstName = this.getField(row, ['firstName', 'firstname', 'first name', 'nom']);
      const lastName = this.getField(row, ['lastName', 'lastname', 'last name', 'prenom']);
      const gender = this.getField(row, ['gender', 'sexe']);
      const birthdate = this.getField(row, ['birthdate', 'dateOfBirth', 'date of birth', 'naissance']);
      const matricule = this.getField(row, ['matricule', 'registration', 'matricule']);
      const parentPhone = this.getField(row, ['parentPhone', 'parent phone', 'phone', 'telephone', 'tel']);
      const classId = Number(this.getField(row, ['classId', 'class id', 'classid']));
      const classLevel = this.getField(row, ['classLevel', 'class level', 'level']);
      const classSection = this.getField(row, ['classSection', 'class section', 'section']);

      if (!firstName || !lastName) {
        throw new BadRequestException('firstName and lastName are required for each row');
      }

      let classExists: Class | null = null;
      if (classId) {
        classExists = await this.classRepo.findOne({
          where: { id: classId },
          relations: { category: { school: true } },
        });
      } else if (classLevel) {
        const query: any = { level: classLevel };
        if (classSection) query.section = classSection;
        classExists = await this.classRepo.findOne({
          where: query,
          relations: { category: { school: true } },
        });
      }

      if (!classExists) {
        throw new BadRequestException(
          `Class not found for row with firstName=${firstName} lastName=${lastName}`,
        );
      }

      const student = await this.create({
        firstName,
        lastName,
        gender,
        birthdate,
        matricule: matricule || undefined,
        parentPhone,
        classId: classExists.id,
      });
      imported.push(student);
    }

    return { imported: imported.length, students: imported };
  }

  private getField(row: Record<string, any>, candidates: string[]) {
    for (const candidate of candidates) {
      const key = Object.keys(row).find(
        (k) => k.toLowerCase().replace(/\s+/g, '') === candidate.toLowerCase().replace(/\s+/g, ''),
      );
      if (key && row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '') {
        return String(row[key]).trim();
      }
    }
    return '';
  }

  findAll() {
    return this.studentRepo.find({
      relations: {
        class: true,
      },
    });
  }

  findOne(id: number) {
    return this.studentRepo.findOne({
      where: { id },
      relations: {
        class: true,
      },
    });
  }

 findBySchool(schoolId: number) {
    return this.studentRepo.find({
      where: {
        school: { id: schoolId },
      },
      relations: {
        class: true,
      },
    });
  }

  update(id: number, data: Partial<Student>) {
    return this.studentRepo.update(id, data);
  }

  remove(id: number) {
    return this.studentRepo.delete(id);
  }
}