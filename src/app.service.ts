import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { superAdminPassword, getHashedPassword } from 'src/common/constants';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Teacher.name)
    private teacherModel: Model<TeacherDocument>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createTeacher(body) {
    if (body.superAdminPassword === superAdminPassword) {
      delete body.superAdminPassword;
    }
    body.password = (await getHashedPassword(body)).hashedPassword;
    const teacher = await this.teacherModel.create(body);
  }
}
