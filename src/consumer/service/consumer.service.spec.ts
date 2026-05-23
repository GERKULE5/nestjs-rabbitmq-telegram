import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerService } from './consumer.service';
import { TelegramService } from '../../telegram/service/telegram.service';
import { ConfigService } from '@nestjs/config';

describe('ConsumerService', () => {
  let service: ConsumerService;
  let telegramService: jest.Mocked<TelegramService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumerService,
        {
          provide: TelegramService,
          useValue: {
            sendMessage: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn().mockReturnValue('123456789'),
          },
        },
      ],
    }).compile();

    service = module.get<ConsumerService>(ConsumerService);
    telegramService = module.get(TelegramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call telegramService.sendMessage with correct chatId and text', async () => {
    const message = {
      id: 'test-id',
      payload: 'Test message',
      timestamp: new Date(),
    };

    await service.processNotification(message);

    expect(telegramService.sendMessage).toHaveBeenCalledWith(
      '123456789',
      expect.stringContaining('test-id'),
    );
  });

  it('should throw error if telegramService.sendMessage fails', async () => {
    telegramService.sendMessage.mockRejectedValue(new Error('Telegram error'));

    const message = {
      id: 'test-id',
      payload: 'Test message',
      timestamp: new Date(),
    };

    await expect(service.processNotification(message)).rejects.toThrow(
      'Telegram error',
    );
  });
});
