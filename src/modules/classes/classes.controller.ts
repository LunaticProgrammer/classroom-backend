import {
  Controller,
  Response,
  UseGuards,
  Request,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role-auth.guard';
import { ClassesService } from './classes.service';

@Controller('classes')
@ApiTags('Classes')
export class ClassesController {
  constructor(private classService: ClassesService) {}

  @Roles('instructor', 'teacher')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async createClass(@Request() req, @Response() res) {
    const body = req.body;
    const createdClass = this.classService.createClass(body);
    res.status(201).send(createdClass);
  }

  @Roles('instructor', 'teacher')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update/:id')
  async updateClass(@Request() req, @Response() res) {
    const id = req.params.id;
    const body = req.body;
    const updatedClass = this.classService.updateClass({ _id: id }, body);
    if (updatedClass) {
      res.status(200).send({ message: 'success' });
    }
  }
}
