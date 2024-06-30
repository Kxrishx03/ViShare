const express = require("express");
const  router = express.Router();
const { update , deleteUser , getUser,subscribe,unsubscribe } = require("../controllers/user");
const { verifyToken } = require("../verifyToken");


//UPDATE USER
router.put("/:id",verifyToken,update);

//DELETE USER
router.delete("/:id",verifyToken,deleteUser);

//GET USER
router.get("/find/:id",getUser);

//SUBSCRIBE USER
router.put("/sub/:id",verifyToken,subscribe);

//UNSUBSCRIBE USER
router.put("/unsub/:id",verifyToken,unsubscribe);

//LIKE A VIDEO
router.put("/like/:videoId",verifyToken);

//DISLIKE A VIDEO
router.put("/dislike/:videoId",verifyToken);




module.exports = router;