function doPost(e) {

  let postData = JSON.parse(e.postData.getDataAsString());
  
  // token認証
  if (postData.token !== verificationToken) { throw new Error('VerificationToken is invalid'); }

  let type = postData.type;
  let event = postData.event;
  
  switch (type) {
    // Request URL Check
    case 'url_verification':
      return ContentService.createTextOutput(postData.challenge);
      break;
    
    // eventを受け取る
    case 'event_callback':
      if (event.channel === postChannel || event.user === botId) return;
      let permalink = getPermalink(event.channel, event.event_ts);
      publicPost(postChannel, permalink);
      break;

    case 'channel_created':
      publicPost(postChannel, 'aaa');
      let channel = postData.channel.id;
      publicPost(postChannel, channel);
      break;

    // do nothing
    default:
      break;
  }
}