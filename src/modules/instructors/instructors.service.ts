import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getHashedPassword } from 'src/common/constants';
import { Instructor, InstructorDocument } from 'src/schemas/instructor.schema';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectModel(Instructor.name)
    private instructorModel: Model<InstructorDocument>,
  ) {}

  async getInstructor(parameters) {
    const instructor = await this.instructorModel.find(parameters);
    return instructor;
  }

  async createInstructor(parameters) {
    parameters.password = (await getHashedPassword(parameters)).hashedPassword;
    const instructor = await this.instructorModel.create(parameters);
    return instructor;
  }
}
