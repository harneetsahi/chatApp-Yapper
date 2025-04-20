import { Request, Response } from "express";
import User from "../models/user.model";
import { Message } from "../models/message.model";
import { getReceiverSocketId, io } from "../socket";
import cloudinary from "../lib/cloudinary";

export const getRecentChats = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    const filterUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    ); // not equal to the logged in userId

    res.status(200).json(filterUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId: id },
        { senderId: id, receiverId: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    // @ts-ignore
    const senderId = req.user._id;

    let imageURL;

    if (image) {
      const imageResponse = await cloudinary.uploader.upload(image);
      imageURL = imageResponse.secure_url;
    }

    const message = new Message({
      senderId,
      receiverId,
      text,
      image: imageURL,
    });

    await message.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message", message);
    }

    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
