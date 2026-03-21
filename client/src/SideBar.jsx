import './App.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SideBar() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "Guest", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Sync auth state
  const syncAuth = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    console.log("Auth Sync →", token); // debug

    setIsLoggedIn(Boolean(token));

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser({ name: "Guest", email: "" });
      }
    } else {
      setUser({ name: "Guest", email: "" });
    }
  };

  // ✅ Listen for all updates
  useEffect(() => {
    syncAuth();

    window.addEventListener("storage", syncAuth);     // cross-tab
    window.addEventListener("focus", syncAuth);       // tab focus
    window.addEventListener("authChange", syncAuth);  // 🔥 same tab

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("focus", syncAuth);
      window.removeEventListener("authChange", syncAuth);
    };
  }, []);

  // ✅ Logout/Login handler
  const handleAuth = () => {
    if (isLoggedIn) {
      // 🔥 remove only auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 🔥 instant UI update
      syncAuth();
      window.dispatchEvent(new Event("authChange"));

      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="s-sidebar">

      <div className="s-profile">
        <i className="fa-solid fa-child-reaching"></i>
        <span className="s-name">{user?.name || "Guest"}</span>
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
          onClick={handleAuth}
        >
          <i className="fa-solid fa-power-off"></i>{" "}
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>
      </div>

    </div>
  );
}