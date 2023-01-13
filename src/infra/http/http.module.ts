import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notifications.controller';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { UnReadNotification } from '@application/use-cases/unread-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { GetRecipientsNotification } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientsNotification } from '@application/use-cases/count-recipient-notifications';
import { CancelNotification } from '@application/use-cases/cancel-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    UnReadNotification,
    ReadNotification,
    GetRecipientsNotification,
    CountRecipientsNotification,
    CancelNotification,
  ],
})
export class HttModule {}
