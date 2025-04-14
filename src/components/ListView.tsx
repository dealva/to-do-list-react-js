
import { useTaskStore } from "../stores/taskStore";

interface ListViewProps {
  overdueTasks: string[];
  handleDelete: (id: string) => void;
  handleComplete: (id: string) => void;
}

export const ListView: React.FC<ListViewProps> = ({
  overdueTasks,
  handleDelete,
  handleComplete,
}) => {
  const { tasks } = useTaskStore();

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex justify-between items-center border p-4 rounded
            ${
              task.isCompleted
                ? "bg-green-700 text-white"
                : overdueTasks.includes(task.id)
                ? "bg-red-600 text-white"
                : ""
            }
          `}
        >
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            {!task.isCompleted && (
              <p className="text-black">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="space-x-2">
            {!task.isCompleted && !overdueTasks.includes(task.id) && (
              <>
                <button
                  onClick={() => handleComplete(task.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Complete
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
