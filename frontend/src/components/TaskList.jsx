import React, { useEffect, useState } from "react";
import Updatecomponent from "./Updatecomponent";
import TaskItem from "./TaskItem";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/api/tasks");
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
          setFilteredTasks(sortByPriority(data));
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Filter tasks based on the selected status and sort by priority
    let filtered =
      filterStatus === "all"
        ? tasks
        : tasks.filter((task) => task.status === filterStatus);
    setFilteredTasks(sortByPriority(filtered));
  }, [filterStatus, tasks]);

  const deleteTask = async (id) => {
  window.confirm("Are you sure you want to delete this task?");
    const response = await fetch(`/api/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
      setFilteredTasks(sortByPriority(updatedTasks));
    } else {
      console.error("Failed to delete task");
    }
  };

  const startEditTask = (task) => {
    setIsEditing(true);
    setEditTask(task);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditTask(null);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const sortByPriority = (taskList) => {
    // Custom priority order: high > medium > low
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return [...taskList].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  const OpenTaskCard = (task) => {
    setSelectedTask(task);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedTask(null);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl text-center">View Tasks</h2>
      <div className="flex justify-center mt-14">
        <table className="border border-gray-500">
          <thead>
            <tr className="border bg-blue-300 text-lg ">
              <th className="border-2 p-3 px-6">Task Name</th>
              <th className="border-2  p-3 px-6">Task Description</th>
              <th className="border-2  p-3 px-6">Task Deadline</th>
              <th className="border-2  p-3 px-6">
                Task Status
                <select
                  className="ml-2"
                  value={filterStatus}
                  onChange={handleFilterChange}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In-Progress</option>
                </select>
              </th>
              <th className="border-2  p-3 px-6">Priority</th>
              <th className="border-2  p-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task._id}
                className="border border-gray-500 hover:bg-blue-200 cursor-pointer"
                onClick={() => OpenTaskCard(task)}
              >
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">{task.description}</td>
                <td className="px-4 py-2">{task.createdAt || "No Deadline"}</td>
                <td className="px-4 py-2">{task.status}</td>
                <td className="px-4 py-2">{task.priority}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => startEditTask(task)}
                    className="px-4 py-2 bg-green-500 text-white"
                  >
                    Edit Task
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      deleteTask(task._id);
                    }}
                    className="px-4 py-2 bg-red-600 text-white ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <Updatecomponent
          task={editTask}
          setTasks={setTasks}
          tasks={tasks}
          cancelEdit={cancelEdit}
        />
      )}

      {modal && (
        <TaskItem task={selectedTask} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ViewTasks;
