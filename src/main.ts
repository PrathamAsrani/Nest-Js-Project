import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(app.get(ConfigService).get<number>('PORT') ?? 3001);
}
bootstrap();

// This file is used to bootstrap the application and start the server.
// It is the main entry point of the application.