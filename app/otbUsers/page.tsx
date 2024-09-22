import { Page } from "@/components/OTBUserPage"
import { getAllUser } from "@/lib/prisma/user/query"

export default async function OTBUserPage() {
  const users = await getAllUser();
  console.log(users);
  return (
    <div>
      <Page users={users} />
    </div>
  )
}