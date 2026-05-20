import { Injectable, Logger } from '@nestjs/common';
import { NotificationMessage } from '../../common/interfaces/notification-message.interface';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  async processNotification(message: NotificationMessage): Promise<void> {
    this.logger.log(`Processing message [id=${message.id}]`);

    try {
      this.logger.log(`Message processed successfully [id=${message.id}]`);
    } catch (error) {
      this.logger.error(
        `Failed to process message [id=${message.id}]: ${(error as Error).message}`,
      );
      throw error;
    }
  }
}
