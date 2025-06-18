import { useQuery } from "@tanstack/react-query";
import { API_URL, API_TOKEN } from "../constants/constants";

export function TaskColumn({
  status,
  project,
  selectedLabel,
  searchTerm,
  onEditTask,
}) {
  const fetchTasks = async () => {
    const url = `${API_URL}/tasks?filters[project][name][$eq]=${encodeURIComponent(project)}&populate[labels][fields][0]=name&populate[project][fields][0]=name&populate[task_status][fields][0]=Name`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Fetch failed:", res.status, errorText);
      throw new Error(`Failed to Fetch: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  };


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tasks", project, status],
    queryFn: fetchTasks,
  });

  const tasks = data?.data || [];

  const filteredTasks = tasks
    .filter((task) => {
      const stateTitle = task?.task_status?.Name;
      const matchesStatus = stateTitle?.toLowerCase() === status.toLowerCase();
      return matchesStatus;
    })
    .filter((task) => {
      const Title = task.Title?.toLowerCase() || "";
      const description = task.description?.toLowerCase() || "";
      const taskTypes = task.labels || [];

      const matchesSearch =
        !searchTerm ||
        Title.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase());

      const matchesLabel =
        selectedLabel === "All" ||
        taskTypes.some(
          (type) => type?.name?.toLowerCase?.() === selectedLabel.toLowerCase()
        );

      return matchesSearch && matchesLabel;
    });

  return (
    <section className="task_column">
      <h3 className="task__title">{status}</h3>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading tasks: {error.message}</p>}
      {!isLoading && !isError && filteredTasks.length === 0 && <p>No tasks</p>}

      {filteredTasks.map((task) => {
        const taskTypes = task.labels || [];

        return (
          <div key={task.id} className="taskcard" onClick={() => onEditTask(task)}>
            <p className="taskcard__title">{task.Title}</p>
            <div className="taskcard__task-types">
              {taskTypes.map((type, index) => {
                const name = type.name;
                const icons = {
                  "Front-end": "🖼️",
                  "Back-end": "🧑‍💻",
                  Infra: "🛠️",
                  Documentation: "📄",
                };

                return (
                  <span key={type.id || index} className="taskcard__label">
                    {icons[name] || "🔖"} {name}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}