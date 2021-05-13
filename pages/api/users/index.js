import mongoose from "mongoose";
import connectDB from "../../../db/config/db";
import User from "../../../db/models/userModel";
import generateToken from "../../../src/utils/generateToken.js";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      break;
    case "POST":
      const { name, email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.statusCode = 400;
        res.json({
          message: `User already exists.`,
        });
      } else {
        const user = await User.create({
          name,
          email,
          password,
        });
        if (user) {
          res.statusCode = 201;
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          });
        } else {
          res.statusCode = 400;
          res.json({
            message: `Invalid user data. ${error}.`,
          });
        }
      }
    case "PUT":
      break;
    default:
      break;
  }
};
