import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { cors } from './middleware/cors.middleware';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(cors)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
