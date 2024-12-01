import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import TaskListItem from "./TaskListItem";
import { deleteTaskAPI, fetchTasksAPI, updateTaskAPI } from "../api/tasks";

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: ".1px solid #ccc",
  fontSize: "16px",
  width: "300px",
};

const TaskList = ({ setEditingTask, refetchTasks }) => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortFilter, setSortFilter] = useState("createdAt|asc");

  const fetchTasksViaChild = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: pagination.pageSize,
        search: searchQuery,
        status: statusFilter !== "All" ? statusFilter : undefined,
        sort: sortFilter,
      };
      const response = await fetchTasksAPI(params);
      setPagination(response.data.pagination);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksViaChild();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    refetchTasks,
    pagination.currentPage,
    searchQuery,
    statusFilter,
    sortFilter,
  ]);

  const handleToggleStatus = async (taskId) => {
    try {
      const task = tasks.find((task) => task._id === taskId);
      const newStatus = task.status === "Pending" ? "Completed" : "Pending";
      await updateTaskAPI(taskId, { status: newStatus });
      fetchTasksViaChild(); // Refresh tasks after status change
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskAPI(taskId);
      fetchTasksViaChild(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (taskDetails) => {
    setEditingTask(taskDetails);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
  };

  const handleSortChange = (e) => {
    const selectedSortType = e.target.value;
    setSortFilter(selectedSortType);
  };

  const handleOnNext = () => {
    setPagination((prev) => {
      return { ...prev, currentPage: Math.max(prev.currentPage - 1, 1) };
    });
  };
  const handleOnPrevious = () => {
    setPagination((prev) => {
      return {
        ...prev,
        currentPage: Math.min(prev.currentPage + 1, pagination.totalPages),
      };
    });
  };

  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ height: "10vh" }}>
        <h2>{loading ? "Loading..." : "Task List"}</h2>
      </div>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
          style={inputStyle}
        />
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          style={{ ...inputStyle, width: "130px" }}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          value={sortFilter}
          onChange={handleSortChange}
          style={{ ...inputStyle, width: "130px" }}
        >
          <option value="createdAt|asc">Ascending</option>
          <option value="createdAt|desc">Descending</option>
        </select>
      </div>

      <div
        style={{
          height: "75vh",
          width: "75%",
          overflowY: "scroll",
        }}
      >
        <ul>
          {tasks.length > 0
            ? tasks?.map((task) => (
                <TaskListItem
                  key={task._id}
                  task={task}
                  handleToggleStatus={handleToggleStatus}
                  handleDeleteTask={handleDeleteTask}
                  handleEditTask={handleEditTask}
                />
              ))
            : !loading && <p style={{ textAlign: "center" }}>No tasks found</p>}
        </ul>
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={handleOnNext} disabled={pagination.currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${pagination.currentPage} of ${pagination.totalPages}`}</span>
        <button
          onClick={handleOnPrevious}
          disabled={pagination.currentPage >= pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

TaskList.propTypes = {
  setEditingTask: PropTypes.func,
  refetchTasks: PropTypes.bool,
};

export default TaskList;
