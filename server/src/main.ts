import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {AppModule} from './app.module';
import {DefaultExceptionFilter} from "./exception/DefaultExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle("MC Note backend documentation")
    .setDescription("This is a self hosted note storage solution, fully secure, in BE we won't store anything non encryptet data, and only the client can decrypt it with the provided password")
    .setVersion("0.1")
    .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);
  await app.useGlobalFilters(new DefaultExceptionFilter()).listen(3000);
}
bootstrap();
