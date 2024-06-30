const express = require("express");
const  router = express.Router();
const { addComment, deleteComment, getComments } = require("../");
const {verifyToken} = require("../verifyToken"); 


router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);


module.exports = router;