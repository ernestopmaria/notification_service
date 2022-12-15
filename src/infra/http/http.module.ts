import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notifications.controller';
import { SendNotification } from '../../application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotification],
})
export class HttModule {}
