'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search } from 'lucide-react'

// 仮のプロジェクトデータ
const projects = [
  { id: 1, title: 'Webアプリ開発', area: '東京', role: 'フロントエンド', skills: ['React', 'TypeScript'] },
  { id: 2, title: 'モバイルアプリデザイン', area: '大阪', role: 'デザイナー', skills: ['UI/UX', 'Figma'] },
  { id: 3, title: 'ECプラットフォーム', area: '福岡', role: 'バックエンド', skills: ['Node.js', 'MongoDB'] },
  { id: 4, title: 'AIチャットボット', area: '札幌', role: '機械学習', skills: ['Python', 'TensorFlow'] },
  { id: 5, title: 'ブロックチェーンウォレット', area: '名古屋', role: 'ブロックチェーン開発者', skills: ['Solidity', 'Web3.js'] },
]

export function Page({ projects }: { projects: any }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [areaFilter, setAreaFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const router = useRouter()

  const filteredProjects = projects.filter(project =>
    (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.Skill.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (areaFilter === 'all' || project.area === areaFilter) &&
    (roleFilter === 'all' || project.role === roleFilter)
  )

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">プロジェクト一覧</h1>
          {/* buttonをLinkに修正します */}
          <Button
            onClick={() => router.push('/createProject')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            プロジェクト作成
          </Button>

          {/* <Link href="/createProject" className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            プロジェクト作成
          </Link> */}
        </header>

        <Card className="mb-6 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="プロジェクトやスキルを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="エリアで絞り込み" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべてのエリア</SelectItem>
                  <SelectItem value="東京">東京</SelectItem>
                  <SelectItem value="大阪">大阪</SelectItem>
                  <SelectItem value="福岡">福岡</SelectItem>
                  <SelectItem value="札幌">札幌</SelectItem>
                  <SelectItem value="名古屋">名古屋</SelectItem>
                </SelectContent>
              </Select>
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
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">エリア: {project.area}</p>
                <p className="text-sm text-gray-600 mb-2">職種:
                  {project.Category.map(category => (
                    <span key={category} className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {category}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-gray-600 mb-2">スキル:
                  {project.Skill.map(skill => (
                    <span key={skill} className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </p>
                <Button
                  className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => router.push(`/project/${project.id}`)}
                >
                  詳細を見る
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}