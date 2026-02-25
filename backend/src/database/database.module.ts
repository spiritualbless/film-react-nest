import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV') ?? 'development';
        const synchronizeEnv = configService.get<string>('DB_SYNCHRONIZE');

        const synchronize =
          synchronizeEnv !== undefined
            ? synchronizeEnv === 'true'
            : nodeEnv !== 'production';

        return {
          type: 'postgres' as const,
          host: configService.get<string>('DATABASE_HOST', 'localhost'),
          port: parseInt(
            configService.get<string>('DATABASE_PORT', '5432'),
            10,
          ),
          username: configService.get<string>('DATABASE_USERNAME', 'film_user'),
          password: configService.get<string>(
            'DATABASE_PASSWORD',
            'film_password',
          ),
          database: configService.get<string>('DATABASE_NAME', 'film_db'),
          entities: [Film, Schedule],
          synchronize,
          logging: nodeEnv === 'development',
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
