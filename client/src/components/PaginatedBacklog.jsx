import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_URL, API_TOKEN } from "../constants/constants";
import Backlog from "./Backlog";
import { Pagination } from "./Pagination";

export function PaginatedBacklog({ projectId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["backlogTasks", projectId, currentPage, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/tasks?filters[project][Name][$eq]=${projectId}&populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error(
          `Failed to fetch tasks: ${res.status} ${res.statusText}`
        );
      }
      return res.json();
    },
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading tasks: {error.message}</p>;

  const tasks = data?.data || [];
  const pageCount = data?.meta?.pagination?.pageCount || 1;

  return (
    <>
      <h2>Backlog for Project {projectId}</h2>
      <Backlog tasks={tasks} />
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </>
  );
}