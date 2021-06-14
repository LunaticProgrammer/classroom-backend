import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
// import { Student } from './student.schema';

export type ClassDocument = Class & Document;
@Schema({ collection: 'class', timestamps: true })
export class Class extends mongoose.Document {
  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  subject: string;

  @ApiProperty()
  @Prop()
  date: string; //utc-time

  @ApiProperty()
  @Prop()
  start: string; //utc-time

  @ApiProperty()
  @Prop()
  end: string; //utc-time

  @ApiProperty()
  @Prop()
  instructor: string;

  @ApiProperty()
  @Prop()
  students: any[]; //array of students for this class
}

export const ClassSchema = SchemaFactory.createForClass(Class);
