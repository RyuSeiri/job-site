// Job listings data
const jobListings = [
  {
    id: 1,
    title: "フロントエンドエンジニア",
    company: "テックスタートアップ株式会社",
    location: "東京都渋谷区",
    salary: "年収400万円〜800万円",
    type: "正社員",
    posted: "3日前",
    description: "React/Next.jsを使用したモダンなWebアプリケーション開発",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    prefecture: "東京都",
  },
  {
    id: 2,
    title: "バックエンドエンジニア",
    company: "グローバルIT企業",
    location: "大阪府大阪市",
    salary: "年収500万円〜900万円",
    type: "正社員",
    posted: "1週間前",
    description: "Node.js/Pythonを使用したAPI開発とインフラ構築",
    tags: ["Node.js", "Python", "AWS", "Docker"],
    prefecture: "大阪府",
  },
  {
    id: 3,
    title: "UI/UXデザイナー",
    company: "デザインスタジオ株式会社",
    location: "東京都新宿区",
    salary: "年収350万円〜600万円",
    type: "正社員",
    posted: "5日前",
    description: "ユーザー中心設計によるWebサービスのUI/UX設計",
    tags: ["Figma", "Adobe XD", "Sketch", "プロトタイピング"],
    prefecture: "東京都",
  },
  {
    id: 4,
    title: "データサイエンティスト",
    company: "AIテクノロジー株式会社",
    location: "神奈川県横浜市",
    salary: "年収600万円〜1000万円",
    type: "正社員",
    posted: "2日前",
    description: "機械学習モデルの開発とビッグデータ解析",
    tags: ["Python", "機械学習", "SQL", "TensorFlow"],
    prefecture: "神奈川県",
  },
  {
    id: 5,
    title: "プロダクトマネージャー",
    company: "スタートアップ企業",
    location: "リモート可",
    salary: "年収700万円〜1200万円",
    type: "正社員",
    posted: "1日前",
    description: "プロダクト戦略立案から開発チームとの連携まで",
    tags: ["プロダクト企画", "アジャイル", "データ分析", "チームマネジメント"],
    prefecture: "リモート可",
  },
  {
    id: 6,
    title: "Webマーケター",
    company: "マーケティング会社",
    location: "東京都港区",
    salary: "年収400万円〜700万円",
    type: "契約社員",
    posted: "4日前",
    description: "SEO/SEM、SNSマーケティング、コンテンツマーケティング",
    tags: ["SEO", "Google Analytics", "SNS運用", "コンテンツ制作"],
    prefecture: "東京都",
  },
];

let filteredJobs = [...jobListings];
let currentSort = "newest";

// Import Lucide icons library
const lucide = require("lucide");

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Render initial job listings
  renderJobListings();

  // Set up event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Search form
  document
    .getElementById("searchForm")
    .addEventListener("submit", handleSearch);

  // Filter checkboxes
  document
    .querySelectorAll(".employment-filter, .salary-filter, .location-filter")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", applyFilters);
    });

  // Clear filters button
  document
    .getElementById("clearFilters")
    .addEventListener("click", clearAllFilters);

  // Sort dropdown
  document.getElementById("sortSelect").addEventListener("change", handleSort);

  // Real-time search
  document
    .getElementById("keywordSearch")
    .addEventListener("input", applyFilters);
  document
    .getElementById("locationSearch")
    .addEventListener("input", applyFilters);
}

function handleSearch(e) {
  e.preventDefault();
  applyFilters();
}

function applyFilters() {
  const keyword = document.getElementById("keywordSearch").value.toLowerCase();
  const location = document
    .getElementById("locationSearch")
    .value.toLowerCase();

  const employmentTypes = Array.from(
    document.querySelectorAll(".employment-filter:checked")
  ).map((cb) => cb.value);
  const salaryRanges = Array.from(
    document.querySelectorAll(".salary-filter:checked")
  ).map((cb) => cb.value);
  const locations = Array.from(
    document.querySelectorAll(".location-filter:checked")
  ).map((cb) => cb.value);

  filteredJobs = jobListings.filter((job) => {
    // Keyword filter
    const matchesKeyword =
      !keyword ||
      job.title.toLowerCase().includes(keyword) ||
      job.company.toLowerCase().includes(keyword) ||
      job.description.toLowerCase().includes(keyword) ||
      job.tags.some((tag) => tag.toLowerCase().includes(keyword));

    // Location filter
    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location) ||
      job.prefecture.toLowerCase().includes(location);

    // Employment type filter
    const matchesEmployment =
      employmentTypes.length === 0 || employmentTypes.includes(job.type);

    // Salary filter (simplified)
    const matchesSalary =
      salaryRanges.length === 0 ||
      salaryRanges.some((range) => {
        if (range === "300-400")
          return (
            job.salary.includes("300") ||
            job.salary.includes("350") ||
            job.salary.includes("400")
          );
        if (range === "400-600")
          return (
            job.salary.includes("400") ||
            job.salary.includes("500") ||
            job.salary.includes("600")
          );
        if (range === "600-800")
          return (
            job.salary.includes("600") ||
            job.salary.includes("700") ||
            job.salary.includes("800")
          );
        if (range === "800+")
          return (
            job.salary.includes("800") ||
            job.salary.includes("900") ||
            job.salary.includes("1000") ||
            job.salary.includes("1200")
          );
        return false;
      });

    // Prefecture filter
    const matchesPrefecture =
      locations.length === 0 || locations.includes(job.prefecture);

    return (
      matchesKeyword &&
      matchesLocation &&
      matchesEmployment &&
      matchesSalary &&
      matchesPrefecture
    );
  });

  sortJobs();
  renderJobListings();
}

function clearAllFilters() {
  document.getElementById("keywordSearch").value = "";
  document.getElementById("locationSearch").value = "";
  document
    .querySelectorAll(".employment-filter, .salary-filter, .location-filter")
    .forEach((checkbox) => {
      checkbox.checked = false;
    });
  document.getElementById("sortSelect").value = "newest";
  currentSort = "newest";

  filteredJobs = [...jobListings];
  sortJobs();
  renderJobListings();
}

function handleSort(e) {
  currentSort = e.target.value;
  sortJobs();
  renderJobListings();
}

function sortJobs() {
  switch (currentSort) {
    case "salary":
      filteredJobs.sort((a, b) => {
        const salaryA = Number.parseInt(a.salary.match(/\d+/g)?.[0] || "0");
        const salaryB = Number.parseInt(b.salary.match(/\d+/g)?.[0] || "0");
        return salaryB - salaryA;
      });
      break;
    case "popular":
      // Simulate popularity sorting (in real app, this would be based on view counts, etc.)
      filteredJobs.sort(() => Math.random() - 0.5);
      break;
    case "newest":
    default:
      filteredJobs.sort((a, b) => {
        const daysA = getDaysFromPosted(a.posted);
        const daysB = getDaysFromPosted(b.posted);
        return daysA - daysB;
      });
      break;
  }
}

function getDaysFromPosted(posted) {
  if (posted.includes("日前")) return Number.parseInt(posted);
  if (posted.includes("週間前")) return Number.parseInt(posted) * 7;
  return 0;
}

function renderJobListings() {
  const container = document.getElementById("jobListings");
  const jobCount = document.getElementById("jobCount");

  jobCount.textContent = `${filteredJobs.length}件の求人が見つかりました`;

  if (filteredJobs.length === 0) {
    container.innerHTML = `
            <div class="text-center py-12">
                <div class="text-muted-foreground mb-4">
                    <i data-lucide="search" class="h-12 w-12 mx-auto mb-4"></i>
                    <p class="text-lg">条件に合う求人が見つかりませんでした</p>
                    <p class="text-sm">検索条件を変更してお試しください</p>
                </div>
            </div>
        `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filteredJobs
    .map(
      (job) => `
        <div class="bg-white rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
            <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div class="flex-1">
                    <div class="flex items-start justify-between mb-2">
                        <h3 class="text-xl font-semibold text-foreground hover:text-primary transition-colors cursor-pointer text-balance" onclick="viewJobDetail(${
                          job.id
                        })">
                            ${job.title}
                        </h3>
                        <span class="ml-2 px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full border border-border">
                            ${job.type}
                        </span>
                    </div>
                    
                    <h4 class="text-lg font-medium text-muted-foreground mb-3">${
                      job.company
                    }</h4>
                    
                    <p class="text-muted-foreground mb-4 leading-relaxed">${
                      job.description
                    }</p>
                    
                    <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div class="flex items-center gap-1">
                            <i data-lucide="map-pin" class="h-4 w-4"></i>
                            ${job.location}
                        </div>
                        <div class="flex items-center gap-1">
                            <i data-lucide="dollar-sign" class="h-4 w-4"></i>
                            ${job.salary}
                        </div>
                        <div class="flex items-center gap-1">
                            <i data-lucide="clock" class="h-4 w-4"></i>
                            ${job.posted}
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap gap-2">
                        ${job.tags
                          .map(
                            (tag) => `
                            <span class="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full border border-border">
                                ${tag}
                            </span>
                        `
                          )
                          .join("")}
                    </div>
                </div>
                
                <div class="flex flex-col gap-2 lg:ml-6">
                    <button onclick="viewJobDetail(${
                      job.id
                    })" class="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                        詳細を見る
                    </button>
                    <button class="border border-border bg-transparent px-6 py-2 rounded-md font-medium hover:bg-muted transition-colors whitespace-nowrap flex items-center justify-center gap-2">
                        <i data-lucide="heart" class="h-4 w-4"></i>
                        お気に入り
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  // Re-initialize Lucide icons for the new content
  lucide.createIcons();
}

function viewJobDetail(jobId) {
  // In a real application, you would navigate to the job detail page
  // For this demo, we'll just show an alert
  window.location.href = `job-detail.html?id=${jobId}`;
}

// Export functions for global access
window.viewJobDetail = viewJobDetail;
