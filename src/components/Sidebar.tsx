import { NavLink } from 'react-router-dom';

function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded transition-all ${
      isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-100'
    }`;

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <div className="p-4 text-lg font-bold text-blue-600">To-Do App</div>
      <nav className="flex flex-col gap-2 p-4">
        <NavLink to="/add-task" className={linkClass}>
          Add Task
        </NavLink>
        <NavLink to="/task-management" className={linkClass}>
          Task Management
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;