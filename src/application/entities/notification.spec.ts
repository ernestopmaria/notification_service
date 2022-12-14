import { Content } from './content';
import { Notification } from './notifications';

describe('Notification  content', () => {
  it('should be able to create a notification', () => {
    const content = new Notification({
      recipientId: 'recipient_id',
      category: 'category',
      content: new Content('Nova solicitação de Amizade'),
    });

    expect(content).toBeTruthy();
  });
});
