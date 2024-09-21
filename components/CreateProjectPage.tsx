'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const roles = [
  '企画',
  'デザイナー',
  'フロントエンド',
  'バックエンド',
  'その他',
];
const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Vue.js',
  'Angular',
  'Node.js',
  'Python',
  'Java',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Swift',
  'Kotlin',
  'Figma',
  'Sketch',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
];

export function Page({
  projectCreated,
}: {
  projectCreated: boolean | undefined;
}) {
  const [title, setTitle] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    // ここでプロジェクトの作成処理を行う
    console.log({
      title,
      teamSize,
      selectedRoles,
      selectedSkills,
      description,
    });
    const searchParams = new URLSearchParams();
    searchParams.set('title', title);
    searchParams.set('teamSize', teamSize);
    searchParams.set('selectedRoles', JSON.stringify(selectedRoles));
    searchParams.set('selectedSkills', JSON.stringify(selectedSkills));
    searchParams.set('description', description);
    router.push(`/createProject?${searchParams.toString()}`);
  };

  useEffect(() => {
    const sleep = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    if (projectCreated === false) {
      alert('プロジェクトの作成に失敗しました');
    } else if (projectCreated === true) {
      alert('プロジェクトの作成に成功しました');
      sleep();
      router.push('/projectList');
    }
  }, [projectCreated, router]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              プロジェクト作成
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">プロジェクトタイトル</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="teamSize">人員数</Label>
              <Input
                id="teamSize"
                type="number"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>募集職種</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {roles.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={role}
                      checked={selectedRoles.includes(role)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRoles([...selectedRoles, role]);
                        } else {
                          setSelectedRoles(
                            selectedRoles.filter((r) => r !== role),
                          );
                        }
                      }}
                    />
                    <Label htmlFor={role}>{role}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>募集技術</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSkills([...selectedSkills, skill]);
                        } else {
                          setSelectedSkills(
                            selectedSkills.filter((s) => s !== skill),
                          );
                        }
                      }}
                    />
                    <Label htmlFor={skill}>{skill}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="description">プロジェクト詳細</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
                rows={5}
                placeholder="プロジェクトの詳細を入力してください..."
              />
            </div>

            <div className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">プレビュー</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] bg-white">
                  <DialogHeader>
                    <DialogTitle>プロジェクト概要プレビュー</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">
                      {title || 'プロジェクトタイトル'}
                    </h3>
                    <p>人員数: {teamSize || '未設定'}</p>
                    <p>募集職種: {selectedRoles.join(', ') || '未設定'}</p>
                    <p>募集技術: {selectedSkills.join(', ') || '未設定'}</p>
                    <div className="mt-2">
                      <h4 className="font-semibold">プロジェクト詳細:</h4>
                      <p className="whitespace-pre-wrap">
                        {description || '未入力'}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                プロジェクトを作成
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
