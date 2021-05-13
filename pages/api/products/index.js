import mongoose from "mongoose";
import connectDB from "../../../db/config/db";
import Product from "../../../db/models/productModel";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      const products = await Product.find({});
      if (products) {
        res.statusCode = 200;
        res.json(products);
      } else {
        res.statusCode = 404;
        res.json({ message: `Could not find any products.` });
      }
      break;
    case "POST":
      break;
    default:
      res.end();
      break;
  }
};
