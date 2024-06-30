const express = require("express");
const  router = express.Router();
const { update , deleteUser} = require("../controllers/user");
const { verifyToken } = require("../verifyToken");


//UPDATE USER
router.put("/:id",verifyToken,update);

//DELETE USER
router.delete("/:id",verifyToken,deleteUser);

//GET USER
router.get("/find/:id",);

//SUBSCRIBE USER
router.put("/sub/:id",);

//UNSUBSCRIBE USER
router.put("/unsub/:id",);

//LIKE A VIDEO
router.put("/like/:videoId",);

//DISLIKE A VIDEO
router.put("/dislike/:videoId",);




module.exports = router;