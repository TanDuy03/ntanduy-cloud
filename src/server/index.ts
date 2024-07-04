//tạo node server
// const express = require("express");
// const app = express();
// const port = 3000;

//routes
// app.get("/", (req, res) => {
//      res.send("<h1>Đây là trang home</h1>");
// });
// app.get("/gt", (req, res) => {
//      res.send("<h1>Đây là trang giới thiệu</h1>");
// });

// //start server
// app.listen(port, () =>{
//   console.log(`Ung dung dang chay voi port ${port}`);
// });

import express from 'express'

const app = express();
const port = 3000;

app.listen(port, () =>{
  console.log(`Ung dung dang chay voi port ${port}`);
});