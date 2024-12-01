import PropTypes from "prop-types";
import { useState } from "react";
import { theme } from "../theme/palette";
import { fDate } from "../utils/date";

const TaskListItem = ({
  task = {},
  handleToggleStatus,
  handleDeleteTask,
  handleEditTask,
}) => {
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    setLoading(true);
    await handleToggleStatus(task._id);
    setLoading(false);
  };

  const deleteTask = async () => {
    setLoading(true);
    await handleDeleteTask(task._id);
    setLoading(false);
  };

  const editTask = () => {
    handleEditTask(task);
  };

  return (
    <li
      key={task._id}
      style={{
        border: ".1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>{task.title}</h3>
        <p
          style={{
            border: `.1px solid ${
              task.status === "Completed"
                ? theme.colorPalette.status.success
                : theme.colorPalette.status.error
            }`,
            width: "max-content",
            padding: "5px",
            color:
              task.status === "Completed"
                ? theme.colorPalette.status.success
                : theme.colorPalette.status.error,
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        >
          {task.status}
        </p>
      </div>
      <p>{task.description}</p>
      <p style={{ fontSize: "12px", marginTop: "10px" }}>
        Created At: {fDate(task.createdAt)}
      </p>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={toggleStatus} disabled={loading}>
          {loading ? "Updating..." : "Toggle Status"}
        </button>
        <button onClick={deleteTask} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </button>
        <button onClick={editTask} disabled={loading}>
          {loading ? "Editing..." : "Edit"}
        </button>
      </div>
    </li>
  );
};

TaskListItem.propTypes = {
  task: PropTypes.object,
  handleToggleStatus: PropTypes.func,
  handleDeleteTask: PropTypes.func,
  handleEditTask: PropTypes.func,
};

export default TaskListItem;
