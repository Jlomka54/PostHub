import Post from "../models/Post.js";
import User from "../models/User.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);
    const image = req.files?.image;

    if (image) {
      let fileName = Date.now().toString() + image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      await image.mv(path.join(__dirname, "..", "uploads", fileName));
      const post = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });
      await post.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: post },
      });
      res.json(post);
    } else {
      const post = new Post({
        username: user.username,
        title,
        text,
        author: req.userId,
      });
      await post.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: post },
      });
      res.json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    const popularPosts = await Post.find().limit(5).sort({ views: -1 });

    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }
    res.json({ posts, popularPosts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
