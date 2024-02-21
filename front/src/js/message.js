import dateTranformer from './dateTransform';

export default class Message {
  static createMsg(item) {
    const { from, subject, received } = item;
    const date = dateTranformer(received);
    const text = subject.length > 14 ? `${subject.slice(0, 14)}...` : subject;

    return `
      <p class="email">${from}</p>
      <p class="subject">${text}</p>
      <p class="date">${date}</p>
    `;
  }
}
