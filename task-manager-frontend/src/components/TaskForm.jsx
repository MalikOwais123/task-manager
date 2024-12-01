/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createTaskAPI, updateTaskAPI } from "../api/tasks";

const inputStyle = {
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "5px",
  border: ".1px solid #ccc",
  fontSize: "16px",
  width: "300px",
};

const TaskForm = ({ task = null, onSave, setTask }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newTask = { title, description };
      if (task) {
        // Editing existing task
        await updateTaskAPI(task._id, newTask);
        onReset();
      } else {
        // Creating new task
        await createTaskAPI(newTask);
      }
      onSave(); // Refresh tasks list after saving
    } catch (error) {
      console.error("Error saving task:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const onReset = () => {
    setTask(null);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
          style={inputStyle}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
          style={inputStyle}
        />
        <button type="submit">
          {loading
            ? task
              ? "Updating..."
              : "Creating..."
            : task
            ? "Update Task"
            : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
