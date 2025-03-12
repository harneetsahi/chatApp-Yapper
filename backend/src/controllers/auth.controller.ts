import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const requiredBody = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(16)
      .refine(
        (value) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s]).+$/.test(value),
        {
          message:
            "Password must be atleast 8 characters long with max 15 characters and have at least one uppercase letter, one lowercase letter, one special character, and one number",
        }
      ),
  });

  const parsedBody = requiredBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res.json({
      message: "Incorrect format",
      error: parsedBody.error,
    });
  }

  ////!SECTION

  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    // create a db entry using a model

    res.json({
      message: "successfully signed up",
    });
  } catch (error) {
    res.status(400).json({
      message: "User already exists",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // check in db if user already exists
    //  if yes, match password and then sign a jwt and return to the user
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const signout = (req: Request, res: Response) => {};
