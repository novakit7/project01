import React from 'react'
import "./SideControl.css"
export default function Backlog() {
  return (
  
    <div className="backlogcontainer">
      <div className="top">
        <h1>Backlogs</h1>
        <div className="counts">5</div>
      </div>
      <div className="down"><h2> Tasks</h2>
         <div className="card">
          <h3> works</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero sit minus nisi. Quam cum consequatur, recusandae placeat repudiandae deleniti, itaque suscipit vitae alias accusantium harum commodi aliquid fuga quibusdam amet.</p>
          <div className='butts'>
            <button className='edit'>Edit</button>
            <button className='complete'>Complete</button>
            <button className='delete'>Delete</button>
          </div>
         </div>
      </div>
     </div>
    
    
  )
}
