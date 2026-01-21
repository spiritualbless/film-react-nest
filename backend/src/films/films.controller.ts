import { Controller, Get, Param } from '@nestjs/common';

import { FilmsService } from './films.service';
import { FilmDto, ListResponseDto, SessionDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/')
  async getFilms(): Promise<ListResponseDto<FilmDto>> {
    return this.filmsService.getFilms();
  }

  @Get('/:id/schedule')
  async getFilmSchedule(
    @Param('id') id: string,
  ): Promise<ListResponseDto<SessionDto>> {
    return this.filmsService.getFilmSchedule(id);
  }
}


