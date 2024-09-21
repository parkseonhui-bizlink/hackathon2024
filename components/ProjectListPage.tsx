'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, User, Calendar } from 'lucide-react'

// 仮のプロジェクトデータ
const projects = [
  { id: 1, title: 'Webアプリ開発', area: '東京', role: 'フロントエンド', skills: ['React', 'TypeScript'], username: '山田太郎', date: '2024-07-01' },
  { id: 2, title: 'モバイルアプリデザイン', area: '大阪', role: 'デザイナー', skills: ['UI/UX', 'Figma'], username: '山田花子', date: '2024-08-01' },
  { id: 3, title: 'ECプラットフォーム', area: '福岡', role: 'バックエンド', skills: ['Node.js', 'MongoDB'], username: '山辺郎', date: '2024-09-01' },
  { id: 4, title: 'AIチャットボット', area: '札幌', role: '機械学習', skills: ['Python', 'TensorFlow'], username: '小崎', date: '2024-09-01' },
  { id: 5, title: 'ブロックチェーンウォレット', area: '名古屋', role: 'ブロックチェーン開発者', skills: ['Solidity', 'Web3.js'], username: '山うち', date: '2024-11-01' },
]

export function Page({ projects }: { projects: any }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const router = useRouter()

  const filteredProjects = projects.filter(project =>
    (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())))
    && (roleFilter === 'all' || project.role === roleFilter)
  )

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">プロジェクト一覧</h1>
          <Button
            onClick={() => router.push('/createProject')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            プロジェクト作成
          </Button>
        </div>

        <Card className="mb-6 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-row gap-4">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="職種で絞り込み" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべての職種</SelectItem>
                  <SelectItem value="フロントエンド">フロントエンド</SelectItem>
                  <SelectItem value="バックエンド">バックエンド</SelectItem>
                  <SelectItem value="デザイナー">デザイナー</SelectItem>
                  <SelectItem value="機械学習">機械学習</SelectItem>
                  <SelectItem value="ブロックチェーン開発者">ブロックチェーン開発者</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="プロジェクトやスキルを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="text-sm text-gray-600 mb-2">職種:
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map(category => (
                      <span key={category} className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">スキル:
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map(skill => (
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
                      {project.createdAt.toLocaleDateString()}
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
          ))}
        </div>
      </div>
    </div>
  )
}