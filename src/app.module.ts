import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';

/*
Nest js uses the modules to organize the application.
Modules are used to group related components, controllers, and services together.
In one module, we will have one controller and one service.
The controller is used to handle the incoming requests and return the response.
The service is used to handle the business logic and interact with the database.
The module is used to group the controller and service together and export them.
The module is also used to import other modules and use them in the application.
*/

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: `.env.${process.env.ENVIRONMENT || 'production'}`, // Load environment variables from .env file
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    BookModule,
  ], // for external modules
  controllers: [AppController], // for handling routes
  providers: [AppService], // for internal modules
})

export class AppModule { }
// This AppModule is the root module of the application.

