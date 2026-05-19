import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerController } from './controller/producer.controller';
import { ProducerService } from './service/producer.service';
import { getRabbitmqConfig } from '../common/config/rabbitmq/rabbitmq.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        ...getRabbitmqConfig(),
      },
    ]),
  ],
  controllers: [ProducerController],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
