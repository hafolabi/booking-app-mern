import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }).collation({
      locale: "en",
      strength: 2,
    });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(400, "Wrong password!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...others } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...others }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Set token to none and expire after 1 seconds
    res.cookie("access_token", "none", {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true,
    });
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (err) {
    next(err);
  }
};
