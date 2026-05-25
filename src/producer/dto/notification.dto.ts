import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendNotificationDto {
  @ApiProperty({
    description: 'ID чата, в который нужно отправить сообщение',
    example: 1234567890,
  })
  @IsNumber()
  @IsNotEmpty()
  chatId!: number;

  @ApiProperty({
    description: 'Текст сообщения для отправки',
    example: 'Новое сообщение с помощью RabbitMQ!',
  })
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
