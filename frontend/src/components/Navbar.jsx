import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div >
      <div className=' bg-gray-200 py-2'>
             <Link to={'/'}> <h2 className='font-bold  text-blue-800 mt-4 ml-4 text-2xl'>Task Management System</h2></Link>
          <div className='display flex justify-center '>
            <nav>
                <ul className='display flex gap-8 justify-center '>
                    <li className='text-lg mt-[-20px] text-blue-700 font-bold hover:text-blue-900'><Link to="/">Home</Link></li>
                    <li className='text-lg mt-[-20px] text-blue-700 font-bold hover:text-blue-900'><Link to="/addtask">Add Task</Link></li>
                    <li className='text-lg mt-[-20px] text-blue-700 font-bold hover:text-blue-900'><Link to="/view-task">View Tasks</Link></li>
                </ul>
            </nav>
        </div>
  
    </div>
    </div>
  )
}

export default Navbar
