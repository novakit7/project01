import React, { useEffect, useState } from "react";
import "./SideControl.css";
import API from "../assets/api";

export default function TotalTask() {
  const [tasks, setTasks] = useState([]);

  // ================= FETCH =================
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    // instant UI removal (no crossing effect)
    setTasks((prev) => prev.filter((t) => t._id !== id));

    try {
      await API.delete(`/tasks/${id}`);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ================= COMPLETE =================
  const handleComplete = async (task) => {
    if (task.completed) return;

    try {
      const res = await API.put(`/tasks/${task._id}`, {
        completed: true,
      });

      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data : t))
      );

    } catch (err) {
      console.error("Complete error:", err);
    }
  };

  // ================= EDIT =================
  const handleEdit = async (task) => {
    if (task.completed) return; // 🔒 disable edit after complete

    const newTitle = prompt("Edit title:", task.title);
    const newDesc = prompt("Edit description:", task.description);

    if (!newTitle || !newDesc) return;

    try {
      const res = await API.put(`/tasks/${task._id}`, {
        title: newTitle,
        description: newDesc,
      });

      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data : t))
      );

    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  return (
    <div className="backlogcontainer">

      {/* TOTAL */}
      <div className="total">
        <h1>Total Tasks</h1>
        <div className="counts">{tasks.length}</div>
      </div>

      {/* TASK LIST */}
      <div className="down">
        <h2>Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div
              className="card"
              key={task._id}
              style={{
                opacity: task.completed ? 0.5 : 1,
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <div className="butts">

                {/* EDIT (disabled after complete) */}
                <button
                  className="edit"
                  onClick={() => handleEdit(task)}
                  disabled={task.completed}
                >
                  Edit
                </button>

                {/* COMPLETE (disabled after click) */}
                <button
                  className="complete"
                  onClick={() => handleComplete(task)}
                  disabled={task.completed}
                >
                  {task.completed ? "Completed" : "Complete"}
                </button>

                {/* DELETE (always active, no cross effect) */}
                <button
                  className="delete"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}