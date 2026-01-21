import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FilmDto, SessionDto } from '../films/dto/films.dto';
import { FilmDocument } from '../films/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel('Film')
    private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    const docs = await this.filmModel.find({}).lean().exec();

    return docs.map(
      (doc): FilmDto => ({
        id: doc.id,
        rating: doc.rating,
        director: doc.director,
        tags: doc.tags,
        title: doc.title,
        about: doc.about,
        description: doc.description,
        image: doc.image,
        cover: doc.cover,
      }),
    );
  }

  async findSessionsByFilm(id: string): Promise<SessionDto[]> {
    const doc = await this.filmModel.findOne({ id }).lean().exec();
    if (!doc) {
      return [];
    }

    return doc.schedule.map(
      (s): SessionDto => ({
        id: s.id,
        film: doc.id,
        daytime: s.daytime,
        hall: String(s.hall),
        rows: s.rows,
        seats: s.seats,
        price: s.price,
        taken: s.taken,
      }),
    );
  }
}



