"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, MapPin, Clock, DollarSign, Building2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { jobListings } from "@/lib/jobs"

export default function JobListingsPage() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([])
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")

  const filteredAndSortedJobs = useMemo(() => {
    const filtered = jobListings.filter((job) => {
      // Keyword search
      const keywordMatch =
        searchKeyword === "" ||
        job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.tags.some((tag) => tag.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        job.description.toLowerCase().includes(searchKeyword.toLowerCase())

      // Location search
      const locationMatch = searchLocation === "" || job.location.toLowerCase().includes(searchLocation.toLowerCase())

      // Job type filter
      const jobTypeMatch = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type)

      // Salary filter
      const salaryMatch =
        selectedSalaryRanges.length === 0 ||
        selectedSalaryRanges.some((range) => {
          switch (range) {
            case "300万円以上":
              return job.salaryMin >= 300
            case "500万円以上":
              return job.salaryMin >= 500
            case "800万円以上":
              return job.salaryMin >= 800
            default:
              return true
          }
        })

      // Prefecture filter
      const prefectureMatch = selectedPrefectures.length === 0 || selectedPrefectures.includes(job.prefecture)

      return keywordMatch && locationMatch && jobTypeMatch && salaryMatch && prefectureMatch
    })

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return a.postedDays - b.postedDays
        case "salary":
          return b.salaryMax - a.salaryMax
        case "popular":
          return a.id - b.id // Simple popularity based on ID
        default:
          return 0
      }
    })

    return filtered
  }, [searchKeyword, searchLocation, selectedJobTypes, selectedSalaryRanges, selectedPrefectures, sortBy])

  const toggleJobType = (type: string) => {
    setSelectedJobTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleSalaryRange = (range: string) => {
    setSelectedSalaryRanges((prev) => (prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]))
  }

  const togglePrefecture = (prefecture: string) => {
    setSelectedPrefectures((prev) =>
      prev.includes(prefecture) ? prev.filter((p) => p !== prefecture) : [...prev, prefecture],
    )
  }

  const handleSearch = () => {
    // Search is handled automatically by the useMemo hook
    // This function can be used for analytics or other side effects
    console.log("Search performed:", { searchKeyword, searchLocation })
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
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                求人検索
              </a>
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

      {/* Hero Section with Search */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">理想の仕事を見つけよう</h2>
            <p className="text-xl text-muted-foreground text-pretty">あなたのキャリアを次のレベルへ導く求人情報</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 p-6 bg-card rounded-lg shadow-sm border">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="職種、キーワードで検索"
                    className="pl-10 h-12"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="勤務地を入力"
                    className="pl-10 h-12"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              </div>
              <Button size="lg" className="h-12 px-8" onClick={handleSearch}>
                検索
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  絞り込み検索
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">雇用形態</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedJobTypes.includes("正社員")}
                        onChange={() => toggleJobType("正社員")}
                      />
                      <span className="text-sm">正社員</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedJobTypes.includes("契約社員")}
                        onChange={() => toggleJobType("契約社員")}
                      />
                      <span className="text-sm">契約社員</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedJobTypes.includes("派遣社員")}
                        onChange={() => toggleJobType("派遣社員")}
                      />
                      <span className="text-sm">派遣社員</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">年収</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedSalaryRanges.includes("300万円以上")}
                        onChange={() => toggleSalaryRange("300万円以上")}
                      />
                      <span className="text-sm">300万円以上</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedSalaryRanges.includes("500万円以上")}
                        onChange={() => toggleSalaryRange("500万円以上")}
                      />
                      <span className="text-sm">500万円以上</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedSalaryRanges.includes("800万円以上")}
                        onChange={() => toggleSalaryRange("800万円以上")}
                      />
                      <span className="text-sm">800万円以上</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">勤務地</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedPrefectures.includes("東京都")}
                        onChange={() => togglePrefecture("東京都")}
                      />
                      <span className="text-sm">東京都</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedPrefectures.includes("大阪府")}
                        onChange={() => togglePrefecture("大阪府")}
                      />
                      <span className="text-sm">大阪府</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedPrefectures.includes("リモート可")}
                        onChange={() => togglePrefecture("リモート可")}
                      />
                      <span className="text-sm">リモート可</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">求人一覧 ({filteredAndSortedJobs.length}件)</h3>
              <select
                className="px-3 py-2 border border-border rounded-md bg-background"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">新着順</option>
                <option value="salary">給与順</option>
                <option value="popular">人気順</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredAndSortedJobs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">条件に合う求人が見つかりませんでした。</p>
                    <p className="text-sm text-muted-foreground mt-2">検索条件を変更してお試しください。</p>
                  </CardContent>
                </Card>
              ) : (
                filteredAndSortedJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <Link href={`/jobs/${job.id}`}>
                              <h4 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                                {job.title}
                              </h4>
                            </Link>
                            <Badge variant="secondary" className="ml-2">
                              {job.type}
                            </Badge>
                          </div>

                          <p className="text-lg font-medium text-muted-foreground mb-2">{job.company}</p>

                          <p className="text-muted-foreground mb-3 leading-relaxed">{job.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                        </div>

                        <div className="flex flex-col gap-2 md:ml-4">
                          <Link href={`/jobs/${job.id}`}>
                            <Button className="w-full md:w-auto">詳細を見る</Button>
                          </Link>
                          <Button variant="outline" className="w-full md:w-auto bg-transparent">
                            お気に入り
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Pagination */}
            {filteredAndSortedJobs.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    前へ
                  </Button>
                  <Button variant="default" size="sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    次へ
                  </Button>
                </div>
              </div>
            )}
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
                  <a href="#" className="hover:text-foreground transition-colors">
                    求人検索
                  </a>
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
