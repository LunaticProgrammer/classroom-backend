import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { features } from 'src/common/constants';
import { ClassesModule } from '../classes/classes.module';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [MongooseModule.forFeature(features), ClassesModule],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
