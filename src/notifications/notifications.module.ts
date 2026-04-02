import { Module, forwardRef } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
// import { OrderModule } from 'src/order/order.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
