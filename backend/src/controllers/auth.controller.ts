import { Request, Response } from "express";
import {
  zodSigninValidation,
  zodSignupValidation,
  zodPasswordValidation,
} from "../lib/zodValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { uploadOnCloudinary } from "../lib/cloudinary";

export const signup = async (req: Request, res: Response) => {
  const parsedBody = zodSignupValidation.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      message: "Incorrect format",
      error: parsedBody.error.errors,
    });
    return;
  }

  ////!SECTION
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const checkExistingUser = await User.findOne({ email });

    if (checkExistingUser) {
      res.status(409).json({
        message: "User already exists",
      });
      return;
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "7d" }
    );

    const options = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
    };

    res.status(201).cookie("jwt", token, options).json({
      message: "signed up successfully",
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const parsedBody = zodSigninValidation.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      message: "Incorrect format",
      error: parsedBody.error.errors,
    });
    return;
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);

      if (matchPassword) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          `${process.env.JWT_SECRET}`,
          { expiresIn: "7d" }
        );

        const options = {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
        };

        res.status(201).cookie("jwt", token, options).json({
          message: "logged in successfully",
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar,
        });
      } else {
        res.status(401).json({ message: "Incorrect credentials" });
      }
    } else {
      res.status(401).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const signout = (req: Request, res: Response) => {
  try {
    res
      .clearCookie("jwt", {
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
      })
      .status(200)
      .json({
        message: "logged out successfully",
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const checkAuth = (req: Request, res: Response) => {
  try {
    // @ts-ignore
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user._id;

    const localPath = req.file?.path;

    if (!localPath) {
      res.status(400).json({ message: "Profile picture is required" });
      return;
    }

    const uploadedAvatar = await uploadOnCloudinary(localPath);

    if (!uploadedAvatar) {
      res.status(400).json({ message: "Image could not be uploaded" });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        avatar: uploadedAvatar?.url,
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user._id;

  const parsedBody = zodPasswordValidation.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      message: "Incorrect format",
      error: parsedBody.error.errors,
    });
    return;
  }

  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (!(newPassword === confirmNewPassword)) {
    res.status(400).json({
      message: "New passwords must match",
    });
    return;
  }

  if (oldPassword === newPassword) {
    res.status(400).json({
      message: "New password cannot be the same as old password",
    });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(401).json({
        message: "User not found",
      });
      return;
    }

    const matchPassword = await bcrypt.compare(oldPassword, user.password);

    if (!matchPassword) {
      res.status(401).json({
        message: "Incorrect credentials",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);

    user.password = hashedPassword;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Password successfully updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
