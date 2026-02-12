import { BadRequestException, Injectable } from '@nestjs/common';

import {
  CreateOrderRequestDto,
  CreateOrderResponseDto,
  OrderResultDto,
  TicketDto,
} from './dto/order.dto';

// Временное хранилище занятых мест в памяти:
// ключ: `${film}:${session}`, значение: Set<'row:seat'>
const bookedSeats = new Map<string, Set<string>>();

@Injectable()
export class OrderService {
  private getSessionKey(film: string, session: string): string {
    return `${film}:${session}`;
  }

  private formatSeat(row: number, seat: number): string {
    return `${row}:${seat}`;
  }

  private ensureNotBooked(ticket: TicketDto) {
    const sessionKey = this.getSessionKey(ticket.film, ticket.session);
    const seatKey = this.formatSeat(ticket.row, ticket.seat);
    const sessionSet = bookedSeats.get(sessionKey) ?? new Set<string>();

    if (sessionSet.has(seatKey)) {
      throw new BadRequestException(
        `Место уже занято: фильм=${ticket.film}, сеанс=${ticket.session}, место=${seatKey}`,
      );
    }

    // если свободно — бронируем
    sessionSet.add(seatKey);
    bookedSeats.set(sessionKey, sessionSet);
  }

  async createOrder(
    dto: CreateOrderRequestDto,
  ): Promise<CreateOrderResponseDto> {
    // Проверяем и бронируем все места
    for (const ticket of dto.tickets) {
      this.ensureNotBooked(ticket);
    }

    // Формируем результат (id можно сгенерировать простым способом)
    const items: OrderResultDto[] = dto.tickets.map((ticket, index) => ({
      ...ticket,
      id: `${ticket.film}-${ticket.session}-${ticket.row}-${ticket.seat}-${Date.now()}-${index}`,
    }));

    return {
      total: items.length,
      items,
    };
  }
}



