import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import type { Request, Response } from 'express';

let cachedApp: Awaited<ReturnType<typeof NestFactory.create>>;

async function bootstrap() {
  if (cachedApp) return cachedApp;
  cachedApp = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });
  cachedApp.setGlobalPrefix('api');
  cachedApp.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );
  cachedApp.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });
  await cachedApp.init();
  return cachedApp;
}

export default async function handler(req: Request, res: Response) {
  const app = await bootstrap();
  app.getHttpAdapter().getInstance()(req, res);
}
