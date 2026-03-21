import Quotes from './Quotes'
import '../App.css'
import Api from '../assets/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // SAFE user parsing
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [tasks, setTasks] = useState([]);

  // redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  // fetch tasks
  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await Api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTasks();
  }, []);

  //countings....
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter (t=> t.completed).length;

  const pendingTasks = tasks.filter(t => 
    !t.completed && new Date(t.dueDate) >= new Date()
  ).length;

  const backlogTasks = tasks.filter(t => 
    !t.completed && new Date(t.dueDate) < new Date()
  ).length;

  return (
    <div className="h-main">

      {/* top */}
      <div className="h-top">

        <div className="h-backlog">
          <p> BACKLOGS </p>
          <h3>{backlogTasks}</h3>
        </div>

        <div className="h-pending">
          <p> PENDINGS </p>
          <h3>{pendingTasks}</h3>
        </div>

        <div className="h-totaltask">
          <p> TOTAL TASKS </p>
          <h3>{totalTasks}</h3>
        </div>

        <div className="h-completedtask">
          <p> COMPLETED TASKS </p>
          <h3>{completedTasks}</h3>
        </div>

      </div>

      {/* middle */}
      <div className="h-middle">

        <div className="h-profilename">
          {/*  SAFE ACCESS */}
          <h2 className='nameing'>
            Hi {user?.name || "User"}! 👋
          </h2>

          <p className='nameing'>
            Good to see you—how is your day going?
          </p>

          <div className="learnmore">
            <h5>
              <pre>
   ..
 .     Learn more.. Grow more.. Achieve more..
              </pre>
            </h5>
          </div>
        </div>

        <div className="h-thoughts">
          <Quotes/>
        </div>

      </div>

    </div>
  );
}