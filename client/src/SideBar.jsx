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
        <li><Link to = '/home'className="s-home menubutton"><i className="fa-solid fa-house"></i> Home</Link></li>
        {/* backlog button */}
        <li><Link to="/backlog" className="s-backlog menubutton"><i className="fa-solid fa-skull-crossbones"></i> Backlog</Link></li>
        {/* pending button */}
        <li><Link to="/pending" className="s-pending menubutton"> <i className="fa-solid fa-clock"></i>pending</Link></li>
        {/* completed button */}
        <li> <Link to="/completed" className="s-completed menubutton"><i className="fa-solid fa-hand-back-fist"></i>completed</Link></li>
        {/* ongoing button */}
        <li><Link to="/ongoing" className=" s-ongoing menubutton"><i className="fa-solid fa-ellipsis"></i> ongoing</Link></li>
      </ul>
    </div>
    <div className="s-logout"><button className="s-logoutbutton menubutton"> <i className="fa-solid fa-power-off"></i>Log Out</button></div>
    </div>
  )
}
