import { create } from "zustand";
import { persist } from "zustand/middleware";

type Task = {
  id: string;
  title: string;
  deadline: string;
  isCompleted: boolean;
  createdAt: string;
};

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  resetTasks: () => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      completeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, isCompleted: true } 
              : task
          ),
        })),
      resetTasks: () => set({ tasks: [] }),
    }),
    {
      name: "todo-storage", // localStorage key
    }
  )
);
