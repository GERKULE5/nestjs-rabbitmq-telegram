import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationDTO, SendNotificationDto } from '../dto/notification.dto';
import { NotificationMessage } from '../interfaces/notification-message.interface';
import { v4 as uuidv4 } from 'uuid';
import { catchError, lastValueFrom, throwError, timeout } from 'rxjs';

@Injectable()
export class ProducerService {
  private readonly logger = new Logger(ProducerService.name);

  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendNotification(dto: SendNotificationDto): Promise<NotificationDTO> {
    const message: NotificationMessage = {
      id: uuidv4(),
      payload: { ...dto },
      timestamp: new Date(),
    };

    await lastValueFrom(
      this.client.emit('notification.created', message).pipe(
        timeout(5000),
        catchError((error: Error) =>
          throwError(
            () => new Error(`Failed to send message: ${error.message}`),
          ),
        ),
      ),
    );

    this.logger.log(`Message sent [id=${message.id}]`);
    return { success: true, messageId: message.id };
  }
}
