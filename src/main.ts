import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // for properties that are not present in the DTO, strip them out
      forbidNonWhitelisted: true, // for extra properties are not present in the DTO, throw an error
      transform: true, // Auto-transform payloads to be objects typed according to their DTO classes
    }),
  );
  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
