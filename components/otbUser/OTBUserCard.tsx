import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"
import { useRouter } from 'next/navigation'

export function OTBUserCard({ user }: { user: any }) {
  const router = useRouter()
  
  return (
    <Card 
      className={`hover:shadow-lg transition-shadow duration-300 relative ${
        user.skills.includes('人材プロ') ? 'border border-[#9333EA]' : ''
      }`}
    >
      <CardContent className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 absolute top-2 right-2">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>チャットする</DropdownMenuItem>
            <DropdownMenuItem>連絡する</DropdownMenuItem>
            <DropdownMenuItem>ブロックする</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`/placeholder-user-${user.id}.jpg`} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.status}</p>
          </div>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2 w-max">
            {user.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                  skill === '人材プロ' || skill === 'フロントエンド'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                #{skill}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}