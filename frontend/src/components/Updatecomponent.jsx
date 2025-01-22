import React, { useState } from "react";

const UpdateTask = ({ task, setTasks, tasks, cancelEdit }) => {
  const [updatedTask, setUpdatedTask] = useState({
    title: task?.title || "",
    description: task?.description || "",
    date: task?.date || "",
    status: task?.status || "",
    priority: task?.priority || "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const updatedTasks = tasks.map((t) =>
          t._id === task._id ? { ...t, ...updatedTask } : t
        );
        setTasks(updatedTasks);
        alert("Task updated successfully");
        cancelEdit();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={cancelEdit} 
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-[500px] relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="font-bold text-xl text-center">Update Task</h2>
        <form onSubmit={updateTask} className="mt-4">
          <label>Task Name</label>
          <input
            className="border-2 border-gray-900 px-4 py-2 w-full mt-2"
            type="text"
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
          />
          <label className="mt-4 block">Task Description</label>
          <input
            className="border-2 border-gray-900 px-4 py-2 w-full mt-2"
            type="text"
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
          />
          <label className="mt-4 block">Task Deadline</label>
          <input
            className="border-2 border-gray-900 px-4 py-2 w-full mt-2"
            type="date"
            name="date"
            value={updatedTask.date}
            onChange={handleChange}
          />
               <label>Status</label>
                <select className='border-2 border-gray-900 py-2 w-full mt-2 ' name='status' value={updatedTask.status}
            onChange={handleChange} >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>


                </select><br /><br />

                <label className='text-sm'>Priority</label>
                <select className='border-2 border-gray-900 py-2 w-full mt-2  ' name='priority' value={updatedTask.priority}
            onChange={handleChange} >
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>


                </select>

          <div className="flex justify-end mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
              Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-500 text-white ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
