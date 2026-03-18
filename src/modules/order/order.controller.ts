import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: any) {
    // You can validate or transform body as needed
    await this.orderService.createOrder(body);
    return { message: 'Order created and event emitted' };
  }
}
