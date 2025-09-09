"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Clock, CheckCircle, XCircle, Eye, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock application data
const applications = [
  {
    id: "APP-1-123456",
    jobId: 1,
    jobTitle: "フロントエンドエンジニア",
    company: "テックスタートアップ株式会社",
    appliedDate: "2024-01-15",
    status: "書類選考中",
    statusType: "pending" as const,
    lastUpdate: "2024-01-16",
    nextStep: "書類選考結果のご連絡（1週間以内）",
  },
  {
    id: "APP-2-789012",
    jobId: 2,
    jobTitle: "バックエンドエンジニア",
    company: "グローバルIT企業",
    appliedDate: "2024-01-10",
    status: "面接調整中",
    statusType: "interview" as const,
    lastUpdate: "2024-01-14",
    nextStep: "面接日程のご連絡",
  },
  {
    id: "APP-3-345678",
    jobId: 3,
    jobTitle: "UIUXデザイナー",
    company: "デザインエージェンシー",
    appliedDate: "2024-01-05",
    status: "選考通過",
    statusType: "passed" as const,
    lastUpdate: "2024-01-12",
    nextStep: "最終面接のご案内",
  },
  {
    id: "APP-4-901234",
    jobId: 4,
    jobTitle: "プロダクトマネージャー",
    company: "フィンテック企業",
    appliedDate: "2023-12-28",
    status: "不採用",
    statusType: "rejected" as const,
    lastUpdate: "2024-01-08",
    nextStep: "選考終了",
  },
]

const getStatusIcon = (statusType: string) => {
  switch (statusType) {
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "interview":
      return <Eye className="h-4 w-4 text-blue-500" />
    case "passed":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "rejected":
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

const getStatusColor = (statusType: string) => {
  switch (statusType) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "interview":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "passed":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredApplications = applications.filter((app) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return ["pending", "interview", "passed"].includes(app.statusType)
    if (activeTab === "completed") return ["rejected"].includes(app.statusType)
    return true
  })

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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">応募状況</h1>
          <p className="text-muted-foreground">あなたの応募した求人の選考状況を確認できます</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">総応募数</p>
                  <p className="text-2xl font-bold">{applications.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">選考中</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {applications.filter((app) => ["pending", "interview"].includes(app.statusType)).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">選考通過</p>
                  <p className="text-2xl font-bold text-green-600">
                    {applications.filter((app) => app.statusType === "passed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">選考終了</p>
                  <p className="text-2xl font-bold text-red-600">
                    {applications.filter((app) => app.statusType === "rejected").length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              応募一覧
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">すべて ({applications.length})</TabsTrigger>
                <TabsTrigger value="active">
                  選考中 (
                  {applications.filter((app) => ["pending", "interview", "passed"].includes(app.statusType)).length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  完了 ({applications.filter((app) => app.statusType === "rejected").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">該当する応募がありません</p>
                    <Link href="/">
                      <Button className="mt-4">求人を探す</Button>
                    </Link>
                  </div>
                ) : (
                  filteredApplications.map((application) => (
                    <Card key={application.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <Link href={`/jobs/${application.jobId}`}>
                                <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                                  {application.jobTitle}
                                </h3>
                              </Link>
                              <Badge className={`ml-2 ${getStatusColor(application.statusType)}`}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(application.statusType)}
                                  {application.status}
                                </div>
                              </Badge>
                            </div>

                            <p className="text-lg font-medium text-muted-foreground mb-3">{application.company}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                              <div>
                                <span className="font-medium">応募日:</span> {application.appliedDate}
                              </div>
                              <div>
                                <span className="font-medium">最終更新:</span> {application.lastUpdate}
                              </div>
                              <div className="md:col-span-2">
                                <span className="font-medium">次のステップ:</span> {application.nextStep}
                              </div>
                            </div>

                            <div className="text-xs text-muted-foreground">応募ID: {application.id}</div>
                          </div>

                          <div className="flex flex-col gap-2 md:ml-4">
                            <Link href={`/jobs/${application.jobId}`}>
                              <Button variant="outline" size="sm" className="w-full md:w-auto bg-transparent">
                                求人詳細
                              </Button>
                            </Link>
                            {application.statusType !== "rejected" && (
                              <Button variant="outline" size="sm" className="w-full md:w-auto bg-transparent">
                                企業に質問
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
