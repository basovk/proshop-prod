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
      const { email, password } = req.body;
      if (email && password) {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
          const { _id, name, email, isAdmin } = user;
          res.statusCode = 200;
          res.json({ _id, name, email, isAdmin, token: generateToken(_id) });
        } else {
          res.statusCode = 401;
          res.json({
            message: `Invalid email or password.`,
          });
        }
      } else {
        res.statusCode = 401;
        res.json({
          message: `Request was either missing email or password.`,
        });
      }
      break;
    case "PUT":
      break;
    default:
      break;
  }
};
