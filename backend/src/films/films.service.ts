import { Injectable } from '@nestjs/common';

import { FilmDto, ListResponseDto, SessionDto } from './dto/films.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getFilms(): Promise<ListResponseDto<FilmDto>> {
    const items = await this.filmsRepository.findAll();
    return {
      total: items.length,
      items,
    };
  }

  async getFilmSchedule(id: string): Promise<ListResponseDto<SessionDto>> {
    const items = await this.filmsRepository.findSessionsByFilm(id);
    return {
      total: items.length,
      items,
    };
  }
}



