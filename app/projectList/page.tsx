import { Page } from "@/components/ProjectListPage";
import { getAllProjects } from "@/lib/prisma/project/allget";

export default async function ProjectList() {
  const projects = await getAllProjects();
  return (
    <div>
      <Page projects={projects} />
    </div>
  );
}