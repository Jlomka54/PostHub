import Post from "../models/Post.js";
import User from "../models/User.js";
import {
  CloudinaryConfigError,
  CloudinaryUploadError,
  deleteImage,
  uploadImage,
} from "../utils/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const image = req.files?.image;
    let uploadedImage = null;

    if (image) {
      uploadedImage = await uploadImage(image);
    }

    const post = new Post({
      username: user.username,
      title,
      text,
      imgUrl: uploadedImage?.url || "",
      imgPublicId: uploadedImage?.publicId || "",
      author: req.userId,
    });

    await post.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: post },
    });
    res.json(post);
  } catch (error) {
    console.log(error);
    if (error.message === "Only image files are allowed") {
      return res.status(400).json({ message: error.message });
    }
    if (error instanceof CloudinaryConfigError) {
      return res.status(500).json({ message: "Cloudinary is not configured" });
    }
    if (error instanceof CloudinaryUploadError) {
      return res.status(502).json({ message: "Image upload failed" });
    }

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

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { views: 1 } },
      { returnDocument: "after" },
    ).populate({
      path: "comments",
      populate: {
        path: "author",
        select: "username",
      },
    });
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });
    await deleteImage(post.imgPublicId);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const image = req.files?.image;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (image) {
      const uploadedImage = await uploadImage(image);
      await deleteImage(post.imgPublicId);
      post.imgUrl = uploadedImage.url;
      post.imgPublicId = uploadedImage.publicId;
    }

    post.title = title;
    post.text = text;

    await post.save();
    res.json(post);
  } catch (error) {
    if (error.message === "Only image files are allowed") {
      return res.status(400).json({ message: error.message });
    }
    if (error instanceof CloudinaryConfigError) {
      return res.status(500).json({ message: "Cloudinary is not configured" });
    }
    if (error instanceof CloudinaryUploadError) {
      return res.status(502).json({ message: "Image upload failed" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
