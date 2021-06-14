import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { features } from 'src/common/constants';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';

@Module({
  imports: [MongooseModule.forFeature(features)],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService],
})
export class ClassesModule {}
