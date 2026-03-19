import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const username = (req.body.username || req.body.userName || "").trim();
    const password = req.body.password || "";

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const isUsed = await User.findOne({
      $or: [{ username }, { userName: username }],
    });
    if (isUsed) {
      return res.status(409).json({
        message: "This username is already taken",
      });
    }

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );
    await newUser.save();

    return res.status(201).json({
      user: newUser,
      token,
      message: "Registration was successful",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This username is already taken",
      });
    }

    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const username = (req.body.username || req.body.userName || "").trim();
    const password = req.body.password || "";

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const user = await User.findOne({
      $or: [{ username }, { userName: username }],
    });

    if (!user) {
      return res.status(400).json({
        message: "That user does not exist",
      });
    }
    const isPaswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPaswordCorrect) {
      return res.status(400).json({
        message: "The password or login is incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );
    return res
      .status(201)
      .json({ user, token, message: "You have successfully logged in" });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        message: "That user does not exist",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );
    return res.json({
      user,
      token,
    });
  } catch (error) {
    return res.json({
      message: "No access",
    });
  }
};
