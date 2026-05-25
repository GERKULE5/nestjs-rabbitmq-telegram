import { Injectable, Logger } from '@nestjs/common';
import { NotificationMessage } from '../../common/interfaces/notification-message.interface';
import { TelegramService } from '../../telegram/service/telegram.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  constructor(
    private readonly telegramService: TelegramService,
  ) {}

  async processNotification(message: NotificationMessage): Promise<void> {
    this.logger.log(`Processing message [id=${message.id}]`);
    const text = `❗ Новое сообщение ❗\n\nID: ${message.id}\nMessage: ${message.payload}\nTime: ${message.timestamp}`;

    try {
      await this.telegramService.sendMessage(message.chatId, text);
      this.logger.log(`Message processed successfully [id=${message.id}]`);
    } catch (error) {
      this.logger.error(
        `Failed to process message [id=${message.id}]: ${(error as Error).message}`,
      );
      throw error;
    }
  }
}
