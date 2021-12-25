function publicUpdate(channel, ts, text, options = null) {

  let publicUpdateApi = slackApi + '/chat.update';
  let notifyData = {
    
    "channel": channel,
    "ts": ts,
    "text": text,
    
  };
  
  return postToSlack(publicUpdateApi, notifyData, options)
}