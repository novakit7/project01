import './App.css' 
import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <div className="s-sidebar">
       {/* sidebar profile */}
    <div className="s-profile">
    <i className="fa-solid fa-child-reaching"></i>
   <span className="s-name"> Mayank kumar tiwari</span>
      
    </div>
    <div className="s-menu">
      <ul>
        <li><Link to = '/'className="s-home menubutton"><i className="fa-solid fa-house"></i> Home</Link></li>
        {/* backlog button */}
        <li><button className="s-backlog menubutton"><i className="fa-solid fa-skull-crossbones"></i> Backlog</button></li>
        {/* pending button */}
        <li><button className="s-pending menubutton"> <i className="fa-solid fa-clock"></i>pending</button></li>
        {/* completed button */}
        <li> <button className="s-completed menubutton"><i className="fa-solid fa-hand-back-fist"></i>completed</button></li>
        {/* ongoing button */}
        <li><button className=" s-ongoing menubutton"><i className="fa-solid fa-ellipsis"></i> ongoing</button></li>
      </ul>
    </div>
    <div className="s-logout"><button className="s-logoutbutton menubutton"> <i className="fa-solid fa-power-off"></i>Log Out</button></div>
    </div>
  )
}
