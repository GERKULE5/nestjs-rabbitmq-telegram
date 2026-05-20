import { Controller, Logger } from '@nestjs/common';
import { ConsumerService } from '../service/consumer.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import type { NotificationMessage } from '../../common/interfaces/notification-message.interface';

@Controller()
export class ConsumerController {
  private readonly logger = new Logger(ConsumerController.name);

  constructor(private readonly service: ConsumerService) {}

  @EventPattern('notification.created')
  async handleNotification(
    @Payload() message: NotificationMessage,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const rawMessage = context.getMessage();

    try {
      await this.service.processNotification(message);
      channel.ack(rawMessage);
    } catch (error) {
      this.logger.error(
        `Message nacked [id=${message.id}]: ${(error as Error).message}`,
      );
      channel.nack(rawMessage, false, false);
    }
  }
}
