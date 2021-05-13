import mongoose from "mongoose";
import connectDB from "../../../db/config/db";
import Product from "../../../db/models/productModel";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      const { productId } = req.query;
      const product = await Product.findById(productId);
      if (product) {
        res.statusCode = 200;
        res.json(product);
      } else {
        res.statusCode = 404;
        res.json({ message: `Could not find product with id ${productId}.` });
      }
      break;
    case "PUT":
      break;
    case "DELETE":
      break;
    default:
      res.end();
      break;
  }
};
