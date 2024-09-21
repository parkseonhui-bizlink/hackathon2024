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

export type ProjectCreateData = {
    id: number,
    title: string,
    description: string,
    ownerId: number,
    status: string,
    memberCount: number
}


