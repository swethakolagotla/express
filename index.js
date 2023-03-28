import express from "express";
import fs from "fs";
import userrouter from "./routes/userroutes.js";
import { readFile } from "./utils/filesystem.js";
const app = express();
/*app.get("/users", (req, res) => {
  res.send("welcome to express");
});*/
app.use(express.json())
app.use(express.static("/public"))
app.use("/users",userrouter)

app.get("/products", async (req, res) => {
  try {
    const product = JSON.parse(await readFile("./data/products.json", "utf-8"));

    res.json({
      status: "success",
      length: product.length,
      data: product,
    });
  } catch {
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
});
app.get("/products/:id", async (req, res) => {
  //id
  try {
    let id = req.params.id;
    let productdata = JSON.parse(
      await readFile("./data/products.json", "utf-8")
    );
    const data = productdata.find((ele) => ele.id== id);
    res.json({
      status: "success",
      data 
    });
  } catch {
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
});
app.get("/products/:filterbyprice", async (req, res) => {     //price
  try {
    let filterbyprice = req.params.filterbyprice;
    filterbyprice = Number(filterbyprice);
   let productinfo = JSON.parse(await readFile("./data/products.json", "utf-8"));
    productinfo = productinfo.filter((ele) => ele.price > filterbyprice);
    console.log(productinfo)
    res.json({
      status: "success",
      length: productinfo.length,
      data: productinfo,
    });
  } catch {
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
});
app.get("/products/:limit/:page", async (req, res) => {   //limits/pages
  try {
   let {limit,page}=req.params
   limit=Number(limit)
   page=Number(page)
   let productData = JSON.parse(
      await readFile("./data/products.json", "utf-8")
    );
 const startIndex=limit*(page-1)
 const finalProduct=productData.slice(startIndex,startIndex+limit)
  
    res.json({
      status: "success",
      length: finalProduct.length,
      data: finalProduct,
    });
  } catch {
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
});
app.listen(4000, () => {
  console.log("listening to port 4k...");
});
