import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './service/telegram.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
