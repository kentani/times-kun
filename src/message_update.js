class MessageUpdate extends Message {
  constructor(event) {
    super(event, event.message.ts);
    this.text = event.message.text;
  }

  execute() {
    const updateTarget = this.findTarget();
    const attachments = this.replaceAttachments(updateTarget.attachments);
    const options = { 'attachments': attachments };
    const result = publicUpdate(postChannel, updateTarget.ts, updateTarget.text, options);

    return result;
  }

  replaceAttachments(attachments) {
    attachments[0].text = this.text;

    return attachments;
  }
}