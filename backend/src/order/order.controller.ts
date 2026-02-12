import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderRequestDto, CreateOrderResponseDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(
    @Body() body: CreateOrderRequestDto,
  ): Promise<CreateOrderResponseDto> {
    return this.orderService.createOrder(body);
  }
}

