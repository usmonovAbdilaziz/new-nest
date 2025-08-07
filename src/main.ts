import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidatePromise } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log('Server runinig on port ', PORT));
}
bootstrap();
