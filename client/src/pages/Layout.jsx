import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { ProjectSidebar } from "../components/ProjectSidebar";
import { Form } from "../components/Form";
import { API_URL, API_TOKEN } from "../constants/constants";
import { useQueryClient } from "@tanstack/react-query";

export default function Layout() {
  //
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [notification, setNotification] = useState(null);
  const queryClient = useQueryClient();
  const params = /\/projects\/([^/]+)/.exec(location.pathname);
  const activeProject = params ? params[1].toUpperCase() : null;

  const handleCloseForm = () => setTaskToEdit(null);
  const handleSubmitTask = async (task) => {
    try {
      const taskId = task.documentId;
      const url = taskId ? `${API_URL}/tasks/${taskId}` : `${API_URL}/tasks`;
      const method = taskId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            Title: task.Title,
            description: task.description,
            labels: task.labels,
            task_status: task.task_status,
            project: task.project,
          },
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      setNotification({ type: "success", message: "✅" });
    } catch (err) {
      console.error(err);
      setNotification({
        type: "Error",
        message: "❌",
      });
    } finally {
      handleCloseForm();
      queryClient.invalidateQueries(["tasks"]);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDeleteTask = async (task) => {
    if (!task?.documentId) return;

    try {
      const res = await fetch(`${API_URL}/tasks/${task.documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Error deleting task ${res.status} ${errorText}`
        );
      }

      setNotification({
        type: "success",
        message: "Task deleted!",
      });
    } catch (err) {
      console.error("Error deleting task:", err);
      setNotification({
        type: "error",
        message: "Error deleting task",
      });
    } finally {
      handleCloseForm();
      queryClient.invalidateQueries(["tasks"]);
      setTimeout(() => setNotification(null), 3000);
    }
  };
  return (
    <>
      <aside className="ProjectSidebar">
        <ProjectSidebar projects={["PGM-3", "PGM-4"]} activeProject={activeProject} />
      </aside>

      <main className="task">

        <Outlet
          context={{
            selectedLabel,
            searchTerm,
            taskToEdit,
            setTaskToEdit,
            setSelectedLabel,
            setSearchTerm,
            setNotification,
          }}
        />
      </main>

      {taskToEdit !== null && (
        <Form
          task={taskToEdit}
          onClose={handleCloseForm}
          onSubmit={handleSubmitTask}
          onDelete={handleDeleteTask}
        />
      )}

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </>
  );
}