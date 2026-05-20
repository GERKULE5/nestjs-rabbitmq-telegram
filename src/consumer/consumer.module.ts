import { Module } from '@nestjs/common';
import { ConsumerController } from './controller/consumer.controller';
import { ConsumerService } from './service/consumer.service';

@Module({
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
