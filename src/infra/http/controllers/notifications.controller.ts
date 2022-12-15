import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateNotificationBody } from '../dtos/createNotificationBody';
import { SendNotification } from '../../../application/use-cases/send-notification';

@Controller()
export class NotificationController {
  constructor(private readonly sendNotification: SendNotification) {}

  /*   @Get()
  list() {
    return this.appService.index();
  }
 */
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return { notification };
  }
}
