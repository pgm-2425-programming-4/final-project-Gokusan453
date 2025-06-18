//Backlog tabel met taken en status
export default function Backlog({ tasks }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Beschrijving</th>
            <th>Deadline</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.Title}</td>
              <td>{task.description || "-"}</td>
              <td>{task.task_status?.name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }