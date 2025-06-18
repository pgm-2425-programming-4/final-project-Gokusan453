// Header bar: Dropdown, zoekbalk, toevoegen taak en backlog bekijken
import { useNavigate } from "@tanstack/react-router";

export default function FilterBar({
  selectedLabel,
  onLabelChange,
  searchTerm,
  onSearchChange,
  onAddTask,
  activeProject,
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="taskboard__filters">

        <select
          className="taskboard__select"
          value={selectedLabel}
          onChange={(e) => onLabelChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Front-end">Front-end</option>
          <option value="Back-end">Back-end</option>
          <option value="Infra">Infra</option>
          <option value="Documentation">Documentation</option>
        </select>

        {/* zoek balk */}
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
          onClick={() =>
            activeProject && navigate({ to: `/projects/${activeProject}/backlog` })
          }
          disabled={!activeProject}
        >
          View backlog
        </button>
      </div>
    </>
  );
}