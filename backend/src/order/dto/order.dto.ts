import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO билета (совпадает по полям с Ticket на фронте)
export class TicketDto {
  @IsString()
  @IsNotEmpty()
  film: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsString()
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class ContactsDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

// Тело запроса на бронирование: контакты + список билетов
export class CreateOrderRequestDto extends ContactsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

// Элемент результата (совпадает с OrderResult на фронте)
export class OrderResultDto extends TicketDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

// Обёртка списка результатов
export class CreateOrderResponseDto {
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderResultDto)
  items: OrderResultDto[];
}


