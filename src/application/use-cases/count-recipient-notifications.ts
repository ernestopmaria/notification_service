import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface countRecipientNotificationsRequest {
  recipientId: string;
}

interface countRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientsNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(
    request: countRecipientNotificationsRequest,
  ): Promise<countRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
