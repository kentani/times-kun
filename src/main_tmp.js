// var sheet = SpreadsheetApp.openById('1PoGETAZailhroz9Q6ieAjcDry3PtqJDRwyWcUigWgkk');
// var tSheet = sheet.getSheetByName('times-kun');

// function doPost(e) {

//   let postData = JSON.parse(e.postData.getDataAsString());
//   let token = postData.token;
//   // token認証
//   if (token !== verificationToken) { throw new Error('VerificationToken is invalid'); }
//   let type = postData.type;
  
//   try {
//     switch (type) {
//       // Request URL Check
//       case 'url_verification':
//         return ContentService.createTextOutput(postData.challenge);
      
//       // eventを受け取る
//       case 'event_callback':
//         let event = postData.event;

//         tSheet.appendRow([event]);

//         switch (event.type) {
//           case 'message':
//             const eventSubtype = event.subtype;
//             const validEventSubtypes = ["file_share", "thread_broadcast", "message_changed", "message_deleted"];
//             if ((event.bot_id)) return;
//             if (eventSubtype && !validEventSubtypes.includes(eventSubtype)) return;
//             if (event.channel === postChannel || event.user === botId) return;

//             switch (eventSubtype) {
//               case 'message_changed':
//                 // const updateTarget = getUpdateTarget(event.channel, event.message.ts);
//                 // let attachments = updateTarget.attachments;
//                 // attachments[0].text = event.message.text;
//                 // const options = { 'attachments': attachments };
//                 // publicUpdate(postChannel, updateTarget.ts, updateTarget.text, options);
//                 break;

//               case 'message_deleted':
//                 const deleteTarget = getDeleteTarget(event.channel, event.deleted_ts);
//                 publicDelete(postChannel, deleteTarget.ts);
//                 break;
              
//               default:
//                 let permalink = getPermalink(event.channel, event.event_ts);
//                 publicPost(postChannel, permalink);
//                 break;
//             }
//             break;

//           case 'channel_created':
//             if (!event.channel.name.match(/^times_/)) return;

//             joinChannel(event.channel.id);

//             const info = getChannelInfo(postChannel);
//             let text = '';
//             text += ":tada: times作成ありがとうございます :tada:\n\n";
//             text += "このチャンネルの投稿は<#C01U34GRMPH|times__all>に自動で流れます\n";
//             text += "質問などありましたら<@UEJG4TTFV>に連絡してください\n\n";
//             text += ":point_down: <#C01U34GRMPH|times__all>の目的とルールです\n\n";
//             text += info.purpose.value;

//             publicPost(event.channel.id, text);
//             break;

//           default:
//             break;
//         }
//         break;

//       default:
//         break;
//     }
//   } catch(error) {
//     tSheet.appendRow([error]);
//   }
// }

// function getUpdateTarget(channel, updatedTs) {
//   const histories = getChannelHistory(postChannel);
//   const text = histories.find((history) => {
//     const text = history.text.slice(1).slice(0, -1);
//     const splitedText = text.split('/');
//     const ch = splitedText[4];
//     if (ch === undefined) return;
//     const ts = splitedText[5].slice(1).split("?")[0];
//     const replacedUpdatedTs = updatedTs.replace('.', '')
//     const val = ch === channel && ts === replacedUpdatedTs;
//     return val;
//   });

//   return text;
// }

// function getDeleteTarget(channel, deletedTs) {
//   const histories = getChannelHistory(postChannel);
//   const text = histories.find((history) => {
//     const text = history.text.slice(1).slice(0, -1);
//     const splitedText = text.split('/');
//     const ch = splitedText[4];
//     if (ch === undefined) return;
//     const ts = splitedText[5].slice(1).split("?")[0];
//     const replacedDeletedTs = deletedTs.replace('.', '')
//     const val = ch === channel && ts === replacedDeletedTs;
//     return val;
//   });

//   return text;
// }