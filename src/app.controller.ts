import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { randomUUID } from 'node:crypto';
import { prisma } from '@prisma/client';
import { CreateNotificationBody } from './createNotificationBody';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  list() {
    return this.appService.index();
  }

  @Post()
  create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    return this.appService.create(content, category);
  }
}
