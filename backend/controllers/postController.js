const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};