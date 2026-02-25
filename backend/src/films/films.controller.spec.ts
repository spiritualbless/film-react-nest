import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { ListResponseDto, FilmDto, SessionDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: jest.Mocked<FilmsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            getFilms: jest.fn(),
            getFilmSchedule: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get(FilmsService);
  });

  it('delegates getFilms to FilmsService and returns result', async () => {
    const result: ListResponseDto<FilmDto> = {
      total: 1,
      items: [
        {
          id: '1',
          rating: 10,
          director: 'Dir',
          tags: ['tag'],
          title: 'Title',
          about: 'About',
          description: 'Desc',
          image: 'image',
          cover: 'cover',
        },
      ],
    };
    service.getFilms.mockResolvedValue(result);

    const response = await controller.getFilms();

    expect(service.getFilms).toHaveBeenCalledTimes(1);
    expect(response).toEqual(result);
  });

  it('delegates getFilmSchedule to FilmsService with id and returns result', async () => {
    const result: ListResponseDto<SessionDto> = {
      total: 1,
      items: [
        {
          id: 's1',
          film: '1',
          daytime: '2020-01-01T00:00:00.000Z',
          hall: '1',
          rows: 10,
          seats: 10,
          price: 100,
          taken: [],
        },
      ],
    };
    service.getFilmSchedule.mockResolvedValue(result);

    const response = await controller.getFilmSchedule('1');

    expect(service.getFilmSchedule).toHaveBeenCalledWith('1');
    expect(response).toEqual(result);
  });
}

