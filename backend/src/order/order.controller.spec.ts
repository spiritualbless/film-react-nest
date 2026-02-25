import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {
  CreateOrderRequestDto,
  CreateOrderResponseDto,
} from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: jest.Mocked<OrderService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get(OrderService);
  });

  it('delegates createOrder to OrderService and returns result', async () => {
    const dto: CreateOrderRequestDto = {
      email: 'test@test.com',
      phone: '+123',
      tickets: [
        {
          film: '1',
          session: 's1',
          daytime: '2020-01-01T00:00:00.000Z',
          row: 1,
          seat: 1,
          price: 100,
        },
      ],
    };

    const result: CreateOrderResponseDto = {
      total: 1,
      items: [
        {
          ...dto.tickets[0],
          id: 'generated-id',
        },
      ],
    };

    service.createOrder.mockResolvedValue(result);

    const response = await controller.createOrder(dto);

    expect(service.createOrder).toHaveBeenCalledWith(dto);
    expect(response).toEqual(result);
  });
}

