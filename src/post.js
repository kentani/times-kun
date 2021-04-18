function publicPost(channel, text, options = null) {

  let publicPostApi = slackApi + '/chat.postMessage';

  let notifyData = {
    
    "channel": channel,
    "text": text,
    
  };
  
  return postToSlack(publicPostApi, notifyData, options)
}