const router= require("express").Router();
const { addMessage,getAllMessage }=require("../Controllers/messageController.js")

router.post("/addMessage",addMessage);
router.post("/getAllMessage",getAllMessage);

module.exports = router;