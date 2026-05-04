import { useEffect, useState } from 'react';
import API from '../api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const role = localStorage.getItem('role'); // Stored during login

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await API.get('/tasks');
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Task Dashboard</h1>
      {role === 'Admin' && (
        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
          + Create New Task
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div key={task._id} className="p-4 bg-white shadow rounded border-l-4 border-blue-500">
            <h3 className="font-semibold text-lg">{task.title}</h3>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
            <p className="text-sm text-red-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}