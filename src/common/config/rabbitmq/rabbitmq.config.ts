import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export const getRabbitmqConfig = (service: ConfigService): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [service.get<string>('RABBITMQ_URL') ?? 'amqp://localhost:5672'],
    queue: 'notification_queue',
    queueOptions: {
      durable: true,
    },
  },
});
