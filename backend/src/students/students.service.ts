import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {

  //private students = [];
  private students: any[] = [];

  create(data: any) {
    this.students.push(data);
    return data;
  }

  findAll() {
    return this.students;
  }

  findOne(id: number) {
    return this.students[id];
  }

  update(id: number, data: any) {
    this.students[id] = data;
    return data;
  }

  remove(id: number) {
    this.students.splice(id, 1);
    return { deleted: true };
  }
}