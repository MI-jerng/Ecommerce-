import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly url = process.env.RABBITMQ_URL || 'amqp://localhost';

  async onModuleInit() {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
  }

  async emit(queue: string, payload: any) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
