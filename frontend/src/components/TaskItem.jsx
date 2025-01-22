import React from "react";

const TaskItem = ({ task, closeModal }) => {
  if (!task) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="font-bold text-xl mb-4">Task Details</h2>
        <div>
          <p><strong>Task Name:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Deadline:</strong> {task.date}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Created At:</strong> {task.createdAt || "N/A"}</p>
        </div>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
