import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { ClientProxy } from '@nestjs/microservices';
import { forwardRef, Inject } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE') private client: ClientProxy,
    @Inject(forwardRef(() => NotificationsService))
    private readonly notifications: NotificationsService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async createOrder(orderDto: any) {
    this.client.emit('order_created', {order: orderDto, createdAt: new Date().toISOString(),});

    this.notifications.notify('order_created', {
      order: orderDto,
    });
    // Here you would normally save the order to the database
    // Emit event to RabbitMQ
    await this.rabbitMQService.emit('order_created', orderDto);
  }
}
