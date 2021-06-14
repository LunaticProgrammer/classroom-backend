import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { features } from 'src/common/constants';
import { ClassesModule } from '../classes/classes.module';
import { InstructorsController } from './instructors.controller';
import { InstructorsService } from './instructors.service';

@Module({
  imports: [MongooseModule.forFeature(features), ClassesModule],
  controllers: [InstructorsController],
  providers: [InstructorsService],
  exports: [InstructorsService],
})
export class InstructorsModule {}
