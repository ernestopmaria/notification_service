import { CountRecipientsNotification } from './count-recipient-notifications';
import { Content } from '../entities/content';
import { Notification } from '../entities/notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';

describe('Count recipient Notifications', () => {
  it('should be able to count a notifications by Recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientsNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade'),
        recipientId: 'recipientId',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade'),
        recipientId: 'recipientId',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade'),
        recipientId: 'recipientId2',
      }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipientId',
    });

    console.log(count);

    expect(count).toEqual(2);
  });
});
