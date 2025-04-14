import { useState } from 'react';
import { useTaskStore } from '../stores/taskStore'
import { v4 as uuidv4 } from 'uuid'

function AddTaskPage() {
  const { addTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !deadline.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newTask = {
      id: uuidv4(),
      title,
      deadline,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    addTask(newTask);

    // Clear form after adding
    setTitle("");
    setDeadline("");

    alert("Task added successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Task Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Deadline</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded p-2"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTaskPage;



// function AddTaskPage() {
//   const [task, setTask] = useState('');
//   const [deadline, setDeadline] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!task || !deadline) {
//       alert('Please fill in both the task and deadline.');
//       return;
//     }

//     console.log({ task, deadline }); // For now, just log it. We'll connect to Zustand later!

//     // Reset form
//     setTask('');
//     setDeadline('');
//   };

//   return (
//     <div className="flex justify-center items-center w-full p-8">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-blue-600">Add New Task</h2>

//         <div className="mb-4">
//           <label className="block mb-1 text-gray-700">Task Name</label>
//           <input
//             type="text"
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded"
//             placeholder="Enter your task"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 text-gray-700">Deadline</label>
//           <input
//             type="date"
//             value={deadline}
//             onChange={(e) => setDeadline(e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//         </div>

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           Add Task
//         </button>
//       </form>
//     </div>
//   );
// }


