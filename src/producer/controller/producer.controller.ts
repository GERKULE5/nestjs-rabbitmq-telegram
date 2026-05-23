import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProducerService } from '../service/producer.service';
import { NotificationDTO, SendNotificationDto } from '../dto/notification.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Отправка сообщений с помощью RabbitMQ')
@Controller('producer')
export class ProducerController {
  constructor(private readonly producer: ProducerService) {}

  @Post('send')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Отправить сообщение в очередь',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED, 
    type: NotificationDTO,
  })
  async sendNotification(
    @Body() dto: SendNotificationDto,
  ): Promise<NotificationDTO> {
    return this.producer.sendNotification(dto);
  }
}
