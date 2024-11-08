const express = require("express");
const mongoose = require("mongoose");
const todo = express();
const ItemsRoutes =require("./Routes/ItemsRoutes");


todo.use(express.json());



localURL = "mongodb://localhost:27017/ToDoAppliction";

mongoose
  .connect(localURL)
  .then(() => {
    console.log("Db is connected");
  })
  .catch((err) => {
    console.log("some error occured", err);
  });





//example endpoint
todo.get("/api", (req, res) => {
    res.send("working successfully");
  });
  
// Routes
todo.use("/Items", ItemsRoutes);



  todo.listen(300, () => {
    console.log("server is running on 300");
  });
  