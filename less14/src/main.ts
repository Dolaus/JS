import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Увімкнення CORS
  app.enableCors();

  // Налаштування Swagger
  const config = new DocumentBuilder()
      .setTitle('Demo API')
      .setDescription('API description')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }, 'access-token')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Запуск сервера
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
