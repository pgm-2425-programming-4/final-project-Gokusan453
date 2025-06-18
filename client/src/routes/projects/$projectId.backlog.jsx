import { createFileRoute } from "@tanstack/react-router";
import BacklogPage from "../../pages/BacklogPage";

export const Route = createFileRoute("backlog")({
  component: BacklogPage,
});