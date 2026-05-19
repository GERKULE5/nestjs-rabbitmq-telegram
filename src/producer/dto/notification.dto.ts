import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SendNotificationDto {
  @IsString()
  @IsNotEmpty()
  message!: string;
}

export class NotificationDTO {
  success!: boolean;
  messageId!: string;
}
