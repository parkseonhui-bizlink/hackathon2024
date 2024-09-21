'use client';

import { useEffect, useState, useMemo } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, MinusCircle } from 'lucide-react';

const roleOptions = [
  'フロントエンド',
  'バックエンド',
  'デザイナー',
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

interface RoleSelection {
  role: string;
  count: string;
}

interface RoleSelection {
  role: string;
  count: string;
}

export function Page({
  projectCreated,
}: {
  projectCreated: boolean | undefined;
}) {
  const [title, setTitle] = useState('');
  const [roleSelections, setRoleSelections] = useState<RoleSelection[]>([{ role: '', count: '' }]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const router = useRouter();

  const availableRoles = useMemo(() => {
    const selectedRoles = roleSelections.map(selection => selection.role).filter(role => role !== '');
    return roleOptions.filter(role => !selectedRoles.includes(role));
  }, [roleSelections]);

  const handleRoleChange = (index: number, field: 'role' | 'count', value: string) => {
    const newSelections = [...roleSelections];
    newSelections[index][field] = value;
    setRoleSelections(newSelections);
  };

  const addRoleSelection = () => {
    setRoleSelections([...roleSelections, { role: '', count: '' }]);
  };

  const removeRoleSelection = (index: number) => {
    const newSelections = roleSelections.filter((_, i) => i !== index);
    setRoleSelections(newSelections);
  };

  const handleSubmit = () => {
    console.log({
      title,
      roleSelections,
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
              <Label>募集職種</Label>
              <div className="space-y-2 mt-1">
                {roleSelections.map((selection, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Select 
                      value={selection.role} 
                      onValueChange={(value) => handleRoleChange(index, 'role', value)}
                    >
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="職種を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {(selection.role ? [selection.role, ...availableRoles] : availableRoles).map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select 
                      value={selection.count} 
                      onValueChange={(value) => handleRoleChange(index, 'count', value)}
                    >
                      <SelectTrigger className="w-1/4">
                        <SelectValue placeholder="人数" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num}名</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {index === roleSelections.length - 1 ? (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={addRoleSelection}
                        disabled={availableRoles.length === 0}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="button" variant="outline" size="icon" onClick={() => removeRoleSelection(index)}>
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    )}
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
                    <p>募集職種と人数: 
                      {roleSelections.map(({ role, count }) => 
                        role && count ? `${role} ${count}名, ` : ''
                      ).join('').slice(0, -2) || '未設定'}
                    </p>
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