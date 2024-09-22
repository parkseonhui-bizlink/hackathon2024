import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 新しいコンポーネントの追加
export function ProjectCard({ project }: { project: any }) {
  const router = useRouter()
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="text-sm text-gray-600 mb-2">職種:
          {/* <div className="flex flex-wrap gap-2">
            {project.categories.map((category: string) => (
              <span key={category} className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {category}
              </span>
            ))}
          </div> */}
        </div>
        <div className="text-sm text-gray-600 mb-2">スキル:
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill: string) => (
              <span key={skill} className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          {/* ユーザー名と日付 */}
          <div className="flex flex-col gap-1 w-[50%]">
            <div className="flex items-center text-sm text-gray-500">
              <User className="w-4 h-4 mr-1 text-purple-600" />
              {project.owner_name}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1 text-purple-600" />
              {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>
          <Button
            className="w-[50%] py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            onClick={() => router.push(`/project/${project.id}`)}
          >
            詳細を見る
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}