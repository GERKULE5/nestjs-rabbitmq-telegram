import { RmqOptions, Transport } from '@nestjs/microservices';

export const getRabbitmqConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
    queue: 'notification_queue',
    queueOptions: {
      durable: true,
    },
  },
});
