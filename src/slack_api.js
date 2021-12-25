var slackApi = 'https://slack.com/api';

function test() {
  // const info = getChannelInfo(postChannel);
  // let text = '';
  // text += ":tada: times作成ありがとうございます :tada:\n\n";
  // text += "このチャンネルの投稿は<#C01U34GRMPH|times__all>に自動で流れます\n";
  // text += "質問などありましたら<@UEJG4TTFV>に連絡してください\n\n";
  // text += ":point_down: <#C01U34GRMPH|times__all>の目的とルールです\n\n";
  // text += info.purpose.value;
  // publicPost("C01UQEHBHU4", text);

  const histories = getChannelHistory(postChannel);
  histories.forEach((history) => {
    publicDelete(postChannel, history.ts);
  })
  // const text = histories.find((history) => {
  //   const text = history.text.slice(1).slice(0, -1);
  //   const splitedText = text.split('/');
  //   const ch = splitedText[4];
  //   if (ch === undefined) return;
  //   const ts = splitedText[5].slice(1).split("?")[0];
  //   const replacedDeletedTs = deletedTs.replace('.', '')
  //   const val = ch === channel && ts === replacedDeletedTs;
  //   return val;
  // });
}

// get
function getChannelList() {

  let channelListApi = slackApi + '/conversations.list';
  let headers = { "headers": { "Authorization": "Bearer " + accessToken } }
  let result = UrlFetchApp.fetch(channelListApi, headers);
  let json = JSON.parse(result);
  let channels = json.channels;
  
  return channels;
}

function getChannelHistory(channel) {

  let channelHistoryApi = slackApi + '/conversations.history' + '?channel=' + channel;
  let headers = { "headers": { "Authorization": "Bearer " + accessToken } }
  let result = UrlFetchApp.fetch(channelHistoryApi, headers);
  let json = JSON.parse(result);
  let messages = json.messages;
  
  return messages;
}

function getChannelInfo(channel) {

  let channelInfoApi = slackApi + '/conversations.info' + '?channel=' + channel;
  let headers = { "headers": { "Authorization": "Bearer " + accessToken } }
  let result = UrlFetchApp.fetch(channelInfoApi, headers);
  let json = JSON.parse(result);
  let channelInfo = json.channel;
  
  return channelInfo;
}

function getPermalink(channel, message_ts) {

  let getPermalinkApi = slackApi + '/chat.getPermalink' + '?channel=' +channel + '&message_ts=' + message_ts;
  let headers = { "headers": { "Authorization": "Bearer " + accessToken } }
  let result = UrlFetchApp.fetch(getPermalinkApi, headers);
  let json = JSON.parse(result);
  let permalink = json.permalink;
  
  return permalink;
}

// post
function postToSlack(url, notifyData, options) {

  if ((options)) {
    
    let from = options.from || '';
    
    // fromの指定がない場合はbot名で送信する
    // let profile = getProfile(from);
    let profile = null;
    
    // ユーザー情報が見つかればそのユーザーで送信する
    if ((profile)) {
      
      notifyData["username"] = profile.real_name
      notifyData["icon_url"] = profile.image_512
      
    }
    
    // 指定があるスレッドに返信する
    if ((options.thread_ts)) { notifyData["thread_ts"] = options.thread_ts }
    
    // trueの場合はチャンネルにも送信する（thread_ts必須）
    if ((options.reply_broadcast)) { notifyData["reply_broadcast"] = options.reply_broadcast }
    
    // アタッチメント
    if ((options.attachments)) { notifyData["attachments"] = options.attachments }
    
    // ブロック
    if ((options.blocks)) { notifyData["blocks"] = options.blocks }
    
    // マークダウン（default: true）
    if ((options.mrkdwn)) { notifyData["mrkdwn"] = options.mrkdwn }
    
  }
  
  let headers = makeHeaders(notifyData);
  let result = UrlFetchApp.fetch(url, headers);
  
  return result;
}

function deleteToSlack(url, notifyData, options) {
  let headers = makeHeaders(notifyData);
  let result = UrlFetchApp.fetch(url, headers);
  
  return result;
}

function joinChannel(channel) {

  let joinChannelApi = slackApi + '/conversations.join';
  let data = { "channel": channel };
  let headers = makeHeaders(data);
  let result = UrlFetchApp.fetch(joinChannelApi, headers);
  
  return result;
}