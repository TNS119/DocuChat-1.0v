import { mapSessionMessagesToViewMessages } from './messageUtils';

describe('mapSessionMessagesToViewMessages', () => {
  it('maps backend session messages to chat view messages', () => {
    const sessionMessages = [
      { role: 'user', content: 'Hello' },
      { role: 'assistant', content: 'Hi there' }
    ];

    const result = mapSessionMessagesToViewMessages(sessionMessages, 'session-1');

    expect(result).toEqual([
      { id: 'session-1-0', message: 'Hello', sender: 'user' },
      { id: 'session-1-1', message: 'Hi there', sender: 'bot' }
    ]);
  });

  it('returns an empty array when no session messages are provided', () => {
    expect(mapSessionMessagesToViewMessages([], 'session-2')).toEqual([]);
  });
});
