import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export type Project = {
  title: string
  description: string
  ownerId: number
  statusId: number
}

export const createProject = async (data: Project) => {
  const project = await prisma.project.create({
    data,
  })
  return project
}