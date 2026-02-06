const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// add task
app.post("/add", async (req, res) => {
  const newTask = new Task({
    text: req.body.text,
  });

  await newTask.save();
  res.json(newTask);
});

// get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
