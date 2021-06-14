import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TeacherDocument = Teacher & Document;
@Schema({ collection: 'teachers', timestamps: true })
export class Teacher extends mongoose.Document {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ type: String })
  email;

  @ApiProperty()
  @Prop({ type: String })
  password: string;

  @ApiProperty()
  @Prop()
  roles: string[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
