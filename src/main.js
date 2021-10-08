var sheet = SpreadsheetApp.openById('1PoGETAZailhroz9Q6ieAjcDry3PtqJDRwyWcUigWgkk');
var tSheet = sheet.getSheetByName('times-kun');

function doPost(e) {

  let postData = JSON.parse(e.postData.getDataAsString());
  let token = postData.token;
  // token認証
  if (token !== verificationToken) { throw new Error('VerificationToken is invalid'); }
  let type = postData.type;
  
  try {
    switch (type) {
      // Request URL Check
      case 'url_verification':
        return ContentService.createTextOutput(postData.challenge);
      
      // eventを受け取る
      case 'event_callback':
        let event = postData.event;
        tSheet.appendRow([event]);

        switch (event.type) {
          case 'message':
            switch (event.subtype) {
              case 'message_changed':
                const updateService = new MessageUpdate(event);
                if (updateService.isValid()) updateService.execute();
                break;

              case 'message_deleted':
                const deleteService = new MessageDelete(event);
                if (deleteService.isValid()) deleteService.execute();
                break;
              
              default:
                const postService = new MessagePost(event);
                if (postService.isValid()) postService.execute();
                break;
            }
            break;

          case 'channel_created':
            const guidanseService = new Guidance(event);
            if (guidanseService.isValid()) guidanseService.execute();
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
  } catch(error) {
    tSheet.appendRow([error]);
  }
}