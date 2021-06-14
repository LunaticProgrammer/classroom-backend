import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getHashedPassword } from 'src/common/constants';
import { Student, StudentDocument } from 'src/schemas/student.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async getStudent(parameters) {
    const student = await this.studentModel.find(parameters);
    return student;
  }

  async createStudent(parameters) {
    parameters.password = (await getHashedPassword(parameters)).hashedPassword;
    const student = await this.studentModel.create(parameters);
    return student;
  }
}
