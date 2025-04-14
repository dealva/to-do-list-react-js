import { useEffect, useState } from "react";
import { useTaskStore } from "../stores/taskStore";
import { ResetAllButton } from "../components/ResetAllButton"
import { ListView } from "../components/ListView";
import { KanbanView } from "../components/KanbanView";

import { CalendarView } from "../components/CalendarView";


const TaskManagementPage = () => {
    const { tasks, deleteTask, completeTask } = useTaskStore();
    const [overdueTasks, setOverdueTasks] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');
    useEffect(() => {
    const now = new Date();
    const overdue = tasks
        .filter((task) => !task.isCompleted && new Date(task.deadline) < now)
        .map((task) => task.id);

    setOverdueTasks(overdue);
    }, [tasks]);

    

  
    const handleDelete = (id: string) => {
      if (confirm("Are you sure you want to delete this task?")) {
        deleteTask(id);
      }
    };
  
    const handleComplete = (id: string) => {
      if (confirm("Mark this task as complete? This cannot be undone.")) {
        completeTask(id);
      }
    };
  
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4">Task Management</h2>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 active:scale-95 transition transform"
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 active:scale-95 transition transform"
            >
              Kanban View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 active:scale-95 transition transform"
            >
              Calendar View
            </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found. Please add some tasks.</p>
        ) : (
          <>
            {viewMode === 'list' && (
              <ListView
                overdueTasks={overdueTasks}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
              />
            )}
            {viewMode === 'kanban' && (
              <KanbanView
                overdueTasks={overdueTasks}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
              />
            )}
            {viewMode === 'calendar' && (
              <CalendarView
                overdueTasks={overdueTasks}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
              />
            )}
          <ResetAllButton />
          </>
          
        )}
        
      </div>
    );
  };
  

export default TaskManagementPage;
