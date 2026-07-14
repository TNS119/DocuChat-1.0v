export const mapSessionMessagesToViewMessages = (sessionMessages = [], sessionId) => {
  if (!Array.isArray(sessionMessages)) {
    return [];
  }

  return sessionMessages.map((message, index) => ({
    id: `${sessionId}-${index}`,
    message: message?.content ?? '',
    sender: message?.role === 'assistant' ? 'bot' : 'user'
  }));
};
