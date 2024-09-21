import { prisma } from "./prisma";
import { ProjectCreateData } from "./type/project";

// model Project {
//     id           Int             @id @default(autoincrement())
//     title        String
//     description  String
//     ownerId      Int
//     owner        ProjectOwner[]
//     ProjectUser  ProjectUser[]
//     ProjectSkill ProjectSkill[]
//     statusId     Int
//     memberCount  Int
//     status       StatusOfProject @relation(fields: [statusId], references: [id], onDelete: Cascade)
//   }
  

export async function createProject(data: ProjectCreateData){
    await prisma.project.create({
        data:{
            title: data.title,
            description: data.description
        }
    })
}