import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateNotificationBody } from '../dtos/createNotificationBody';
import { SendNotification } from '@application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { CountRecipientsNotification } from '@application/use-cases/count-recipient-notifications';
import { UnReadNotification } from '@application/use-cases/unread-notification';
import { GetRecipientsNotification } from '@application/use-cases/get-recipient-notifications';

@Controller()
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private countRecipientsNotification: CountRecipientsNotification,
    private unreadNotification: UnReadNotification,
    private getRecipientsNotifications: GetRecipientsNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }
  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<number> {
    const { count } = await this.countRecipientsNotification.execute({
      recipientId,
    });

    return count;
  }

  @Get(':id')
  async index(@Param('id') id: string): Promise<NotificationViewModel> {
    const { notifications } = await this.getRecipientsNotifications.execute({
      recipientId: id,
    });
    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return { notification: NotificationViewModel.toHttp(notification) };
  }
}
