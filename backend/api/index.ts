import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as express from 'express';
import { Request, Response } from 'express';

const server = express();
let isReady = false;

async function bootstrap() {
  if (isReady) return;
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: ['error', 'warn'],
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });
  await app.init();
  isReady = true;
}

export default async function handler(req: Request, res: Response) {
  await bootstrap();
  server(req, res);
}
