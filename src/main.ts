import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express'

const {env} = process 

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.use(express.static(process.cwd() + "/uploads"))
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  await app.listen(+env.PORT || 3000, () => {
    console.log(+env.PORT || 3000);
  });
}
bootstrap();
