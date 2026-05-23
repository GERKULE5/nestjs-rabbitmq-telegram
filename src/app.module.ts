import { Module } from '@nestjs/common';
import { ProducerModule } from './producer/producer.module';
import { ConfigModule } from '@nestjs/config';
import { ConsumerModule } from './consumer/consumer.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProducerModule,
    ConsumerModule,
    TelegramModule,
  ],
})
export class AppModule {}
