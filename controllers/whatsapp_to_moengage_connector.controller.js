const { logger } = require("../utils/logger");
const { moengage_send_callback_response_service } = require("../services/moengage_send_callback_response.service.js");
const { moengage_get_dlr_service } = require("../services/moengage_get_dlr.service.js");



const whatsapp_to_moengage_connector_controller = async (req, res, next) => {
    try {
        const bodyData = req.body || {};
        if (bodyData.entry[0].changes[0].value.hasOwnProperty('statuses')) {

            const wabaNumber = req.params.wabanumber;
            let moengage_URL;
            let msgg_id = null;

            const whatsapp_status_error_code = bodyData.entry?.[0]?.changes?.[0]?.value?.statuses?.[0]?.errors?.[0]?.code || "";
            const whatsapp_status_error_message = bodyData.entry?.[0]?.changes?.[0]?.value?.statuses?.[0]?.errors?.[0]?.message || "";

            const status = bodyData.entry[0].changes[0].value.statuses ? bodyData.entry[0].changes[0].value.statuses[0].status : "";
            const messages = bodyData.entry[0].changes[0].value.messages ? bodyData.entry[0].changes[0].value.messages[0] : "";

            moengage_URL = await moengage_get_dlr_service(wabaNumber);

            if (!moengage_URL) {
                console.log(`CallBack url Not Found For Waba Number ${wabaNumber}`)
                res.status(200).json({
                    data: "Success",
                    code: "200"
                })
            }
            else {
                if (status) {
                    const timeStamp = bodyData.entry[0].changes[0].value.statuses[0].timestamp || "";
                    const recipient_id = bodyData.entry[0].changes[0].value.statuses[0].recipient_id || "";
                    const wamid = bodyData.entry[0].changes[0].value.statuses[0].id || "";

                    if (bodyData.entry[0].changes[0].value.statuses[0].biz_opaque_callback_data != undefined &&
                        bodyData.entry[0].changes[0].value.statuses[0].hasOwnProperty('biz_opaque_callback_data') &&
                        JSON.parse(bodyData.entry[0].changes[0].value.statuses[0].biz_opaque_callback_data).templateid != undefined) {
                        let bizOpaqueCallbackData = JSON.parse(bodyData.entry[0].changes[0].value.statuses[0].biz_opaque_callback_data);
                        msgg_id = bizOpaqueCallbackData.msg_id;
                    }

                    switch (status) {
                        case "sent":
                           // logger.info(`${wabaNumber}: Sent Callback receive for Sent ::: ${wamid} ::: ${msgg_id} ::: ${timeStamp}`)
                            await moengage_send_callback_response_service(moengage_URL, wamid, wabaNumber, {
                                "statuses": [
                                    {
                                        "msg_id": msgg_id,
                                        "status": "sent",
                                        "timestamp": timeStamp,
                                        "error": {
                                            "code": whatsapp_status_error_code,
                                            "description": whatsapp_status_error_message
                                        }
                                    }
                                ]
                            });

                            break;
                        case "delivered":
                           // logger.info(`${wabaNumber}: Sent Callback receive for Delivered ::: ${wamid} ${msgg_id}`)
                            await moengage_send_callback_response_service(moengage_URL ,wamid ,wabaNumber, {
                                "statuses": [
                                    {
                                        "msg_id": msgg_id,
                                        "status": "delivered",
                                        "timestamp": timeStamp,
                                        "error": {
                                            "code": whatsapp_status_error_code,
                                            "description": whatsapp_status_error_message
                                        }
                                    }
                                ]
                            });

                            break;
                        case "read":
                           // logger.info(`${wabaNumber}: Sent Callback receive for Read ::: ${wamid} ${msgg_id}`);
                            await moengage_send_callback_response_service(moengage_URL ,wamid ,wabaNumber, {
                                "statuses": [
                                    {
                                        "msg_id": msgg_id,
                                        "status": "read",
                                        "timestamp": timeStamp,
                                        "error": {
                                            "code": whatsapp_status_error_code,
                                            "description": whatsapp_status_error_message
                                        }
                                    }
                                ]
                            });

                            break;
                        default:
                           // logger.warn(`${wabaNumber}: Sent Callback receive for Failed ::: ${wamid} ${msgg_id}`);
                            await moengage_send_callback_response_service(moengage_URL ,wamid ,wabaNumber, {
                                "statuses": [
                                    {
                                        "msg_id": msgg_id,
                                        "status": "failed",
                                        "timestamp": timeStamp,
                                        "error": {
                                            "code": whatsapp_status_error_code,
                                            "description": whatsapp_status_error_message
                                        }
                                    }
                                ]
                            });
                            break;
                    }
                }

                if (messages) {
                    const recipient_id = bodyData.entry[0].changes[0].value.messages[0].from || "";

                    const timeStamp = bodyData.entry[0].changes[0].value.messages[0].timestamp || "";
                    const type = bodyData.entry[0].changes[0].value.messages[0].id.type || "";
                    const buttonPayload = bodyData.entry[0].changes[0].value.messages[0].button || "";
               

                    await moengage_send_callback_response_service(moengage_URL, wabaNumber, {
                        "from": recipient_id,
                        "waba_number": wabaNumber,
                        "timestamp": timeStamp,
                        "type": type,

                        "context": {
                            "msg_id": msgg_id
                        },
                        "button": buttonPayload
                    });

                }

                res.status(200).json({
                    data: "Success",
                    code: "200"
                })
            }
        } else {
            res.status(200).json({
                data: "Success",
                code: "200"
            })
        }
    } catch (error) {
        console.log('error', error);
    }
}

module.exports = { whatsapp_to_moengage_connector_controller } 
