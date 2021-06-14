import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type StudentDocument = Student & Document;
@Schema({ collection: 'students', timestamps: true })
export class Student extends mongoose.Document {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  roles: string[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
