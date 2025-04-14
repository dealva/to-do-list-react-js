import { useTaskStore } from "../stores/taskStore"

export const ResetAllButton = () => {
  const resetTasks = useTaskStore((state) => state.resetTasks);

  const handleReset = () => {
    const confirmed = window.confirm("Are you sure you want to reset all tasks?");
    if (confirmed) {
      resetTasks();
    }
  };

  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={handleReset}
        className="bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition"
      >
        Reset All Tasks
      </button>
    </div>
  );
};