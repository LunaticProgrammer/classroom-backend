import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { StudentsModule } from './modules/students/students.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { ClassesModule } from './modules/classes/classes.module';
import { InstructorsModule } from './modules/instructors/instructors.module';
import { features } from './common/constants';

@Module({
  imports: [
    MongooseModule.forFeature(features),
    MongooseModule.forRoot('mongodb://localhost/classroom'),
    AuthModule,
    StudentsModule,
    TeachersModule,
    ClassesModule,
    InstructorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
