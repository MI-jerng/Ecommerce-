import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { RabbitMQService } from '../../rabbitmq/rabbitmq.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, RabbitMQService],
})
export class OrderModule {}
