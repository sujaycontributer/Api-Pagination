import  express from "express";
import cors from 'cors'
import { productModel } from "./db";
import mongoose, { mongo } from "mongoose";

const app = express();
app.use(cors())

app.get("/products", async (req, res) => {
  const page:number = parseInt(req.query.page as string) || 1; // get the page number from the frontend
  const limit:number = parseInt(req.query.limit as string) || 5; // content per page

  const skip = (page - 1) * limit;  // data to skip 

  try {
    const products = await productModel.find().skip(skip).limit(limit);
    const total = await productModel.countDocuments();

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit), // total pages based on db data
      data: products
    });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});

async function Start () {
    await mongoose.connect("mongodb://localhost:27017/Pagination");
    app.listen(5000, () => {
        console.log("Server is runnin on port 5000");
    });
}

Start();

