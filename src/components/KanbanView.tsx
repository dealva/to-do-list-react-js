// src/components/KanbanView.tsx
import { useTaskStore } from "../stores/taskStore";

interface KanbanViewProps {
  overdueTasks: string[];
  handleDelete: (id: string) => void;
  handleComplete: (id: string) => void;
}

export const KanbanView: React.FC<KanbanViewProps> = ({
  overdueTasks,
  handleDelete,
  handleComplete,
}) => {
  const { tasks } = useTaskStore();

  const activeTasks = tasks.filter(
    (task) => !task.isCompleted && !overdueTasks.includes(task.id)
  );
  const completedTasks = tasks.filter((task) => task.isCompleted);
  const overdue = tasks.filter((task) => overdueTasks.includes(task.id));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* To Do */}
      <div>
        <h2 className="text-xl font-bold mb-2">To Do</h2>
        {activeTasks.map((task) => (
          <div
            key={task.id}
            className="border p-4 rounded mb-2 bg-white shadow"
          >
            <h3 className="font-semibold">{task.title}</h3>
            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            <div className="mt-2 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleComplete(task.id)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Complete
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Completed */}
      <div>
        <h2 className="text-xl font-bold mb-2">Completed</h2>
        {completedTasks.map((task) => (
          <div
            key={task.id}
            className="border p-4 rounded mb-2 bg-green-700 text-white shadow"
          >
            <h3 className="font-semibold">{task.title}</h3>
            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Overdue */}
      <div>
        <h2 className="text-xl font-bold mb-2">Overdue</h2>
        {overdue.map((task) => (
          <div
            key={task.id}
            className="border p-4 rounded mb-2 bg-red-600 text-white shadow"
          >
            <h3 className="font-semibold">{task.title}</h3>
            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
