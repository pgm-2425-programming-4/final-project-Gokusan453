import { TaskColumn } from "./TaskColumn";

export default function Status({
  project,
  selectedLabel,
  searchTerm,
  onEditTask,
}) {
  const statuses = ["To do", "In progress", "Ready for review", "Done"];

  return (
    <div className="taskboard__columns">
      {statuses.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          project={project}
          selectedLabel={selectedLabel}
          searchTerm={searchTerm}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}