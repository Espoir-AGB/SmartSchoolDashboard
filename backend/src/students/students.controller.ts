import { Controller, Get, Post, Body, Param, Patch, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() data: any) {
    return this.studentsService.create(data);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async import(@UploadedFile(
    new ParseFilePipe({
      validators: [new FileTypeValidator({ fileType: '.(xlsx|xls|csv)$' })],
    }),
  ) file: any) {
    if (!file) {
      throw new BadRequestException('Spreadsheet file is required');
    }
    return this.studentsService.importFromSpreadsheet(file);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('school/:schoolId')
    findBySchool(@Param('schoolId') schoolId: number) {
      return this.studentsService.findBySchool(+schoolId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.studentsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.studentsService.remove(id);
  }
}