import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role-auth.guard';
import { TeachersService } from './teachers.service';

@Controller()
export class TeachersController {
  constructor(private teacherService: TeachersService) {}

  @ApiTags('Register')
  @Roles('teacher')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register/student')
  async registerStudent(@Request() req, @Response() res) {
    const body = req.body;
    const student = await this.teacherService.createStudent(body);
    res.status(201).send(student);
  }

  @ApiTags('Register')
  @Roles('teacher')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register/instructor')
  async registerInstructor(@Request() req, @Response() res) {
    const body = req.body;
    const student = await this.teacherService.createInstructor(body);
    res.status(201).send(student);
  }
}
