import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { features } from 'src/common/constants';
// import { TeacherSchema } from 'src/schemas/teacher.schema';
import { InstructorsModule } from '../instructors/instructors.module';
import { InstructorsService } from '../instructors/instructors.service';
import { StudentsModule } from '../students/students.module';
import { StudentsService } from '../students/students.service';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [
    MongooseModule.forFeature(features),
    StudentsModule,
    InstructorsModule,
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
