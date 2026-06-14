import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Class } from './entities/class.entity';
import { Category } from 'src/categories/entities/category.entity';
import { School } from 'src/school/entities/school.entity';

import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Class,
      Category,
      School,
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}