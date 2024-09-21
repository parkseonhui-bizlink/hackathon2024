import { prisma } from "../prisma";

export async function getAllProjects() {
  const projects = await prisma.project.findMany({});
  return projects;
}
