import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

import { Subject } from './entities/subject.entity';
import { Class } from '../classes/entities/class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject, Class]),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}