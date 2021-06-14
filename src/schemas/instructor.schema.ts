import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type InstructorDocument = Instructor & Document;
@Schema({ collection: 'instructors', timestamps: true })
export class Instructor extends mongoose.Document {
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

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
