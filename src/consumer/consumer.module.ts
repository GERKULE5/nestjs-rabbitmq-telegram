import { Module } from '@nestjs/common';
import { ConsumerController } from './controller/consumer.controller';
import { ConsumerService } from './service/consumer.service';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
