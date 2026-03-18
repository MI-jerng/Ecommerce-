import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '../../rabbitmq/rabbitmq.service';

@Injectable()
export class OrderService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async createOrder(order: any) {
    // Here you would normally save the order to the database
    // Emit event to RabbitMQ
    await this.rabbitMQService.emit('order_created', order);
  }
}
