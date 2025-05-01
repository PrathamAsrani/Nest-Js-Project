import { Injectable } from '@nestjs/common';

/*
// This file is used to handle the business logic and interact with the database.
// It is used to get the data from the database and return it to the controller.
*/

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! I am Pratham. I am learning NestJS.';
  }
}
