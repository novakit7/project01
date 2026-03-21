import './App.css' 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function SideBar() {

  const [user, setUser] = useState({
    name: "Guest",
    email: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="s-sidebar">

      {/* sidebar profile */}
      <div className="s-profile">
        <i className="fa-solid fa-child-reaching"></i>
        <span className="s-name">{user.name}</span>
      </div>

      <div className="s-menu">
        <ul>
          <li><Link to='/home' className="menubutton"><i className="fa-solid fa-house"></i> Home</Link></li>

          <li><Link to="/backlog" className="menubutton"><i className="fa-solid fa-skull-crossbones"></i> Backlog</Link></li>

          <li><Link to="/pending" className="menubutton"><i className="fa-solid fa-clock"></i> Pending</Link></li>

          <li><Link to="/completed" className="menubutton"><i className="fa-solid fa-hand-back-fist"></i> Completed</Link></li>

          <li><Link to="/totalTask" className="menubutton"><i className="fa-solid fa-list-check"></i> Total Tasks</Link></li>

          <li><Link to="/addTask" className="menubutton"><i className="fa-solid fa-plus"></i> Add Tasks</Link></li>
        </ul>
      </div>

      <div className="s-logout">
        <button
          className="s-logoutbutton menubutton logout"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
        >
          <i className="fa-solid fa-power-off"></i> Log Out
        </button>
      </div>

    </div>
  );
}