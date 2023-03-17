import { Controller, Get, Options } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Options('*')
  handleOptions() {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'Access-Control-Allow-Headers': 'authorization,content-type',
        'Access-Control-Allow-Credentials': true,
      },
    };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
