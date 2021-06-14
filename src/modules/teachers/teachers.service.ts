import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor, InstructorDocument } from 'src/schemas/instructor.schema';
import { Student, StudentDocument } from 'src/schemas/student.schema';
import { Teacher, TeacherDocument } from 'src/schemas/teacher.schema';
import { InstructorsService } from '../instructors/instructors.service';
import { StudentsService } from '../students/students.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name)
    private teacherModel: Model<TeacherDocument>,
    private studentService: StudentsService,
    private instructorService: InstructorsService,
  ) {}

  async getTeacher(parameters) {
    const teacher = await this.teacherModel.find(parameters);
    return teacher;
  }

  async createStudent(body) {
    const student = await this.studentService.createStudent(body);
    delete student.password;
    return student;
  }

  async createInstructor(body) {
    const inst = await this.instructorService.createInstructor(body);
    delete inst.password;
    return inst;
  }
}
