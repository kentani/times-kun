class Guidance {
  constructor(event) {
    this.channelId = event.channel.id;
    this.channelName = event.channel.name;
  }

  isValid() {
    return this.baseValidation();
  }

  baseValidation() {
    return this.isTimes();
  }

  isTimes() {
    return this.channelName.match(/^times_/);
  }

  execute() {
    joinChannel(this.channelId);
    const text = this.buildText();
    const result = publicPost(this.channelId, text);

    return result;
  }

  buildText() {
    const info = getChannelInfo(postChannel);
    let text = '';
    text += ":tada: times作成ありがとうございます :tada:\n\n";
    text += "このチャンネルの投稿は<#C01U34GRMPH|times__all>に自動で流れます\n";
    text += "質問などありましたら<@UEJG4TTFV>に連絡してください\n\n";
    text += ":point_down: <#C01U34GRMPH|times__all>の目的とルールです\n\n";
    text += info.purpose.value;

    return text;
  }
}