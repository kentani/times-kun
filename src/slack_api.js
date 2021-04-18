var slackApi = 'https://slack.com/api';

// get
function getChannelList() {

  let channelListApi = slackApi + '/conversations.list';
  let headers = { "headers": { "Authorization": "Bearer " + accessToken } }
  let result = UrlFetchApp.fetch(channelListApi, headers);
  let json = JSON.parse(result);
  let channels = json.channels;
  
  return channels;
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
    let profile = getProfile(from);
    
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

function joinChannel(channel) {

  let joinChannelApi = slackApi + '/conversations.join';
  let data = { "channel": channel };
  let headers = makeHeaders(data);
  let result = UrlFetchApp.fetch(joinChannelApi, headers);
  
  return result;
}