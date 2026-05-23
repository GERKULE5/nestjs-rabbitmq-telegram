import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendNotificationDto {
  @ApiProperty({ example: 'Новое сообщение с помощью RabbitMQ!' })
  @IsString()
  @IsNotEmpty()
  message!: string;
}

export class NotificationDTO {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  messageId!: string;
}
