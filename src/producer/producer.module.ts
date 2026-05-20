import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ProducerController } from './controller/producer.controller';
import { ProducerService } from './service/producer.service';
import { getRabbitmqConfig } from '../common/config/rabbitmq/rabbitmq.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: getRabbitmqConfig,
      },
    ]),
  ],
  controllers: [ProducerController],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
