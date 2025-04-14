import React from "react";
import { useTaskStore } from "../stores/taskStore";

const TaskProgress: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;

  return (
    <div className="fixed top-4 right-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg text-sm animate-bounce">
      {completedTasks} / {totalTasks}
    </div>
  );
};

export default TaskProgress;
