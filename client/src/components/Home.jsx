import Quotes from './Quotes'
import '../App.css'
import Api from '../assets/api';
import { useState, useEffect } from 'react';
export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await Api.get("/tasks"); // your endpoint
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTasks();
  }, []);
  //countings....
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => 
    !t.completed && new Date(t.dueDate) >= new Date()
  ).length;
  const backlogTasks = tasks.filter(t => {
      return !t.completed && new Date(t.dueDate) < new Date();
  }).length;

  return (
    <div className="h-main">
      {/* top of home main */}
     <div className="h-top">
      <div className="h-backlog">
        <p> BACKLOGS </p>
        <span className="h-backcounts">
          <h3>{backlogTasks}</h3>
        </span>
        <span className="h-backlogimage"></span>
          
      </div>

      {/* pending block */}
      <div className="h-pending">
           <p> PENDINGS </p>
        <span className="h-pendingcounts">
          <h3>{pendingTasks}</h3>
        </span>
        <span className="h-pendingimage"></span>
      </div>
        {/* total task */}
      <div className="h-totaltask">
             <p> TOTAL TASKS </p>
        <span className="h-totaltaskcounts">
          <h3>{totalTasks}</h3>
        </span>
        <span className="h-totaltaskimage"></span>
      </div>
       {/* COMPLETED TASK BLOCK */}
      <div className="h-completedtask">
         <p> COMPLETED TASKS </p>
        <span className="h-completedtaskcounts">
          <h3>{completedTasks}</h3>
        </span>
        <span className="h-completedtaskimage"></span>
      </div>
     </div>
      {/* middle of home */}
      <div className="h-middle">
                   {/* profile sections */}
             
        <div className="h-profilename">
          <h2 className='nameing'>Hi {user.name}! 👋</h2>
          <p className='nameing'>Good to see you—how is your day going?</p>
          <div className="learnmore">
            <h5><pre>   ..<br/>
             .     Learn more.. Grow more.. Achieve more..  </pre></h5>
          </div>
        </div>
        <div className="h-thoughts">
          <Quotes/>
        </div>
        </div>
          
      
      {/* end of home */}
    </div>




  )
}
