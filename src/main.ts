import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('photograf');
  
  // Configuración de CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://b632-177-238-23-146.ngrok-free.app',
      'https://3987-177-238-23-146.ngrok-free.app',
      'capacitor://localhost',
      'ionic://localhost',
      'http://localhost',
      'http://localhost:8100',
      'http://localhost:3000'
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
    credentials: true,
    exposedHeaders: ['Content-Range', 'X-Content-Range']
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );
  
  await app.listen(3000);
}
bootstrap();