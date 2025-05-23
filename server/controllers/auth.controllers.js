import User from "../models/auth.model.js";
import cloudinary from "../utils/cloudinary.js";
import generateToken from "../utils/generateToken.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    if (!fullName || !password || !email)
      return res.status(400).json({
        message: "Please provide all fields",
      });

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullName,
      password: hashedPassword,
      email,
      lastLoginAt: new Date(),
    });
    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        lastLoginAt: newUser.lastLoginAt,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//login
export const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    if (!password || !email)
      return res.status(400).json({
        message: "Please provide all fields",
      });

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentails" });
    }

    user.lastLoginAt = new Date();
    await user.save(); 
    generateToken(user._id, res);

    return res.json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "ProficPic not found" });
    }

    const imageUrl = await cloudinary.uploader.upload(profilePic);

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: imageUrl.secure_url,
      },
      { new: true }
    );

    return res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    return res.status(200).json({
      _id: req.user._id,
      email: req.user.email,
      fullName: req.user.fullName,
      profilePic: req.user.profilePic,
      createdAt: req.user.createdAt,
      lastLoginAt: req.user.lastLoginAt,
    });
  } catch (error) {
    console.log("Error in CheckAuth");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfileDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getProfileDetails");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
