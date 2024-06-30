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

//UPDATE VIDEO
const updateVideo = async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
  
      if (!video) {
        return res.status(404).json({ Message: "Video not found" });
      }
  
      if (req.user.id === video.userId) {
        const updatedVideo = await Video.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
  
        return res.status(200).json({ msg: "Update successful", updatedVideo });
      } else {
        return res.status(403).json({ error: "Permission denied." });
      }
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  };
  
//DELETE VIDEO
const deleteVideo = async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
  
      if (!video) {
        return res.status(404).json({ Message: "Video not found" });
      }
  
      if (req.user.id === video.userId) {
        const updatedVideo = await Video.findByIdAndDelete(
          req.params.id
        );
  
        return res.status(200).json({ msg: "Video deleted successful", updatedVideo });
      } else {
        return res.status(403).json({ error: "Permission denied." });
      }
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  };


  //GET VIDEO

  const getVideo = async (req, res) => {
    try {
        
        const video = await Video.findById(req.params.id);

        
        if (!video) {
            return res.status(404).json({ Message: "Video not found" });
        }

      
        res.status(200).json({ video });
    } catch (err) {
    
        res.status(403).json({ Error: err.message });
    }
};

//ADD VIEW

const addView = async (req, res) => {
    try {
        
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ Message: "Video not found" });
        }

        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views: 1}
          });

        res.status(200).json( "Views incresed!");

    } catch (err) {
    
        res.status(403).json({ Error: err.message });
    }
};


//RANDOM VIDEOS

const random = async (req,res) =>{

    try {

        const videos = await Video.aggregate([{$sample:{size:40}}]);

        res.status(200).json(videos);

    } catch(err) {
       
        res.status(400).json({Error:err.message});
          
    }

}


//TREND VIDEOS

const trend = async (req,res) =>{

    try {

        const videos = await Video.find().sort({views:-1});

        res.status(200).json(videos);

    } catch(err) {
       
        res.status(400).json({Error:err.message});
          
    }
    
}

//SUBSCRIBED CHANNEL VIDEOS

const sub = async (req, res) => {
     
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;
    
        const list = await Promise.all(
          subscribedChannels.map(async (channelId) => {
            return await Video.find({ userId: channelId });
          })
        );
    
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));

      } catch (err) {
        res.status(400).json({Error:err.message});
      }

};


const getByTag = async (req, res) => {
    const tags = req.query.tags.split(",");
    try {
      const videos = await Video.find({ tags: { $in: tags } }).limit(20);
      res.status(200).json(videos);
    } catch (err) {
      res.status(400).json({Error:err.message});
    }
  };
  
const search = async (req, res) => {
    const query = req.query.q;
    try {
      const videos = await Video.find({
        title: { $regex: query, $options: "i" },
      }).limit(40);
      res.status(200).json(videos);
    } catch (err) {
        res.status(400).json({Error:err.message});
    }
  };

module.exports = { addVideo ,updateVideo ,deleteVideo ,getVideo,addView,random,trend,sub,getByTag,search};