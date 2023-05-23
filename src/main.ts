import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('h-vat-server renewal test')
    .setDescription('h-vat-server renewal test REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'h-vat test REST API',
  });

  await app.listen(3000);
  console.log(`h-vat-server is running on: ${await app.getUrl()}`);
}
bootstrap();
