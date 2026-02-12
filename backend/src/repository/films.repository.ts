import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmDto, SessionDto } from '../films/dto/films.dto';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    const films = await this.filmRepository.find({
      order: { created_at: 'ASC' },
    });

    return films.map(
      (film): FilmDto => ({
        id: film.id,
        rating: Number(film.rating),
        director: film.director,
        tags: film.tags,
        title: film.title,
        about: film.about,
        description: film.description,
        image: film.image,
        cover: film.cover,
      }),
    );
  }

  async findSessionsByFilm(id: string): Promise<SessionDto[]> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });

    if (!film || !film.schedules) {
      return [];
    }

    return film.schedules.map(
      (schedule): SessionDto => ({
        id: schedule.id,
        film: film.id,
        daytime: schedule.daytime.toISOString(),
        hall: String(schedule.hall),
        rows: schedule.rows,
        seats: schedule.seats,
        price: Number(schedule.price),
        taken: schedule.taken,
      }),
    );
  }
}
