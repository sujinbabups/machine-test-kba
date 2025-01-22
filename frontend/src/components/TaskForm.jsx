import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
    const [title, settitle] = useState('');
    const [description, setTaskDescription] = useState('');
    const [date, setDate] = useState('');
    const [status,setTaskStatus]=useState('');
    const [priority,setTaskPriority]=useState('');


    const navigate=useNavigate()
    const submitForm = (e) => {
        e.preventDefault();
        const TaskDetails = {
            title: title,
            description: description,
            date: date,
            status:status,
            priority:priority
        };
        addTaskasync(TaskDetails);
    };
    const addTaskasync = async (TaskDetails) => {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(TaskDetails),
        });
        const data = await response.json();
        alert('Task Added Successfully');
        navigate('/view-task')
        console.log(data);
    }

  return (
    <>
    <div className=''>
        <h2 className='font-bold text-2xl ml-[45%] mt-10'>Add Task</h2>
        <div className='border border-gray-400 w-[30%] p-4 m-auto flex justify-center mt-5 rounded-md'>
            <form onSubmit={submitForm} className=''>
                <label className='text-sm'>Task Name </label>
                <input type="text" onChange={(e) => settitle(e.target.value)} name="title" className='border-2 border-gray-900 px-4 py-1 relative left-[35%] ' placeholder='enter task title' required /> <br />
                <br />
                <label className='text-sm'>Task Description</label>
                <input type="text" name="description" onChange={(e) => setTaskDescription(e.target.value)} className='border-2 border-gray-900 px-4 py-1 relative left-[25%] ' placeholder='enter task Description' required/><br />
                <br />
                <label className='text-sm'>Status</label>
                <select required className='border-2 border-gray-900 px-14 py-1 relative left-[45%] ' name='status' onClick={(e)=>setTaskStatus(e.target.value)} >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>


                </select>
                <br />
                <br />
                <label className='text-sm'>Task Deadline</label>
                <input type="date" name="taskdeadline" required onChange={(e)=>setDate(e.target.value)} className='border-2 border-gray-900 px-10 py-1 relative left-[30%]' /><br />
                <br />
                <label className='text-sm'>Priority</label>
                <select className='border-2 border-gray-900 px-16 py-1 relative left-[43%] '  required name='priority' onClick={(e)=>setTaskPriority(e.target.value)} >
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>


                </select>
                <br />
                <button type="submit"  className='px-4 bg-green-600 py-2 ml-24 mt-8 text-blue-950 font-bold rounded-md'>Add Task</button>
            </form>
        </div>
    </div>
    </>
   
  )
}

export default TaskForm