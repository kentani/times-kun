var properties = PropertiesService.getScriptProperties().getProperties();
var verificationToken = properties.VerificationToken;
var accessToken = properties.AccessToken;
var postChannel = properties.PostChannel;
var botId = properties.BotId;

// プロパティをセットする（バリューを指定して実行する）
function setProperties() {
  PropertiesService.getScriptProperties().setProperty('VerificationToken','');
  PropertiesService.getScriptProperties().setProperty('AccessToken','');
  PropertiesService.getScriptProperties().setProperty('PostChannel','');
  PropertiesService.getScriptProperties().setProperty('BotId','');
}

// timesチャンネルにbotをjoinさせる
function joinChannels() {
  getChannelList().forEach((channel) => {
    if (channel.id !== postChannel && channel.name.match(/^times_/)) {
      Logger.log(channel.name)
      joinChannel(channel.id)
    }
  })
}

function getChannels() {
  getChannelList().forEach((channel) => {
    if (channel.id !== postChannel && channel.name.match(/^times_/)) {
      Logger.log(channel.name)
    }
  })
}