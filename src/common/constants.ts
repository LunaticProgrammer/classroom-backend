import { HttpException, HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto';
import { Class, ClassSchema } from 'src/schemas/class.schema';
import { Instructor, InstructorSchema } from 'src/schemas/instructor.schema';
import { Student, StudentSchema } from 'src/schemas/student.schema';
import { Teacher, TeacherSchema } from 'src/schemas/teacher.schema';

export const jwtConstants = {
  secret: 'somehardcodedsecret',
  timeout: '30d',
};

const salt = 'someSaltForFood';

export const superAdminPassword = 'someVeryLongContainingSpecialCharacters';

export async function getHashedPassword(options) {
  const password = options.password;
  if (!password) {
    throw new HttpException(
      'No password provided to be hashed',
      HttpStatus.BAD_REQUEST,
    );
    return null;
  }
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const hashedPassword = hash.digest('hex');
  return {
    hashedPassword: hashedPassword,
  };
}

export const features = [
  { name: Student.name, schema: StudentSchema },
  { name: Teacher.name, schema: TeacherSchema },
  { name: Class.name, schema: ClassSchema },
  { name: Instructor.name, schema: InstructorSchema },
];
