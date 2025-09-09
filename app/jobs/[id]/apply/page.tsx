"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Upload, FileText, User, Mail, Phone, MapPin, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { getJobById } from "@/lib/jobs"

interface ApplyPageProps {
  params: {
    id: string
  }
}

export default function ApplyPage({ params }: ApplyPageProps) {
  const router = useRouter()
  const jobId = Number.parseInt(params.id)
  const job = getJobById(jobId)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    coverLetter: "",
    experience: "",
    motivation: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  if (!job) {
    return <div>求人が見つかりません</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to success page
    router.push(`/jobs/${jobId}/apply/success`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8" />
              <h1 className="text-2xl font-bold">JobSearch</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-primary-foreground/80 transition-colors">
                求人検索
              </Link>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                企業情報
              </a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                転職ガイド
              </a>
              <Button variant="secondary" size="sm">
                ログイン
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                会員登録
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            求人一覧
          </Link>
          <span>/</span>
          <Link href={`/jobs/${jobId}`} className="hover:text-foreground transition-colors">
            求人詳細
          </Link>
          <span>/</span>
          <span className="text-foreground">応募</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  求人応募フォーム
                </CardTitle>
                <p className="text-muted-foreground">以下の情報を入力して応募してください。すべての項目は必須です。</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      基本情報
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">姓 *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="山田"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">名 *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="太郎"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">メールアドレス *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@email.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">電話番号 *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="090-1234-5678"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">住所 *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="東京都渋谷区..."
                          className="pl-10 min-h-[80px]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      履歴書・職務経歴書
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="resume">履歴書ファイル *</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                          required
                        />
                        <label htmlFor="resume" className="cursor-pointer">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {resumeFile ? resumeFile.name : "PDFまたはWordファイルをアップロード"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">最大サイズ: 10MB</p>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Experience and Motivation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">経験・志望動機</h3>

                    <div className="space-y-2">
                      <Label htmlFor="experience">関連する経験・スキル *</Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="これまでの経験やスキルについて詳しく記載してください..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">志望動機 *</Label>
                      <Textarea
                        id="motivation"
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        placeholder="なぜこの職種・企業を志望するのか記載してください..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverLetter">その他・自己PR</Label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="その他アピールしたいことがあれば記載してください..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? "応募中..." : "応募する"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => router.back()}
                      className="bg-transparent"
                    >
                      戻る
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Job Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>応募する求人</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-balance">{job.title}</h3>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {job.salary}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <Link href={`/jobs/${jobId}`}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      求人詳細を見る
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">応募前の確認事項</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <p>応募後、企業から連絡があります</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <p>履歴書は必ずPDFまたはWord形式でアップロードしてください</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <p>応募内容は後から変更できません</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2" />
                  <p>応募状況はマイページで確認できます</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
