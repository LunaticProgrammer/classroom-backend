import { Controller, Get, UseGuards, Request, Response } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClassesService } from '../classes/classes.service';

@Controller('students')
export class StudentsController {
  constructor(private classService: ClassesService) {}

  @Roles('student', 'teacher')
  @UseGuards(JwtAuthGuard)
  @Get('schedule')
  async giveSchedule(@Request() req, @Response() res) {
    let date;
    if (req.body.date) {
      date = new Date(req.body.date).toDateString();
    } else {
      date = new Date().toDateString();
    }

    const events = await this.classService.getClasses({
      date,
      userId: req.user._id,
    });
    res.status(200).send(events);
  }
}
