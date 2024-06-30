const User = require("../models/User.js");
const Video = require("../models/Video.js");

//ADD VIDEO
const addVideo =  async (req,res) => {
      
    const newVideo = new Video({ userId: req.user.id, ...req.body });

    try {
        
        const savedVideo = await newVideo.save();

        res.status(200).json({msg:"Success",savedVideo});

    } catch(err) {

        res.status(403).json({Error:err.message});

    }
      
}

const updateVideo = async (req,res) => {
      
    try {
       const video = await Video.findByIdAndUpdate(req.params.id);
          
    } catch(err) {

        res.status(403).json({Error:err.message});

    }
}




module.exports = { addVideo}