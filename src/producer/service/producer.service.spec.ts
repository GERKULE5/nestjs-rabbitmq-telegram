import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('ProducerService', () => {
  let service: ProducerService;
  let client: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: 'RABBITMQ_SERVICE',
          useValue: {
            emit: jest.fn().mockReturnValue(of(null)),
          },
        },
      ],
    }).compile();

    service = module.get<ProducerService>(ProducerService);
    client = module.get('RABBITMQ_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should emit notification.created with correct payload', async () => {
    const dto = { message: 'Test message' };

    const result = await service.sendNotification(dto);

    expect(client.emit).toHaveBeenCalledWith(
      'notification.created',
      expect.objectContaining({
        payload: dto.message,
      }),
    );
    expect(result.success).toBe(true);
    expect(result.messageId).toBeDefined();
  });

  it('should return unique messageId on each call', async () => {
    const dto = { message: 'Test message' };

    const result1 = await service.sendNotification(dto);
    const result2 = await service.sendNotification(dto);

    expect(result1.messageId).not.toBe(result2.messageId);
  });
});
