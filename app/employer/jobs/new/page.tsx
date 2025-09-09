"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Building2, MapPin, DollarSign, Clock, Users, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewJobPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    company: "テックスタートアップ株式会社", // Pre-filled with company name
    location: "",
    prefecture: "",
    salaryMin: "",
    salaryMax: "",
    type: "",
    description: "",
    fullDescription: "",
    tags: "",
    workingHours: "",
    holidays: "",
    benefits: "",
    companySize: "",
    established: "",
    industry: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to employer dashboard
    router.push("/employer?success=job-created")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8" />
              <h1 className="text-2xl font-bold">JobSearch 企業管理</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-primary-foreground/80 transition-colors">
                求人サイト
              </Link>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                サポート
              </a>
              <Button variant="secondary" size="sm">
                ログアウト
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/employer" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            ダッシュボードに戻る
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">新しい求人を投稿</h1>
            <p className="text-muted-foreground">求人情報を入力して優秀な人材を募集しましょう</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  基本情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">職種名 *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="例: フロントエンドエンジニア"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">雇用形態 *</Label>
                    <Select onValueChange={(value) => handleSelectChange("type", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="雇用形態を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="正社員">正社員</SelectItem>
                        <SelectItem value="契約社員">契約社員</SelectItem>
                        <SelectItem value="派遣社員">派遣社員</SelectItem>
                        <SelectItem value="アルバイト・パート">アルバイト・パート</SelectItem>
                        <SelectItem value="業務委託">業務委託</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">勤務地 *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="例: 東京都渋谷区"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prefecture">都道府県 *</Label>
                    <Select onValueChange={(value) => handleSelectChange("prefecture", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="都道府県を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="東京都">東京都</SelectItem>
                        <SelectItem value="大阪府">大阪府</SelectItem>
                        <SelectItem value="神奈川県">神奈川県</SelectItem>
                        <SelectItem value="愛知県">愛知県</SelectItem>
                        <SelectItem value="福岡県">福岡県</SelectItem>
                        <SelectItem value="リモート可">リモート可</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="salaryMin">年収下限 (万円) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="salaryMin"
                        name="salaryMin"
                        type="number"
                        value={formData.salaryMin}
                        onChange={handleInputChange}
                        placeholder="例: 400"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salaryMax">年収上限 (万円) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="salaryMax"
                        name="salaryMax"
                        type="number"
                        value={formData.salaryMax}
                        onChange={handleInputChange}
                        placeholder="例: 800"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">必要スキル・技術 *</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="例: React, TypeScript, Next.js (カンマ区切り)"
                    required
                  />
                  <p className="text-xs text-muted-foreground">スキルや技術をカンマ区切りで入力してください</p>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>求人詳細</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">求人概要 *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="求人の概要を1-2行で簡潔に記載してください"
                    className="min-h-[80px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullDescription">詳細な仕事内容 *</Label>
                  <Textarea
                    id="fullDescription"
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    placeholder="仕事内容、必要なスキル、歓迎するスキル、働く環境などを詳しく記載してください"
                    className="min-h-[300px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Working Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  勤務条件
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="workingHours">勤務時間 *</Label>
                    <Input
                      id="workingHours"
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleInputChange}
                      placeholder="例: 9:00-18:00（フレックスタイム制）"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="holidays">休日・休暇 *</Label>
                    <Input
                      id="holidays"
                      name="holidays"
                      value={formData.holidays}
                      onChange={handleInputChange}
                      placeholder="例: 土日祝、年末年始、有給休暇"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">福利厚生</Label>
                  <Textarea
                    id="benefits"
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="例: 社会保険完備, 交通費支給, リモートワーク可 (カンマ区切り)"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  企業情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companySize">従業員数</Label>
                    <Input
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      placeholder="例: 50名"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="established">設立年</Label>
                    <Input
                      id="established"
                      name="established"
                      value={formData.established}
                      onChange={handleInputChange}
                      placeholder="例: 2020年"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">業界</Label>
                    <Input
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      placeholder="例: IT・インターネット"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button type="submit" size="lg" className="flex-1 flex items-center gap-2" disabled={isSubmitting}>
                <Save className="h-4 w-4" />
                {isSubmitting ? "投稿中..." : "求人を投稿する"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.back()}
                className="bg-transparent"
              >
                キャンセル
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
