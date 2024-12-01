import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { useState } from "react";

const Home = () => {
  const [refetchTasks, setRefetchTasks] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <div style={{ flex: 1, height: "100vh" }}>
        <div style={{ height: "100%", borderRight: ".1px solid #ccc" }}>
          <div
            style={{
              height: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Task Manager</h1>
            <TaskForm
              task={editingTask}
              setTask={setEditingTask}
              onSave={() => {
                setRefetchTasks(!refetchTasks);
              }}
            />
          </div>
          <button
            style={{
              margin: "10px",
            }}
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <TaskList refetchTasks={refetchTasks} setEditingTask={setEditingTask} />
    </div>
  );
};

export default Home;
