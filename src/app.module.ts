import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { Receipt } from './recripts/receipt.entity';
import { ReceiptsModule } from './recripts/receipts.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Apple@747525',
      database: 'todo',
      entities: [User, Task, Receipt],
      synchronize: true,
    }),
    UserModule,
    TaskModule,
    ReceiptsModule,
    OrderModule,
  ],
})
export class AppModule {}
