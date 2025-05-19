import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { PaginatedTaskList } from "./paginated-task-list/paginated-task-list";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ margin: "2rem" }}>
        <PaginatedTaskList />
      </div>
    </QueryClientProvider>
  );
}

export default App;