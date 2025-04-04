const express= require("express");
const router=express.Router();

const { whatsapp_to_moengage_connector_controller } =require("../controllers/whatsapp_to_moengage_connector.controller.js")

router.post('/whatsapp_to_connector/moengage/:wabanumber',whatsapp_to_moengage_connector_controller)

module.exports= router