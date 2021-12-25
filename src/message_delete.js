class MessageDelete extends Message {
  constructor(event) {
    super(event, event.deleted_ts);
  }

  execute() {
    const deleteTarget = this.findTarget();
    const result = publicDelete(postChannel, deleteTarget.ts);

    return result;
  }
}