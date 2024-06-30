const User = require("../models/User");
const bcrypt = require('bcrypt');

const update = async (req, res) => {

      const password = req.body.password;

      if(password) {
         const salt = await bcrypt.genSalt(10);
         const hash = await bcrypt.hash(password, salt);
         req.body.password = hash;
      }   

  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
     res.status(400).json({error:err.message});
    }
  } else {

    return res.status(403).json({Error:"Access denied"});

  }
};

const deleteUser = async (req, res) => {

  if (req.params.id === req.user.id) {

    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      res.status(400).json({error:err.message});
    }

  } else {
    return res.status(403).json({Error:"You can delete only your account!"});
  }

};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({error:err.message});
  }
};

const subscribe = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    res.status(400).json({error:err.message});
  }
};

const unsubscribe = async (req, res) => {
  
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")

    } catch (err) {
      res.status(400).json({error:err.message});
    }
 
};

const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.")
  } catch (err) {
    next(err);
  }
};

const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
      })
      res.status(200).json("The video has been disliked.")
  } catch (err) {
    next(err);
  }
};


module.exports = { update,deleteUser ,getUser ,subscribe,unsubscribe };