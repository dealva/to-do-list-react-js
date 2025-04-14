// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddTaskPage from "./pages/AddTaskPage";
import TaskManagementPage from "./pages/TaskManagementPage";
import TaskProgress from "./components/TaskProgress";
import './App.css'

function App() {


  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/add-task" replace />} />
            <Route path="/add-task" element={<AddTaskPage />} />
            <Route path="/task-management" element={<TaskManagementPage />} />
          </Routes>
        </main>
        <TaskProgress />
      </div>
    </Router>
  )
}

export default App
