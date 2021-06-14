import { Controller, Get, Post, Request } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiExcludeEndpoint()
  rootGet(@Request() req) {
    return {
      documentationUrl: '/docs',
      status: 'ok',
      datetime: new Date(),
    };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags('Register')
  @Post('/register/teacher')
  async createTeacher(@Request() req) {
    const body = req.body;
    const createdTeacher = await this.appService.createTeacher(body);
    console.log(createdTeacher);
    return createdTeacher;
  }
}
