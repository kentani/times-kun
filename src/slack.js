// function test() {
//   const slack = new Slack({ verificationToken, accessToken });
//   slack.privatePost('C01UQEHBHU4', 'aaaa', '', 'UEJG4TTFV');
//   // Logger.log(UrlFetchApp.fetch('https://slack.com/api/users.profile.get?token=xoxb-494047446001-1966691353925-KlDwL3hblPSaTK3ynCZWbsHZ&user=UEJG4TTFV'));
// }

class Slack {
  constructor({ verificationToken, accessToken }) {
    this.verificationToken = verificationToken;
    this.accessToken = accessToken;
    this.baseUrl = 'https://slack.com/api';
  }

  isValidToken(verificationToken) {
    return this.verificationToken === verificationToken;
  }

  getProfile(user = '') {
    const params = `&user=${user}`;
    const url = this.buildUrl('/users.profile.get', params);

    const result = UrlFetchApp.fetch(url);
    const json = JSON.parse(result);
    const profile = json.profile;
    
    return profile;
  }

  publicPost(channel, text, options = null) {
    const notifyData = {
      "channel": channel,
      "text": text,
    };
    
    return this.post('/chat.postMessage', notifyData, options)
  }

  privatePost(channel, text, attachments, to, options = null) {
    const notifyData = {
      "channel": channel,
      "text": text,
      "attachments": attachments,
      "user": to,
    };
    
    return this.post('/chat.postEphemeral', notifyData, options)
  }

  /* private */
  post(api, notifyData, options) {
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
    
    let url = this.buildUrl(api)
    let headers = makeHeaders(notifyData);
    let result = UrlFetchApp.fetch(url, headers);
    
    return result;
  }

  buildUrl(api, params = null) {
    let url = `${this.baseUrl}${api}`;
    if ((params)) { url = `${url}?token=${this.accessToken}${params}` };
    return url;
  }
}
