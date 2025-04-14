// src/components/CalendarView.tsx
import { useTaskStore } from "../stores/taskStore";

interface CalendarViewProps {
  overdueTasks: string[];
  handleDelete: (id: string) => void;
  handleComplete: (id: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ overdueTasks }) => {
  const { tasks } = useTaskStore();

  // Group tasks by date
  const tasksByDate = tasks.reduce((acc: Record<string, typeof tasks>, task) => {
    const date = new Date(task.deadline).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});

  const sortedDates = Object.keys(tasksByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedDates.map((date) => (
        <div key={date} className="border p-4 rounded shadow bg-white">
          <h2 className="text-lg font-bold mb-2">{date}</h2>
          <ul className="space-y-2">
            {tasksByDate[date].map((task) => (
              <li
                key={task.id}
                className={`p-3 rounded border 
                  ${
                    task.isCompleted
                      ? "bg-green-700 text-white"
                      : overdueTasks.includes(task.id)
                      ? "bg-red-600 text-white"
                      : ""
                  }
                `}
              >
                <span className="font-semibold">{task.title}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
