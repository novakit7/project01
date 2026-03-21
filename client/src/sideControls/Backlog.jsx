import React, { useEffect, useState } from 'react'
import "./SideControl.css"
import API from "../assets/api";

export default function Backlog() {

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

  // ================= FILTER BACKLOG =================
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredTasks = tasks.filter(t => {
    if (!t.dueDate) return false;

    const due = new Date(t.dueDate);
    due.setHours(0, 0, 0, 0);

    return due > today && !t.completed;
  });

  // ================= DELETE =================
  const handleDelete = async (id) => {
    setTasks(prev => prev.filter(t => t._id !== id));

    try {
      await API.delete(`/tasks/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= COMPLETE =================
  const handleComplete = async (task) => {
    try {
      setTasks(prev =>
        prev.map(t =>
          t._id === task._id ? { ...t, completed: true } : t
        )
      );

      await API.put(`/tasks/${task._id}`, {
        completed: true,
      });

    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = async (task) => {
    const newTitle = prompt("Edit title:", task.title);
    const newDesc = prompt("Edit description:", task.description);

    if (!newTitle || !newDesc) return;

    try {
      const res = await API.put(`/tasks/${task._id}`, {
        title: newTitle,
        description: newDesc,
      });

      setTasks(prev =>
        prev.map(t => t._id === task._id ? res.data : t)
      );

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="backlogcontainer">

      <div className="top">
        <h1>Backlogs</h1>
        <div className="counts">{filteredTasks.length}</div>
      </div>

      <div className="down">
        <h2> Tasks</h2>

        {filteredTasks.map(task => (
          <div className="card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            {/* 🔥 optional: show date */}
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>

            <div className='butts'>

              <button
                className='edit'
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>

              <button
                className='complete'
                onClick={() => handleComplete(task)}
              >
                Complete
              </button>

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