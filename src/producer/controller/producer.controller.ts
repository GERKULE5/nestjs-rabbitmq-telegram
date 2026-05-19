import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProducerService } from '../service/producer.service';
import { NotificationDTO, SendNotificationDto } from '../dto/notification.dto';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producer: ProducerService) {}

  @Post('send')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendNotification(
    @Body() dto: SendNotificationDto,
  ): Promise<NotificationDTO> {
    return this.producer.sendNotification(dto);
  }
}
