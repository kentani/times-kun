class MessagePost extends Message {
  constructor(event) {
    super(event, event.event_ts);
  }

  execute() {
    const permalink = getPermalink(this.channel, this.ts);
    const result = publicPost(postChannel, permalink);

    return result;
  }
}