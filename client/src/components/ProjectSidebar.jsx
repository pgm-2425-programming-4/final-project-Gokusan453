import { Link, useLocation } from "@tanstack/react-router";

export function ProjectSidebar({ projects, onProjectSelect }) {
  const location = useLocation();

  return (
    <nav>
      <Link
        className={location.pathname === "/" ? "ProjectSidebar__item active" : "ProjectSidebar__item"}
        to="/">
        Home
      </Link>

      <Link
        className={location.pathname === "/about" ? "ProjectSidebar__item active" : "ProjectSidebar__item"}
        to="/about">
        About
      </Link>

      <h2 className="ProjectSidebar__title">PROJECTS</h2>
      <ul className="ProjectSidebar__list">
        {projects.map((project) => {
          const isActive = location.pathname === `/projects/${project}`;
          return (
            <li key={project}>
              <Link
                className={"ProjectSidebar__item" + (isActive ? " active" : "")}
                to={`/projects/${project}`}
                onClick={() => onProjectSelect(project)}
              >
                {project}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}