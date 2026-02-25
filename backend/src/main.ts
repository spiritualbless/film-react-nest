import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { LoggerService } from '@nestjs/common';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

function createLoggerFromEnv(): LoggerService {
  const envType = process.env.LOGGER_TYPE?.toLowerCase();
  const defaultType =
    process.env.NODE_ENV === 'development' ? 'dev' : 'tskv';
  const type = envType || defaultType;

  switch (type) {
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
    case 'dev':
    default:
      return new DevLogger();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(createLoggerFromEnv());
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
