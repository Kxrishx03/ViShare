const express = require("express");
const  router = express.Router();
const { verifyToken } = require("../verifyToken");
const { addVideo } = require()

//ADD VIDEO
router.post("/",verifyToken, addVideo);

//UPDATE VIDEO
router.post("/:id",verifyToken,)

module.exports = router;