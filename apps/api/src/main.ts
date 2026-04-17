import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const config = new DocumentBuilder()
    .setTitle('Jobles API')
    .setDescription('Jobles API description')
    .setVersion('1.0')
    .build();

  const rawDocument = SwaggerModule.createDocument(app, config);
  const document = cleanupOpenApiDoc(rawDocument);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
