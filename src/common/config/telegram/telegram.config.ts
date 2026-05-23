import { ConfigService } from '@nestjs/config';

export const getTelegramConfig = (service: ConfigService): string => {
  return service.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
};
