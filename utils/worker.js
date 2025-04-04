const { workerData, parentPort } = require('worker_threads');
 const colors = require("colors");
// const { Airtel_Oparation } = require('../controllers/Airtel.controller');
// const { vispl_videoconOne_Oparation } = require('../controllers/vispl_videoconOne.controller');
// const { voicensms_videocon_Campaign_service } = require('../services/voicensms_videocon.service');
// const { voiceBroadcast_videoconThree_Oparation } = require('../controllers/voiceBroadcast_videoconThree.controller');
//const { priBroadcast_Oparation_controller } = require('../controllers/priBroadcast.controller');
// Access dynamic data passed to the worker directly
const workerDataReceived = workerData;

// Listen for messages from the main thread
parentPort.on('message', (message) => {
  console.log(`Message from main thread to Worker: ${message.message}`);
});

// Perform some processing using the dynamic data
// console.log(`Worker received dynamic data: ${ JSON.stringify( workerDataReceived)}`.yellow);
console.log(`Campaign: ${JSON.stringify(workerDataReceived[0].campaignid)}`.yellow);

const campaignId = workerDataReceived[0].campaignid;
const voiceFlag = workerDataReceived[0].voice_flag;

//console.log("\n voiceFlag == ", voiceFlag);

// const campaignOparations = async (campaignId, voiceFlag) => {
//   switch (voiceFlag) {
//     case 0:
//       console.log("PRI");
//       break;
//     case 1:
//       console.log("SIP");
//       break;
//     case 2:
//       console.log("Airtel IQ");
//       //await Airtel_Oparation(campaignId);
//       break;
//     case 3:
//       console.log("videocon dashboard 1 vispl");
//       //await vispl_videoconOne_Oparation(campaignId);
//       break;
//     case 4:
//       console.log("videocon dashboard 2 voicensms");
//       //await voicensms_videocon_Campaign_service(campaignId);
//       break;
//     case 5:
//       console.log("videocon dashboard 3 voice_broadcast");
//       //await voiceBroadcast_videoconThree_Oparation(campaignId);
//       break;
//     case 6:
//       console.log("videocon dashboard 4 ");
//       break;
//     case 7:
//       console.log("videocon dashboard 5 ");
//       break;
//     case 8:
//       console.log("Tata Tele service");
//       //await tataBroadcast_Oparation_controller(campaignId);
//       break;
//     default:
//       break;
//   }
// }

function fn_operation_pri_asterisk(campaignId, voiceFlag)
{
  console.log("Calling Asterisk manager",campaignId,voiceFlag)
}

fn_operation_pri_asterisk(campaignId, voiceFlag);
//campaignOparations(campaignId, voiceFlag);