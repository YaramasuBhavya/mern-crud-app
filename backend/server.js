const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  dueDate: {
    type: String,
    default: "",
  },
});

const Task = mongoose.model("Task", TaskSchema);


// GET TASKS
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// ADD TASK
app.post("/tasks", async (req, res) => {
  try {

    console.log(req.body);

    const task = new Task({
      text: req.body.text,
      dueDate: req.body.dueDate || "",
      completed: false,
    });

    const savedTask = await task.save();

    res.json(savedTask);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// UPDATE TASK
app.put("/tasks/:id", async (req, res) => {
  try {

    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedTask);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// DELETE TASK
app.delete("/tasks/:id", async (req, res) => {
  try {

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});