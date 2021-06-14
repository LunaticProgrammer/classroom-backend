import { Controller } from '@nestjs/common';
import { ClassesService } from '../classes/classes.service';

@Controller('instructors')
export class InstructorsController {
  constructor(private classService: ClassesService) {}
}
