import React, { useEffect, useState } from 'react'
import "./SideControl.css"
import API from "../assets/api";

export default function Completed() {

  const [tasks, setTasks] = useState([]);

  // ================= FETCH =================
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 FILTER COMPLETED
  const filteredTasks = tasks.filter(task => task.completed);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    // remove instantly (no cross effect)
    setTasks(prev => prev.filter(t => t._id !== id));

    try {
      await API.delete(`/tasks/${id}`);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ================= COMPLETE (DISABLED HERE) =================
  const handleComplete = async () => {
    // ❌ no action (already completed)
    return;
  };

  // ================= EDIT (DISABLED HERE) =================
  const handleEdit = async () => {
    // ❌ no action (completed task)
    return;
  };

  return (
    <div className="backlogcontainer">

      <div className="completed">
        <h1>Completed Tasks</h1>
        <div className="counts">{filteredTasks.length}</div>
      </div>

      <div className="down">
        <h2> Tasks</h2>

        {filteredTasks.map(task => (
          <div
            className="card"
            key={task._id}
            style={{
              opacity: 0.5,
              textDecoration: "line-through"
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <div className='butts'>

              {/* EDIT (disabled) */}
              <button
                className='edit'
                onClick={() => handleEdit(task)}
                disabled
              >
                Edit
              </button>

              {/* COMPLETE (disabled) */}
              <button
                className='complete'
                onClick={() => handleComplete(task)}
                disabled
              >
                Completed
              </button>

              {/* DELETE (working) */}
              <button
                className='delete'
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}