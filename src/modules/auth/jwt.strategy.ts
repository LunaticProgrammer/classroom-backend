import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { jwtConstants } from '../../common/constants';
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teachers/teachers.service';
import { InstructorsService } from '../instructors/instructors.service';
// import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private studentService: StudentsService,
    private teacherService: TeachersService,
    private instructorService: InstructorsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const student = await this.studentService.getStudent({
      _id: payload.sub,
    });
    const instructor = await this.instructorService.getInstructor({
      _id: payload.sub,
    });
    const teacher = await this.teacherService.getTeacher({
      _id: payload.sub,
    });
    if (
      student[0] === undefined &&
      instructor[0] === undefined &&
      teacher[0] === undefined
    ) {
      throw new HttpException(
        'the user account does not exist',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      _id: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
