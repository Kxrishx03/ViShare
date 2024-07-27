const express = require("express");
const  router = express.Router();
const { verifyToken } = require("../verifyToken");
const { addVideo,updateVideo, deleteVideo,getVideo,addView,random,trend,sub,getByTag,search} = require("../controllers/video");

//ADD VIDEO
router.post("/",verifyToken, addVideo);

//UPDATE VIDEO
router.put("/:id",verifyToken,updateVideo);

//DELETE VIDEO
router.delete("/:id",verifyToken,deleteVideo);

//GET VIDEO
router.get("/find/:id",getVideo);

//VIEW UPDATE
router.put("/view/:id",addView);

//GET POPULAR VIDEOS
router.get("/trend",trend);

//RANDOM VIDEO
router.get("/random",random);

//TEST
router.get("/test",(req,res) => {
    res.status(200).json({Messaage:"Working"});
})

//SUBSCRIBE CHANNEL VIDEO
router.get("/sub",verifyToken,sub);

//VIDEO BY TAG
router.get("/tags", getByTag);

//SEARCH
router.get("/search", search)

module.exports = router;