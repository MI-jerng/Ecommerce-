import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { Receipt } from './recripts/receipt.entity';
import { ReceiptsModule } from './recripts/receipts.module';
import { OrderModule } from './order/order.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Category } from './category/category.entity';
import { Product } from './product/product.entity';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Apple@747525',
      database: 'todo',
      entities: [User, Task, Receipt, Category, Product],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      playground: true,
    }),
    GraphqlModule,
    UserModule,
    TaskModule,
    ReceiptsModule,
    OrderModule,
    NotificationsModule,
    CoreModule,
  ],
})
export class AppModule {}
