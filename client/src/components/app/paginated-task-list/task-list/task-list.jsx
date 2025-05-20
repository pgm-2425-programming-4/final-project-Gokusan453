export function TaskList({ tasks }) {
    
    return (
        <table>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.Title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
  }