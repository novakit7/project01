import Quotes from './Quotes'
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

      {/* pending block */}
      <div className="h-pending">
           <p> PENDINGS </p>
        <span className="h-pendingcounts">
          <h3>05</h3>
          <p>jan 13- march8</p>
        </span>
        <span className="h-pendingimage"></span>
      </div>
        {/* total task */}
      <div className="h-totaltask">
             <p> TOTAL TASKS </p>
        <span className="h-totaltaskcounts">
          <h3>05</h3>
          <p>jan 13- march8</p>
        </span>
        <span className="h-totaltaskimage"></span>
      </div>
       {/* COMPLETED TASK BLOCK */}
      <div className="h-completedtask">
         <p> COMPLETED TASKS </p>
        <span className="h-completedtaskcounts">
          <h3>05</h3>
          <p>jan 13- march8</p>
        </span>
        <span className="h-completedtaskimage"></span>
      </div>
     </div>
      {/* middle of home */}
      <div className="h-middle">
                   {/* profile sections */}
             
        <div className="h-profilename">
          <h2 className='nameing'>Hi Mayank! 👋</h2>
          <p className='nameing'>Good to see you—how is your day going?</p>
          <div className="learnmore">
            <h3> Learn More</h3>
            <p> learning beyond fundamentals</p>
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
