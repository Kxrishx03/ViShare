const express = require("express");
const  router = express.Router();
const { verifyToken } = require("../verifyToken");
const { addVideo,updateVideo } = require("../controllers/video");

//ADD VIDEO
router.post("/",verifyToken, addVideo);

//UPDATE VIDEO
router.post("/:id",verifyToken,updateVideo);

module.exports = router;