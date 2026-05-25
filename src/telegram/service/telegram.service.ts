import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { getTelegramConfig } from '../../common/config/telegram/telegram.config';

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);
  private bot!: Telegraf;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const token = getTelegramConfig(this.configService);
    this.bot = new Telegraf(token);

    this.bot.start((ctx) => {
      const chatId = ctx.chat.id;
      ctx.reply(`Ваш ID чата: \`${chatId}\``, { parse_mode: 'MarkdownV2' });
    });

    this.bot.launch();
    this.logger.log('Telegram bot initialized');
  }

  async sendMessage(chatId: number, message: string): Promise<void> {
    try {
      await this.bot.telegram.sendMessage(chatId, message);
      this.logger.log(`Message sent to chat [id=${chatId}]`);
    } catch (error) {
      this.logger.error(
        `Failed to send message to chat [id=${chatId}]: ${(error as Error).message}`,
      );
      throw error;
    }
  }
}
