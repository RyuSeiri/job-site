;

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Users,
  Download,
  Search,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ApplicationsPageProps {
  params: {
    id: string;
  };
}

// Mock applications data for a specific job
const jobApplications = [
  {
    id: "APP-001",
    candidateName: "田中 太郎",
    email: "tanaka@example.com",
    phone: "090-1234-5678",
    appliedDate: "2024-01-16",
    status: "new",
    experience: "3年",
    skills: ["React", "TypeScript", "Node.js"],
    coverLetter:
      "貴社のフロントエンド開発に興味があり、これまでの経験を活かして貢献したいと考えています。",
    resumeUrl: "#",
  },
  {
    id: "APP-002",
    candidateName: "佐藤 花子",
    email: "sato@example.com",
    phone: "090-2345-6789",
    appliedDate: "2024-01-15",
    status: "reviewing",
    experience: "5年",
    skills: ["React", "Vue.js", "TypeScript", "AWS"],
    coverLetter:
      "フロントエンド開発の経験を活かし、ユーザー体験の向上に貢献したいです。",
    resumeUrl: "#",
  },
  {
    id: "APP-003",
    candidateName: "鈴木 次郎",
    email: "suzuki@example.com",
    phone: "090-3456-7890",
    appliedDate: "2024-01-14",
    status: "interview",
    experience: "2年",
    skills: ["React", "JavaScript", "CSS"],
    coverLetter: "新しい技術への学習意欲が高く、チーム開発での経験もあります。",
    resumeUrl: "#",
  },
  {
    id: "APP-004",
    candidateName: "高橋 美咲",
    email: "takahashi@example.com",
    phone: "090-4567-8901",
    appliedDate: "2024-01-13",
    status: "passed",
    experience: "4年",
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    coverLetter:
      "モダンな技術スタックでの開発経験があり、即戦力として貢献できます。",
    resumeUrl: "#",
  },
  {
    id: "APP-005",
    candidateName: "山田 健太",
    email: "yamada@example.com",
    phone: "090-5678-9012",
    appliedDate: "2024-01-12",
    status: "rejected",
    experience: "1年",
    skills: ["HTML", "CSS", "JavaScript"],
    coverLetter:
      "フロントエンド開発を学習中で、実務経験を積みたいと考えています。",
    resumeUrl: "#",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "reviewing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "interview":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "passed":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "new":
      return "新規";
    case "reviewing":
      return "書類選考中";
    case "interview":
      return "面接調整中";
    case "passed":
      return "選考通過";
    case "rejected":
      return "不採用";
    default:
      return status;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "new":
      return <Clock className="h-4 w-4" />;
    case "reviewing":
      return <Eye className="h-4 w-4" />;
    case "interview":
      return <MessageSquare className="h-4 w-4" />;
    case "passed":
      return <CheckCircle className="h-4 w-4" />;
    case "rejected":
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export default function JobApplicationsPage({ params }: ApplicationsPageProps) {
  const jobId = params.id;
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredApplications = jobApplications.filter((app) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "new" && app.status === "new") ||
      (activeTab === "reviewing" &&
        ["reviewing", "interview"].includes(app.status)) ||
      (activeTab === "completed" &&
        ["passed", "rejected"].includes(app.status));

    const matchesSearch =
      searchTerm === "" ||
      app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesTab && matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: jobApplications.length,
    new: jobApplications.filter((app) => app.status === "new").length,
    reviewing: jobApplications.filter((app) =>
      ["reviewing", "interview"].includes(app.status)
    ).length,
    completed: jobApplications.filter((app) =>
      ["passed", "rejected"].includes(app.status)
    ).length,
  };

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
              <Link
                href="/"
                className="hover:text-primary-foreground/80 transition-colors"
              >
                求人サイト
              </Link>
              <a
                href="#"
                className="hover:text-primary-foreground/80 transition-colors"
              >
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
          <Link
            href="/employer"
            className="hover:text-foreground transition-colors"
          >
            ダッシュボード
          </Link>
          <span>/</span>
          <Link
            href="/employer"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            求人管理
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              応募者管理
            </h1>
            <p className="text-muted-foreground">
              フロントエンドエンジニアの応募者一覧
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              CSV出力
            </Button>
            <Link href={`/jobs/${jobId}`}>
              <Button variant="outline" className="bg-transparent">
                求人詳細を見る
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">総応募数</p>
                  <p className="text-2xl font-bold">{statusCounts.all}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">新規応募</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {statusCounts.new}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">選考中</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {statusCounts.reviewing}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">選考完了</p>
                  <p className="text-2xl font-bold text-green-600">
                    {statusCounts.completed}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="応募者名またはメールアドレスで検索"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="ステータスで絞り込み" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="new">新規</SelectItem>
                  <SelectItem value="reviewing">書類選考中</SelectItem>
                  <SelectItem value="interview">面接調整中</SelectItem>
                  <SelectItem value="passed">選考通過</SelectItem>
                  <SelectItem value="rejected">不採用</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              応募者一覧
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">
                  すべて ({statusCounts.all})
                </TabsTrigger>
                <TabsTrigger value="new">新規 ({statusCounts.new})</TabsTrigger>
                <TabsTrigger value="reviewing">
                  選考中 ({statusCounts.reviewing})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  完了 ({statusCounts.completed})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      該当する応募者がいません
                    </p>
                  </div>
                ) : (
                  filteredApplications.map((application) => (
                    <Card
                      key={application.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl font-semibold text-foreground">
                                  {application.candidateName}
                                </h3>
                                <p className="text-muted-foreground">
                                  {application.email}
                                </p>
                              </div>
                              <Badge
                                className={`${getStatusColor(
                                  application.status
                                )}`}
                              >
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(application.status)}
                                  {getStatusText(application.status)}
                                </div>
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="text-sm">
                                <span className="text-muted-foreground">
                                  応募日:
                                </span>{" "}
                                {application.appliedDate}
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">
                                  経験年数:
                                </span>{" "}
                                {application.experience}
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">
                                  電話番号:
                                </span>{" "}
                                {application.phone}
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">
                                  応募ID:
                                </span>{" "}
                                {application.id}
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm text-muted-foreground mb-2">
                                スキル:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {application.skills.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm text-muted-foreground mb-2">
                                志望動機:
                              </p>
                              <p className="text-sm leading-relaxed">
                                {application.coverLetter}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 lg:ml-4 lg:w-48">
                            <Button size="sm" className="w-full">
                              履歴書を見る
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full bg-transparent"
                            >
                              メッセージ送信
                            </Button>
                            {application.status === "new" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full bg-transparent"
                              >
                                書類選考開始
                              </Button>
                            )}
                            {application.status === "reviewing" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full bg-transparent"
                              >
                                面接設定
                              </Button>
                            )}
                            {["new", "reviewing", "interview"].includes(
                              application.status
                            ) && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                >
                                  通過
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                >
                                  不採用
                                </Button>
                              </div>
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
  );
}
