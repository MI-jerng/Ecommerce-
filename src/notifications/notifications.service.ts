import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { OrderService } from 'src/order/order.service';
import { EVENT_PUBLISHER } from 'src/core/tokens';

type EventPublisher = { publish: (event: string, payload: any) => void };

@Injectable()
export class NotificationsService {
  constructor(
    // @Inject(forwardRef(() => OrderService))
    // private readonly orderService: OrderService,
    @Inject(EVENT_PUBLISHER)
    private readonly eventPublisher: EventPublisher,
  ) {}

  notify(event: string, payload: any) {
    // console.log(`[NOTIFY] ${event}:`, payload);
    this.eventPublisher.publish(event, payload);
    return { ok: true };
  }
}
