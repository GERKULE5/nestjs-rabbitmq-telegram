import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationDTO, SendNotificationDto } from '../dto/notification.dto';
import { NotificationMessage } from '../../common/interfaces/notification-message.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProducerService {
  private readonly logger = new Logger(ProducerService.name);

  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendNotification(dto: SendNotificationDto): Promise<NotificationDTO> {
    const message: NotificationMessage = {
      id: uuidv4(),
      payload: dto.message,
      timestamp: new Date(),
    };

    this.client.emit('notification.created', message);

    this.logger.log(`Message sent [id=${message.id}]`);
    return { success: true, messageId: message.id };
  }
}
