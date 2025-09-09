import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Users,
  Calendar,
  Briefcase,
  Heart,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getJobById, getRelatedJobs } from "@/lib/jobs"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const jobId = Number.parseInt(params.id)
  const job = getJobById(jobId)
  const relatedJobs = getRelatedJobs(jobId)

  if (!job) {
    notFound()
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
          <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            求人一覧に戻る
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h1 className="text-3xl font-bold text-foreground text-balance">{job.title}</h1>
                      <Badge variant="secondary" className="ml-2">
                        {job.type}
                      </Badge>
                    </div>
                    <h2 className="text-xl font-semibold text-muted-foreground mb-4">{job.company}</h2>

                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.posted}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/jobs/${jobId}/apply`}>
                    <Button size="lg" className="flex-1 sm:flex-none w-full sm:w-auto">
                      この求人に応募する
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="flex items-center gap-2 bg-transparent">
                    <Heart className="h-4 w-4" />
                    お気に入り
                  </Button>
                  <Button variant="outline" size="lg" className="flex items-center gap-2 bg-transparent">
                    <Share2 className="h-4 w-4" />
                    シェア
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>求人詳細</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-foreground leading-relaxed">{job.fullDescription}</div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>企業情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">会社名:</span>
                    <span className="font-medium">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">従業員数:</span>
                    <span className="font-medium">{job.companySize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">設立:</span>
                    <span className="font-medium">{job.established}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">業界:</span>
                    <span className="font-medium">{job.industry}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>関連する求人</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedJobs.map((relatedJob) => (
                    <div key={relatedJob.id}>
                      <Link
                        href={`/jobs/${relatedJob.id}`}
                        className="block hover:bg-muted/50 p-4 rounded-lg transition-colors"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground hover:text-primary transition-colors">
                              {relatedJob.title}
                            </h4>
                            <p className="text-muted-foreground text-sm">{relatedJob.company}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {relatedJob.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {relatedJob.salary}
                              </span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {relatedJob.type}
                          </Badge>
                        </div>
                      </Link>
                      {relatedJob.id !== relatedJobs[relatedJobs.length - 1].id && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Apply */}
            <Card>
              <CardHeader>
                <CardTitle>応募情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href={`/jobs/${jobId}/apply`}>
                  <Button className="w-full" size="lg">
                    この求人に応募する
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent">
                  企業に質問する
                </Button>
                <div className="text-xs text-muted-foreground text-center">応募には会員登録が必要です</div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>勤務条件</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">勤務時間</h4>
                  <p className="text-sm">{job.workingHours}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">休日・休暇</h4>
                  <p className="text-sm">{job.holidays}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">福利厚生</h4>
                  <div className="space-y-1">
                    {job.benefits.map((benefit) => (
                      <div key={benefit} className="text-sm flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Stats */}
            <Card>
              <CardHeader>
                <CardTitle>企業データ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">従業員数</span>
                  <span className="text-sm font-medium">{job.companySize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">設立年</span>
                  <span className="text-sm font-medium">{job.established}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">業界</span>
                  <span className="text-sm font-medium">{job.industry}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-bold">JobSearch</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">理想の転職を実現するための求人情報サイト</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">求職者向け</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    求人検索
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    転職ガイド
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    履歴書作成
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">企業向け</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    求人掲載
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    採用支援
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    料金プラン
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">サポート</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    お問い合わせ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    利用規約
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    プライバシーポリシー
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 JobSearch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
