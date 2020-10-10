import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';

import { MyLogger } from './logger/logger';
import { LoggerMiddleware } from './middleware/logger.middleware'; 
import { LoggerInterceptor } from './interceptor/logger.interceptor'; 

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.enableCors();
    // 注释了打印 
    // app.use(LoggerMiddleware);
    // app.useGlobalInterceptors(new LoggerInterceptor());
    setUpSwagger(app);
    await app.listen(3000);
}

function setUpSwagger(app: any){
    const options = new DocumentBuilder()
        .setTitle('Tx example')
        .setDescription('The tx API description')
        .setVersion('1.0')
        .addTag('tx')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
}

bootstrap();
