import Link from "next/link";
import { CheckCircle, ArrowRight, Building2, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobById } from "@/lib/jobs";

interface SuccessPageProps {
  params: {
    id: string;
  };
}

export default function ApplicationSuccessPage({ params }: SuccessPageProps) {
  const jobId = Number.parseInt(params.id);
  const job = getJobById(jobId);

  if (!job) {
    return <div>求人が見つかりません</div>;
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
              <Link
                href="/"
                className="hover:text-primary-foreground/80 transition-colors"
              >
                求人検索
              </Link>
              <a
                href="#"
                className="hover:text-primary-foreground/80 transition-colors"
              >
                企業情報
              </a>
              <a
                href="#"
                className="hover:text-primary-foreground/80 transition-colors"
              >
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

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              応募完了
            </h1>
            <p className="text-xl text-muted-foreground">
              ご応募ありがとうございました
            </p>
          </div>

          {/* Job Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>応募した求人</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-balance">
                  {job.title}
                </h2>
                <p className="text-lg text-muted-foreground">{job.company}</p>
                <p className="text-sm text-muted-foreground">
                  応募ID: APP-{jobId}-{Date.now().toString().slice(-6)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>今後の流れ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 text-left">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">確認メール送信</h3>
                  <p className="text-sm text-muted-foreground">
                    応募確認メールを送信いたします（数分以内）
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">企業からの連絡</h3>
                  <p className="text-sm text-muted-foreground">
                    1週間以内に企業から選考に関するご連絡をいたします
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <CheckCircle className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">選考プロセス</h3>
                  <p className="text-sm text-muted-foreground">
                    書類選考→面接→最終選考の流れで進行いたします
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/applications">
              <Button size="lg" className="flex items-center gap-2">
                応募状況を確認
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="bg-transparent">
                他の求人を探す
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">お困りの際は</h3>
            <p className="text-sm text-muted-foreground">
              応募に関するご質問やお困りのことがございましたら、
              <br />
              サポートセンターまでお気軽にお問い合わせください。
            </p>
            <Button variant="outline" size="sm" className="mt-3 bg-transparent">
              サポートセンター
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
