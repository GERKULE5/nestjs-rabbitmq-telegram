# nestjs-rabbitmq-telegram

Микросервисная архитектура на основе NestJS с использованием RabbitMQ и Telegram API.

## Стек

- NestJS
- RabbitMQ
- Telegram Bot API (Telegraf)
- Docker

## Запуск

### 1. Клонировать репозиторий

```bash
git clone https://github.com/GERKULE5/nestjs-rabbitmq-telegram.git
```

```bash
cd nestjs-rabbitmq-telegram
```

### 2. Создать .env файл

Скопируйте `.env.example` и заполните переменные:

```bash
cp .env.example .env
```

### 3. Запустить через Docker

```bash
docker compose up --build
```

Приложение будет доступно на `http://localhost:3000`  
Swagger UI: `http://localhost:3000/api`  
RabbitMQ Management: `http://localhost:15672`

## Тесты

```bash
npm run test
```
