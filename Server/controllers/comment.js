const Comment = require("../models/Comments.js");
const  Video  = require("../models/Video.js");

const addComment = async (req, res) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    res.status(400).json({Error:err.message});
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(res.params.id);
    const video = await Video.findById(res.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      return  res.status(200).json("The comment has been deleted.");
    } else {
      return  res.status(403).json("Access denied");
    }
  } catch (err) {
    res.status(400).json({Error:err.message});
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({Error:err.message});
  }
};


module.exports = {addComment,deleteComment,getComments };