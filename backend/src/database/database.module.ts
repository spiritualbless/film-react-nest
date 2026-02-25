import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: parseInt(configService.get<string>('DATABASE_PORT', '5432'), 10),
        username: configService.get<string>('DATABASE_USERNAME', 'film_user'),
        password: configService.get<string>('DATABASE_PASSWORD', 'film_password'),
        database: configService.get<string>('DATABASE_NAME', 'film_db'),
        entities: [Film, Schedule],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
