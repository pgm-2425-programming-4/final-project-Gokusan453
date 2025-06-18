//topbar
import { useNavigate } from "@tanstack/react-router";

export default function FilterBar({
  selectedLabel,
  onLabelChange,
  searchTerm,
  onSearchChange,
  onAddTask,
  activeProject,
}) {
  const labels = ["All", "Front-end", "Back-end", "Infra", "Documentation"];
  const navigate = useNavigate();

  const handleViewBacklog = () => {
    if (!activeProject) return;
    navigate({ to: `/projects/${activeProject}/backlog` });
  };

  return (
    <>
      <div className="taskboard__filters">
        <select
          className="taskboard__select"
          value={selectedLabel}
          onChange={(e) => onLabelChange(e.target.value)}
          aria-label="Filter tasks by label"
        >
          {!labels || labels.length === 0 ? (
            <option className="visually-hidden" disabled>
              Aucun label
            </option>
          ) : (
            labels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))
          )}
        </select>

        <input
          type="text"
          className="taskboard__search"
          placeholder="Search title or description"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="taskboard__actions">
        <button className="btn btn--add" onClick={onAddTask}>
          Add new task
        </button>
        <button
          className="btn btn--backlog"
          onClick={handleViewBacklog}
          disabled={!activeProject}
        >
          View backlog
        </button>
      </div>
    </>
  );
}