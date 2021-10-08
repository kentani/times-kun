class Message {
  constructor(event, ts) {
    this.channel = event.channel;
    this.type = event.subtype;
    this.sender = event.user;
    this.bot = event.bot_id;
    this.ts = ts;
  }

  static validTypes() {
    const types = [
      "file_share",
      "thread_broadcast",
      "message_changed",
      "message_deleted",
    ];

    return types;
  }

  isValid() {
    return this.baseValidation();
  }

  baseValidation() {
    return this.isValidTypes() && !this.isBot() && !this.isTimesAll();
  }

  isValidTypes() {
    return !this.type || this.constructor.validTypes().includes(this.type)
  }

  isBot() {
    return !!this.bot || this.sender === botId;
  }

  isTimesAll() {
    return this.channel === postChannel;
  }

  findTarget() {
    const histories = getChannelHistory(postChannel);
    const text = histories.find((history) => {
      const text = history.text.slice(1).slice(0, -1);
      const splitedText = text.split('/');
      const ch = splitedText[4];
      if (ch === undefined) return;
      const ts = splitedText[5].slice(1).split("?")[0];
      const replacedTs = this.ts.replace('.', '');
      const val = ch === this.channel && ts === replacedTs;
      return val;
    });

    return text;
  }
}