import { CountRecipientsNotification } from './count-recipient-notifications';

import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientsNotification } from './get-recipient-notifications';

describe('Get recipients recipient Notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientsNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipientId' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipientId2' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipientId' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipientId',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipientId' }),
        expect.objectContaining({ recipientId: 'recipientId' }),
      ]),
    );
  });
});
