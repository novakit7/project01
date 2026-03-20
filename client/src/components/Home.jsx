import React from 'react'
import '../App.css'
export default function Home() {
  return (
    <div className="h-main">
      {/* top of home main */}
     <div className="h-top">
      <div className="h-backlog">
        <p> BACKLOGS </p>
        <span className="h-backcounts">
          <h3>05</h3>
          <p>jan 13- march8</p>
        </span>
        <span className="h-backlogimage"></span>
          
      </div>
      <div className="h-pending"></div>
      <div className="h-complete"></div>
      <div className="h-ongoing"></div>
     </div>
      {/* middle of home */}
      <div className="h-main">

      </div>
      {/* end of home */}
    </div>
  )
}
