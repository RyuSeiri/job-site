"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Plus, Users, Eye, Clock, TrendingUp, Calendar, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock employer data
const employerJobs = [
  {
    id: 1,
    title: "フロントエンドエンジニア",
    status: "active",
    posted: "2024-01-10",
    applications: 15,
    views: 234,
    newApplications: 3,
  },
  {
    id: 2,
    title: "バックエンドエンジニア",
    status: "active",
    posted: "2024-01-08",
    applications: 22,
    views: 189,
    newApplications: 5,
  },
  {
    id: 3,
    title: "プロダクトマネージャー",
    status: "paused",
    posted: "2024-01-05",
    applications: 8,
    views: 156,
    newApplications: 0,
  },
  {
    id: 4,
    title: "データサイエンティスト",
    status: "closed",
    posted: "2023-12-20",
    applications: 31,
    views: 445,
    newApplications: 0,
  },
]

const recentApplications = [
  {
    id: "APP-001",
    jobTitle: "フロントエンドエンジニア",
    candidateName: "田中 太郎",
    appliedDate: "2024-01-16",
    status: "new",
    experience: "3年",
  },
  {
    id: "APP-002",
    jobTitle: "バックエンドエンジニア",
    candidateName: "佐藤 花子",
    appliedDate: "2024-01-15",
    status: "reviewing",
    experience: "5年",
  },
  {
    id: "APP-003",
    jobTitle: "フロントエンドエンジニア",
    candidateName: "鈴木 次郎",
    appliedDate: "2024-01-14",
    status: "interview",
    experience: "2年",
  },
  {
    id: "APP-004",
    jobTitle: "バックエンドエンジニア",
    candidateName: "高橋 美咲",
    appliedDate: "2024-01-13",
    status: "new",
    experience: "4年",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "paused":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "closed":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "new":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "reviewing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "interview":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "掲載中"
    case "paused":
      return "一時停止"
    case "closed":
      return "終了"
    case "new":
      return "新規"
    case "reviewing":
      return "書類選考中"
    case "interview":
      return "面接調整中"
    default:
      return status
  }
}

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const totalApplications = employerJobs.reduce((sum, job) => sum + job.applications, 0)
  const totalViews = employerJobs.reduce((sum, job) => sum + job.views, 0)
  const newApplicationsCount = employerJobs.reduce((sum, job) => sum + job.newApplications, 0)
  const activeJobsCount = employerJobs.filter((job) => job.status === "active").length

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
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">採用管理ダッシュボード</h1>
            <p className="text-muted-foreground">求人の管理と応募者の選考を効率的に行えます</p>
          </div>
          <Link href="/employer/jobs/new">
            <Button size="lg" className="flex items-center gap-2 mt-4 md:mt-0">
              <Plus className="h-4 w-4" />
              新しい求人を投稿
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">掲載中の求人</p>
                  <p className="text-3xl font-bold text-primary">{activeJobsCount}</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">総応募数</p>
                  <p className="text-3xl font-bold text-blue-600">{totalApplications}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">新規応募</p>
                  <p className="text-3xl font-bold text-green-600">{newApplicationsCount}</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">総閲覧数</p>
                  <p className="text-3xl font-bold text-purple-600">{totalViews}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="jobs">求人管理</TabsTrigger>
            <TabsTrigger value="applications">応募者管理</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    最新の応募
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentApplications.slice(0, 4).map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{application.candidateName}</h4>
                        <p className="text-sm text-muted-foreground">{application.jobTitle}</p>
                        <p className="text-xs text-muted-foreground">経験: {application.experience}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`mb-1 ${getStatusColor(application.status)}`}>
                          {getStatusText(application.status)}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{application.appliedDate}</p>
                      </div>
                    </div>
                  ))}
                  <Link href="/employer/applications">
                    <Button variant="outline" className="w-full bg-transparent">
                      すべての応募を見る
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Job Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    求人パフォーマンス
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {employerJobs.slice(0, 4).map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{job.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {job.applications}件
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {job.views}回
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`mb-1 ${getStatusColor(job.status)}`}>{getStatusText(job.status)}</Badge>
                        {job.newApplications > 0 && (
                          <p className="text-xs text-green-600 font-medium">新規 {job.newApplications}件</p>
                        )}
                      </div>
                    </div>
                  ))}
                  <Link href="/employer/jobs">
                    <Button variant="outline" className="w-full bg-transparent">
                      すべての求人を管理
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">求人管理</h2>
              <Link href="/employer/jobs/new">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  新規投稿
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {employerJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                          <Badge className={`ml-2 ${getStatusColor(job.status)}`}>{getStatusText(job.status)}</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            投稿日: {job.posted}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            応募: {job.applications}件
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            閲覧: {job.views}回
                          </div>
                          {job.newApplications > 0 && (
                            <div className="flex items-center gap-1 text-green-600 font-medium">
                              <Clock className="h-4 w-4" />
                              新規: {job.newApplications}件
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link href={`/jobs/${job.id}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            求人を見る
                          </Button>
                        </Link>
                        <Link href={`/employer/jobs/${job.id}/edit`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            編集
                          </Button>
                        </Link>
                        <Link href={`/employer/jobs/${job.id}/applications`}>
                          <Button size="sm">応募者を見る</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">応募者管理</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  フィルター
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  エクスポート
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {recentApplications.map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold">{application.candidateName}</h3>
                          <Badge className={`ml-2 ${getStatusColor(application.status)}`}>
                            {getStatusText(application.status)}
                          </Badge>
                        </div>

                        <p className="text-lg text-muted-foreground mb-2">{application.jobTitle}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            応募日: {application.appliedDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            経験: {application.experience}
                          </div>
                          <div>応募ID: {application.id}</div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          履歴書を見る
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          メッセージ
                        </Button>
                        {application.status === "new" && <Button size="sm">選考開始</Button>}
                        {application.status === "reviewing" && <Button size="sm">面接設定</Button>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
