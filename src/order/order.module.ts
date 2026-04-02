import { forwardRef, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost'],
          queue: 'order_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    forwardRef(() => NotificationsModule),
  ],
  controllers: [OrderController],
  providers: [OrderService, RabbitMQService],
  exports: [OrderService],
})
export class OrderModule {}
