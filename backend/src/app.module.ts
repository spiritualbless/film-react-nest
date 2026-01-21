import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsRepository } from './repository/films.repository';
import { FilmSchema } from './films/film.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // Подключение к MongoDB (берём строку подключения из MONGO_URL или используем дефолт)
    MongooseModule.forRoot(
      process.env.MONGO_URL ?? 'mongodb://localhost:27017/afisha',
    ),
    // Модель фильмов
    MongooseModule.forFeature([
      { name: 'Film', schema: FilmSchema },
    ]),
    // Раздача статических файлов с афишей
    ServeStaticModule.forRoot({
      // В файловой системе картинки лежат в public/content/afisha
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, OrderService, FilmsRepository],
})
export class AppModule {}

