function publicDelete(channel, ts, options = null) {

  let publicDeleteApi = slackApi + '/chat.delete';
  let notifyData = {
    
    "channel": channel,
    "ts": ts,
    
  };
  
  return deleteToSlack(publicDeleteApi, notifyData, options)
}