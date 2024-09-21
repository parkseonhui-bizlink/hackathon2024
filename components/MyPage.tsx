'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 仮のユーザーデータ
const user = {
  name: "山田 太郎",
  registeredProjects: [
    { id: 1, title: "Webアプリ開発", role: "フロントエンド", skills: ["React", "TypeScript"] },
    { id: 2, title: "モバイルアプリ設計", role: "デザイナー", skills: ["Figma", "UI/UX"] },
  ],
  appliedProjects: [
    { id: 3, title: "AI chatbot開発", role: "バックエンド", skills: ["Python", "TensorFlow"] },
    { id: 4, title: "ECサイトリニューアル", role: "フルスタック", skills: ["Vue.js", "PHP"] },
  ]
}

export function Page() {
  const [editingProject, setEditingProject] = useState<number | null>(null)
  const router = useRouter()

  const handleEdit = (projectId: number) => {
    setEditingProject(projectId)
    // 編集ページへの遷移ロジックをここに実装
    console.log(`Editing project ${projectId}`)
  }

  const handleDelete = (projectId: number) => {
    // 削除ロジックをここに実装
    console.log(`Deleting project ${projectId}`)
  }

  const handleCancelApplication = (projectId: number) => {
    // 応募キャンセルロジックをここに実装
    console.log(`Cancelling application for project ${projectId}`)
  }

  const handleViewDetails = (projectId: number) => {
    router.push(`/project/${projectId}`)
  }

  const ProjectCard = ({ project, isRegistered }: { project: any, isRegistered: boolean }) => (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-2">職種: {project.role}</p>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill: string) => (
              <span key={skill} className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          {isRegistered ? (
            <>
              <Button onClick={() => handleEdit(project.id)} className="bg-blue-500 hover:bg-blue-600 text-white">
                編集
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    削除
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>プロジェクトの削除確認</DialogTitle>
                  </DialogHeader>
                  <p className="py-4">本当にこのプロジェクトを削除しますか？</p>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => {}}>
                      キャンセル
                    </Button>
                    <Button onClick={() => handleDelete(project.id)} className="bg-red-500 hover:bg-red-600 text-white">
                      削除
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <Button onClick={() => handleViewDetails(project.id)} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                詳細を見る
              </Button>
              <Button onClick={() => handleCancelApplication(project.id)} className="bg-gray-500 hover:bg-gray-600 text-white">
                応募キャンセル
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">マイページ</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">ユーザー情報</h2>
            <p className="text-gray-600">名前: {user.name}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="registered" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="registered">募集したプロジェクト</TabsTrigger>
            <TabsTrigger value="applied">応募したプロジェクト</TabsTrigger>
          </TabsList>
          <TabsContent value="registered">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {user.registeredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} isRegistered={true} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="applied">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {user.appliedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} isRegistered={false} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}