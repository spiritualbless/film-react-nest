import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// Фильм (совпадает по полям с фронтовым Movie)
export class FilmDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  tags: string[];

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  cover: string;
}

// Один сеанс (совпадает по полям с фронтовым Session, кроме форматированных day/time)
export class SessionDto {
  @IsString()
  id: string;

  @IsString()
  film: string;

  @IsString()
  daytime: string;

  @IsString()
  hall: string;

  @IsNumber()
  rows: number;

  @IsNumber()
  seats: number;

  @IsNumber()
  price: number;

  @IsArray()
  taken: string[];
}

// Обёртка списка (как ApiListResponse на фронте)
export class ListResponseDto<T> {
  total: number;
  items: T[];
}


