import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getHashedPassword } from 'src/common/constants';
import { InstructorsService } from '../instructors/instructors.service';
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teachers/teachers.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private teacherService: TeachersService,
    private instructorService: InstructorsService,
    private studentService: StudentsService,
  ) {}
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
      roles: user.roles,
      createdAt: new Date().toUTCString(),
    };
    let userDetails =
      (await this.teacherService.getTeacher({ _id: user._id }))[0] ||
      (await this.instructorService.getInstructor({ _id: user._id }))[0] ||
      (await this.studentService.getStudent({ _id: user._id }))[0];
    delete userDetails['_doc']['password'];
    const loginDetails = {};
    loginDetails['data'] = {
      access_token: this.jwtService.sign(payload),
      user: userDetails,
    };
    return loginDetails;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    let user =
      (await this.teacherService.getTeacher({ email }))[0] ||
      (await this.instructorService.getInstructor({ email }))[0] ||
      (await this.studentService.getStudent({ email }))[0];
    if (!user) {
      throw new HttpException('Check email or password', HttpStatus.NOT_FOUND);
    }
    const isMatch = await this.comparePassword(pass, user['password']);
    // const isMatch = await bcrypt.compare(user.password, pass);
    if (user && isMatch) {
      delete user.password; //hide password from payload
      return user;
    } else {
      throw new HttpException('Check email or password', HttpStatus.NOT_FOUND);
    }
  }

  async comparePassword(textPassword, hashedPassword) {
    const hashPass = await getHashedPassword({
      password: textPassword,
    });
    return hashPass.hashedPassword === hashedPassword;
  }
}
