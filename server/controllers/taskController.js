
import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user._id,
  });
  res.json(task);
};

// Get User Tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// Update
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

// Delete
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }
  await task.deleteOne();
  res.json({ message: "Deleted" });
};