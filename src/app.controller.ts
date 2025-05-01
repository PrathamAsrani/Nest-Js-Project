import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/*
This file is used to get the incoming request and return the response.
handle routes
*/

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
