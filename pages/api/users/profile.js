import mongoose from "mongoose";
import connectDB from "../../../db/config/db";
import jwt from "jsonwebtoken";
import User from "../../../db/models/userModel";
import generateToken from "../../../src/utils/generateToken";
connectDB();

export default async (req, res) => {
  const { authorization } = req?.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      switch (req.method) {
        case "GET":
          if (user) {
            const { _id, name, email, isAdmin } = user;
            res.statusCode = 200;
            res.json({ _id, name, email, isAdmin });
          } else {
            res.statusCode = 404;
            res.json({
              message: `User not found.`,
            });
          }
          break;
        case "PUT":
          if (user) {
            const {
              name: updatedName,
              email: updatedEmail,
              password: updatedPassword,
            } = req.body;
            user.name = updatedName || user.name;
            user.email = updatedEmail || user.email;
            user.password = updatedPassword || user.password;
            const updatedUser = await user.save();
            const { _id, name, email, isAdmin } = updatedUser;
            res.statusCode = 200;
            res.json({ _id, name, email, isAdmin, token: generateToken(_id) });
          } else {
            res.statusCode = 404;
            res.json({
              message: `User not found.`,
            });
          }
          break;
        default:
          res.end();
          break;
      }
    } catch (error) {
      res.statusCode = 401;
      res.json({
        message: `Token failed, no corresponding user was found. ${error}.`,
      });
    }
  } else {
    res.statusCode = 401;
    res.json({
      message: `Invalid authorization, no Bearer token found.`,
    });
  }
};
