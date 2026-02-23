import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Type } from 'class-transformer';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Add your entities here
  providers: [UserService],
  controllers: [UsersController],
  exports: [TypeOrmModule],
  // Add any other necessary configurations or modules
})
export class UserModule {}
