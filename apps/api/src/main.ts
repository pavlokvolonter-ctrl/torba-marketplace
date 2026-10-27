import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  // Repo-root .env (cwd is apps/api); real env vars win, a missing file is fine.
  try {
    process.loadEnvFile(new URL('../../../.env', import.meta.url));
  } catch {}

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  });

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Torba API')
      .setDescription('Torba marketplace backend')
      .setVersion('0.1.0')
      .build(),
  );
  // Served at /api/docs (JSON at /api/docs-json).
  SwaggerModule.setup('api/docs', app, document);

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);
}

await bootstrap();
