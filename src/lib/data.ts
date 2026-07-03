export const revenueSparkline = [
  { month: "Jan", value: 32 },
  { month: "Feb", value: 38 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 44 },
  { month: "May", value: 41 },
  { month: "Jun", value: 52 },
]

export const enrollmentTrend = [
  { month: "Jan", enrollments: 420, completions: 210 },
  { month: "Feb", enrollments: 510, completions: 260 },
  { month: "Mar", enrollments: 480, completions: 300 },
  { month: "Apr", enrollments: 620, completions: 340 },
  { month: "May", enrollments: 700, completions: 410 },
  { month: "Jun", enrollments: 760, completions: 480 },
]

export type Activity = {
  id: string
  name: string
  initials: string
  action: string
  target: string
  time: string
}

export const recentActivity: Activity[] = [
  {
    id: "1",
    name: "Budi Santoso",
    initials: "BS",
    action: "enrolled in",
    target: "Advanced React Patterns",
    time: "2 min ago",
  },
  {
    id: "2",
    name: "Siti Rahayu",
    initials: "SR",
    action: "completed",
    target: "UI/UX Fundamentals",
    time: "18 min ago",
  },
  {
    id: "3",
    name: "Andi Wijaya",
    initials: "AW",
    action: "submitted a review for",
    target: "Node.js Bootcamp",
    time: "1 hour ago",
  },
  {
    id: "4",
    name: "Maya Putri",
    initials: "MP",
    action: "enrolled in",
    target: "Data Science with Python",
    time: "3 hours ago",
  },
  {
    id: "5",
    name: "Rizky Pratama",
    initials: "RP",
    action: "requested a refund for",
    target: "Flutter Masterclass",
    time: "5 hours ago",
  },
]

export type UserRole = "student" | "teacher"
export type UserStatus = "active" | "suspended"

export type ManagedUser = {
  id: string
  name: string
  initials: string
  email: string
  role: UserRole
  status: UserStatus
  joined: string
  lastActive: string
  // student-specific
  enrolled?: number
  completed?: number
  // teacher-specific
  courses?: number
  students?: number
  rating?: number
  expertise?: string
}

export const students: ManagedUser[] = [
  {
    id: "S-1042",
    name: "Budi Santoso",
    initials: "BS",
    email: "budi.santoso@mail.com",
    role: "student",
    status: "active",
    joined: "Jan 12, 2025",
    lastActive: "2 min ago",
    enrolled: 6,
    completed: 4,
  },
  {
    id: "S-1043",
    name: "Siti Rahayu",
    initials: "SR",
    email: "siti.rahayu@mail.com",
    role: "student",
    status: "active",
    joined: "Feb 03, 2025",
    lastActive: "18 min ago",
    enrolled: 9,
    completed: 7,
  },
  {
    id: "S-1044",
    name: "Andi Wijaya",
    initials: "AW",
    email: "andi.wijaya@mail.com",
    role: "student",
    status: "suspended",
    joined: "Dec 21, 2024",
    lastActive: "3 days ago",
    enrolled: 3,
    completed: 1,
  },
  {
    id: "S-1045",
    name: "Maya Putri",
    initials: "MP",
    email: "maya.putri@mail.com",
    role: "student",
    status: "active",
    joined: "Mar 09, 2025",
    lastActive: "1 hour ago",
    enrolled: 12,
    completed: 8,
  },
  {
    id: "S-1046",
    name: "Rizky Pratama",
    initials: "RP",
    email: "rizky.pratama@mail.com",
    role: "student",
    status: "suspended",
    joined: "Nov 15, 2024",
    lastActive: "2 weeks ago",
    enrolled: 2,
    completed: 0,
  },
  {
    id: "S-1047",
    name: "Dewi Lestari",
    initials: "DL",
    email: "dewi.lestari@mail.com",
    role: "student",
    status: "active",
    joined: "Apr 01, 2025",
    lastActive: "26 min ago",
    enrolled: 5,
    completed: 3,
  },
  {
    id: "S-1048",
    name: "Fajar Nugroho",
    initials: "FN",
    email: "fajar.nugroho@mail.com",
    role: "student",
    status: "active",
    joined: "Feb 22, 2025",
    lastActive: "4 hours ago",
    enrolled: 8,
    completed: 6,
  },
  {
    id: "S-1049",
    name: "Putri Ananda",
    initials: "PA",
    email: "putri.ananda@mail.com",
    role: "student",
    status: "active",
    joined: "May 07, 2025",
    lastActive: "yesterday",
    enrolled: 4,
    completed: 2,
  },
]

export const teachers: ManagedUser[] = [
  {
    id: "T-2011",
    name: "Dr. Arif Rahman",
    initials: "AR",
    email: "arif.rahman@mail.com",
    role: "teacher",
    status: "active",
    joined: "Aug 10, 2023",
    lastActive: "12 min ago",
    courses: 8,
    students: 3421,
    rating: 4.9,
    expertise: "Web Development",
  },
  {
    id: "T-2012",
    name: "Lina Kartika",
    initials: "LK",
    email: "lina.kartika@mail.com",
    role: "teacher",
    status: "active",
    joined: "Sep 02, 2023",
    lastActive: "1 hour ago",
    courses: 5,
    students: 2890,
    rating: 4.8,
    expertise: "Data Science",
  },
  {
    id: "T-2013",
    name: "Bayu Setiawan",
    initials: "BS",
    email: "bayu.setiawan@mail.com",
    role: "teacher",
    status: "suspended",
    joined: "Jan 18, 2024",
    lastActive: "5 days ago",
    courses: 3,
    students: 940,
    rating: 4.2,
    expertise: "Mobile Development",
  },
  {
    id: "T-2014",
    name: "Ratna Sari",
    initials: "RS",
    email: "ratna.sari@mail.com",
    role: "teacher",
    status: "active",
    joined: "Nov 27, 2023",
    lastActive: "38 min ago",
    courses: 6,
    students: 2140,
    rating: 4.7,
    expertise: "UI/UX Design",
  },
  {
    id: "T-2015",
    name: "Hendra Gunawan",
    initials: "HG",
    email: "hendra.gunawan@mail.com",
    role: "teacher",
    status: "active",
    joined: "Feb 14, 2024",
    lastActive: "3 hours ago",
    courses: 4,
    students: 1985,
    rating: 4.6,
    expertise: "Backend Engineering",
  },
  {
    id: "T-2016",
    name: "Nadia Salsabila",
    initials: "NS",
    email: "nadia.salsabila@mail.com",
    role: "teacher",
    status: "suspended",
    joined: "Mar 30, 2024",
    lastActive: "1 week ago",
    courses: 2,
    students: 610,
    rating: 4.0,
    expertise: "Digital Marketing",
  },
]

export type PopularCourse = {
  id: string
  title: string
  category: string
  students: number
  rating: number
  trend: number
}

export const popularCourses: PopularCourse[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    category: "Web Development",
    students: 3421,
    rating: 4.9,
    trend: 12,
  },
  {
    id: "2",
    title: "Data Science with Python",
    category: "Data Science",
    students: 2890,
    rating: 4.8,
    trend: 8,
  },
  {
    id: "3",
    title: "UI/UX Fundamentals",
    category: "Design",
    students: 2140,
    rating: 4.7,
    trend: 15,
  },
  {
    id: "4",
    title: "Node.js Bootcamp",
    category: "Backend",
    students: 1985,
    rating: 4.6,
    trend: 5,
  },
  {
    id: "5",
    title: "Flutter Masterclass",
    category: "Mobile",
    students: 1620,
    rating: 4.5,
    trend: -3,
  },
]

/* ---------- Reports & Logs ---------- */

export type TimeRange = "today" | "7d" | "30d"

// Student performance: grade distribution buckets
export type GradeBucket = {
  range: string
  students: number
}

export const gradeDistribution: Record<TimeRange, GradeBucket[]> = {
  today: [
    { range: "0-59", students: 4 },
    { range: "60-69", students: 9 },
    { range: "70-79", students: 21 },
    { range: "80-89", students: 34 },
    { range: "90-100", students: 18 },
  ],
  "7d": [
    { range: "0-59", students: 18 },
    { range: "60-69", students: 42 },
    { range: "70-79", students: 96 },
    { range: "80-89", students: 148 },
    { range: "90-100", students: 82 },
  ],
  "30d": [
    { range: "0-59", students: 63 },
    { range: "60-69", students: 154 },
    { range: "70-79", students: 388 },
    { range: "80-89", students: 601 },
    { range: "90-100", students: 342 },
  ],
}

export type PerformanceSummary = {
  averageGrade: number
  passRate: number
  atRisk: number
  totalGraded: number
}

export const performanceSummary: Record<TimeRange, PerformanceSummary> = {
  today: { averageGrade: 81.4, passRate: 88, atRisk: 6, totalGraded: 86 },
  "7d": { averageGrade: 79.8, passRate: 85, atRisk: 24, totalGraded: 386 },
  "30d": { averageGrade: 78.2, passRate: 83, atRisk: 71, totalGraded: 1548 },
}

// Slowest-progressing students needing intervention
export type SlowLearner = {
  id: string
  name: string
  initials: string
  course: string
  progress: number
  lastActivity: string
  grade: number
}

export const slowLearners: SlowLearner[] = [
  {
    id: "S-1046",
    name: "Rizky Pratama",
    initials: "RP",
    course: "Node.js Bootcamp",
    progress: 8,
    lastActivity: "14 days ago",
    grade: 41,
  },
  {
    id: "S-1044",
    name: "Andi Wijaya",
    initials: "AW",
    course: "Data Science with Python",
    progress: 15,
    lastActivity: "9 days ago",
    grade: 52,
  },
  {
    id: "S-1051",
    name: "Gita Maharani",
    initials: "GM",
    course: "Flutter Masterclass",
    progress: 22,
    lastActivity: "6 days ago",
    grade: 55,
  },
  {
    id: "S-1049",
    name: "Putri Ananda",
    initials: "PA",
    course: "Advanced React Patterns",
    progress: 27,
    lastActivity: "5 days ago",
    grade: 58,
  },
  {
    id: "S-1053",
    name: "Yoga Prasetyo",
    initials: "YP",
    course: "UI/UX Fundamentals",
    progress: 31,
    lastActivity: "4 days ago",
    grade: 61,
  },
]

// Course popularity report
export type CourseStat = {
  id: string
  title: string
  category: string
  value: number
}

export const mostEnrolled: CourseStat[] = [
  { id: "1", title: "Advanced React Patterns", category: "Web Development", value: 3421 },
  { id: "2", title: "Data Science with Python", category: "Data Science", value: 2890 },
  { id: "3", title: "UI/UX Fundamentals", category: "Design", value: 2140 },
  { id: "4", title: "Node.js Bootcamp", category: "Backend", value: 1985 },
  { id: "5", title: "Flutter Masterclass", category: "Mobile", value: 1620 },
]

export const bestRated: CourseStat[] = [
  { id: "1", title: "Advanced React Patterns", category: "Web Development", value: 4.9 },
  { id: "2", title: "Data Science with Python", category: "Data Science", value: 4.8 },
  { id: "3", title: "UI/UX Fundamentals", category: "Design", value: 4.7 },
  { id: "6", title: "Machine Learning Basics", category: "Data Science", value: 4.7 },
  { id: "4", title: "Node.js Bootcamp", category: "Backend", value: 4.6 },
]

// Highest drop-off rate (percentage of students who dropped)
export const mostDropped: CourseStat[] = [
  { id: "7", title: "Advanced Algorithms", category: "Computer Science", value: 38 },
  { id: "8", title: "Kubernetes in Depth", category: "DevOps", value: 31 },
  { id: "5", title: "Flutter Masterclass", category: "Mobile", value: 27 },
  { id: "9", title: "Rust for Systems", category: "Backend", value: 24 },
  { id: "10", title: "Digital Marketing 101", category: "Marketing", value: 19 },
]

// System audit logs
export type LogStatus = "success" | "failed"
export type LogEntry = {
  id: string
  timestamp: string
  user: string
  activity: string
  ip: string
  status: LogStatus
}

export const systemLogs: LogEntry[] = [
  { id: "L-9001", timestamp: "2026-07-03 09:42:17", user: "arif.rahman@mail.com", activity: "Login", ip: "182.23.14.201", status: "success" },
  { id: "L-9002", timestamp: "2026-07-03 09:40:03", user: "admin@lms.io", activity: "Update Course", ip: "10.0.0.4", status: "success" },
  { id: "L-9003", timestamp: "2026-07-03 09:37:55", user: "unknown", activity: "Login", ip: "45.129.88.17", status: "failed" },
  { id: "L-9004", timestamp: "2026-07-03 09:31:22", user: "siti.rahayu@mail.com", activity: "Submit Assignment", ip: "114.122.7.90", status: "success" },
  { id: "L-9005", timestamp: "2026-07-03 09:28:11", user: "lina.kartika@mail.com", activity: "Create Course", ip: "182.23.14.55", status: "success" },
  { id: "L-9006", timestamp: "2026-07-03 09:19:47", user: "bayu.setiawan@mail.com", activity: "Delete Module", ip: "36.72.214.8", status: "failed" },
  { id: "L-9007", timestamp: "2026-07-03 09:12:30", user: "admin@lms.io", activity: "Suspend User", ip: "10.0.0.4", status: "success" },
  { id: "L-9008", timestamp: "2026-07-03 08:59:04", user: "maya.putri@mail.com", activity: "Login", ip: "125.166.3.44", status: "success" },
  { id: "L-9009", timestamp: "2026-07-03 08:47:38", user: "unknown", activity: "Password Reset", ip: "89.248.165.12", status: "failed" },
  { id: "L-9010", timestamp: "2026-07-03 08:33:59", user: "ratna.sari@mail.com", activity: "Upload Material", ip: "182.23.14.77", status: "success" },
  { id: "L-9011", timestamp: "2026-07-03 08:21:16", user: "hendra.gunawan@mail.com", activity: "Update Course", ip: "103.94.7.21", status: "success" },
  { id: "L-9012", timestamp: "2026-07-03 08:05:42", user: "fajar.nugroho@mail.com", activity: "Enroll Course", ip: "114.122.7.31", status: "success" },
]

/* ---------- Finance & Transactions ---------- */

export type PaymentMethod = "E-Wallet" | "Bank Transfer" | "Credit Card" | "Virtual Account"
export type TransactionStatus = "paid" | "pending" | "failed"

export type Transaction = {
  id: string
  student: string
  initials: string
  course: string
  method: PaymentMethod
  date: string
  amount: number
  status: TransactionStatus
}

export type FinanceSummary = {
  netRevenue: number
  successfulCount: number
  refundFailedCount: number
}

export const financeSummary: FinanceSummary = {
  netRevenue: 184_750_000,
  successfulCount: 1284,
  refundFailedCount: 47,
}

export const transactions: Transaction[] = [
  { id: "INV-20260703-001", student: "Budi Santoso", initials: "BS", course: "Advanced React Patterns", method: "E-Wallet", date: "2026-07-03 09:42", amount: 1_250_000, status: "paid" },
  { id: "INV-20260703-002", student: "Siti Rahayu", initials: "SR", course: "Data Science with Python", method: "Bank Transfer", date: "2026-07-03 09:15", amount: 1_500_000, status: "paid" },
  { id: "INV-20260703-003", student: "Andi Wijaya", initials: "AW", course: "UI/UX Fundamentals", method: "Credit Card", date: "2026-07-03 08:58", amount: 950_000, status: "pending" },
  { id: "INV-20260702-014", student: "Maya Putri", initials: "MP", course: "Node.js Bootcamp", method: "Virtual Account", date: "2026-07-02 21:03", amount: 1_100_000, status: "paid" },
  { id: "INV-20260702-013", student: "Rizky Pratama", initials: "RP", course: "Flutter Masterclass", method: "E-Wallet", date: "2026-07-02 18:47", amount: 1_350_000, status: "failed" },
  { id: "INV-20260702-012", student: "Dewi Lestari", initials: "DL", course: "Machine Learning Basics", method: "Bank Transfer", date: "2026-07-02 16:22", amount: 1_450_000, status: "paid" },
  { id: "INV-20260702-011", student: "Fajar Nugroho", initials: "FN", course: "Advanced React Patterns", method: "Credit Card", date: "2026-07-02 14:09", amount: 1_250_000, status: "paid" },
  { id: "INV-20260702-010", student: "Putri Ananda", initials: "PA", course: "Digital Marketing 101", method: "E-Wallet", date: "2026-07-02 11:31", amount: 750_000, status: "pending" },
  { id: "INV-20260701-032", student: "Gita Maharani", initials: "GM", course: "Kubernetes in Depth", method: "Virtual Account", date: "2026-07-01 20:55", amount: 1_800_000, status: "paid" },
  { id: "INV-20260701-031", student: "Yoga Prasetyo", initials: "YP", course: "Rust for Systems", method: "Bank Transfer", date: "2026-07-01 19:12", amount: 1_650_000, status: "failed" },
  { id: "INV-20260701-030", student: "Bagas Prayoga", initials: "BP", course: "Data Science with Python", method: "Credit Card", date: "2026-07-01 15:40", amount: 1_500_000, status: "paid" },
  { id: "INV-20260701-029", student: "Intan Permata", initials: "IP", course: "UI/UX Fundamentals", method: "E-Wallet", date: "2026-07-01 13:27", amount: 950_000, status: "paid" },
]

export type Coupon = {
  id: string
  code: string
  discount: number
  quota: number
  used: number
  expires: string
}

export const coupons: Coupon[] = [
  { id: "C-01", code: "NEWYEAR26", discount: 30, quota: 500, used: 342, expires: "2026-08-31" },
  { id: "C-02", code: "STUDENT15", discount: 15, quota: 1000, used: 187, expires: "2026-12-31" },
  { id: "C-03", code: "REACT50", discount: 50, quota: 100, used: 96, expires: "2026-07-15" },
  { id: "C-04", code: "EARLYBIRD", discount: 25, quota: 250, used: 71, expires: "2026-09-30" },
  { id: "C-05", code: "BUNDLE20", discount: 20, quota: 400, used: 128, expires: "2026-10-20" },
  { id: "C-06", code: "WELCOME10", discount: 10, quota: 2000, used: 654, expires: "2026-12-31" },
]

/* ---------- Communication & Interaction ---------- */

export type ReportReason = "Spam" | "Harassment" | "Hate Speech" | "Off-topic" | "Misinformation"

export type ReportedComment = {
  id: string
  author: string
  initials: string
  content: string
  thread: string
  reason: ReportReason
  reports: number
  reportedAt: string
}

export const reportedComments: ReportedComment[] = [
  {
    id: "R-1042",
    author: "Anonymous_User92",
    initials: "AU",
    content: "Buy cheap followers now!!! Visit my profile link for 90% off premium accounts, limited time only.",
    thread: "Advanced React Patterns · Lesson 4",
    reason: "Spam",
    reports: 12,
    reportedAt: "2026-07-03 08:14",
  },
  {
    id: "R-1041",
    author: "Rendra Saputra",
    initials: "RS",
    content: "Honestly this instructor has no idea what they're talking about, complete waste of everyone's time.",
    thread: "Data Science with Python · Q&A",
    reason: "Harassment",
    reports: 7,
    reportedAt: "2026-07-03 07:52",
  },
  {
    id: "R-1040",
    author: "Vina Kurnia",
    initials: "VK",
    content: "The certificate you get here is basically useless, don't bother enrolling in any of these courses.",
    thread: "UI/UX Fundamentals · Discussion",
    reason: "Misinformation",
    reports: 4,
    reportedAt: "2026-07-02 21:36",
  },
  {
    id: "R-1039",
    author: "Guest_5521",
    initials: "G5",
    content: "lol who even uses this framework anymore, you're all wasting your money and time here.",
    thread: "Flutter Masterclass · Lesson 2",
    reason: "Off-topic",
    reports: 3,
    reportedAt: "2026-07-02 18:09",
  },
  {
    id: "R-1038",
    author: "Toxic_Coder",
    initials: "TC",
    content: "Reported for repeatedly posting offensive remarks toward other learners in the discussion thread.",
    thread: "Node.js Bootcamp · General",
    reason: "Hate Speech",
    reports: 15,
    reportedAt: "2026-07-02 15:47",
  },
]

export type AnnouncementCategory = "Info" | "Maintenance" | "Event"
export type AnnouncementTarget = "All" | "Students Only" | "Teachers Only"

export type Announcement = {
  id: string
  title: string
  content: string
  category: AnnouncementCategory
  target: AnnouncementTarget
  author: string
  publishedAt: string
}

export const announcements: Announcement[] = [
  {
    id: "A-2051",
    title: "New Course Bundle: Full-Stack Career Track",
    content: "We're excited to launch our new Full-Stack Career Track bundle, combining 6 premium courses at a 40% discount. Enrollment opens this Friday for all students.",
    category: "Event",
    target: "Students Only",
    author: "Academy Team",
    publishedAt: "2026-07-03 09:00",
  },
  {
    id: "A-2050",
    title: "Scheduled Maintenance: July 6th, 01:00–03:00 WIB",
    content: "The platform will undergo scheduled maintenance to improve performance. During this window, video playback and quizzes may be temporarily unavailable.",
    category: "Maintenance",
    target: "All",
    author: "Engineering",
    publishedAt: "2026-07-02 16:30",
  },
  {
    id: "A-2049",
    title: "Instructor Payout Schedule Updated",
    content: "Starting this month, instructor payouts will be processed on the 5th and 20th of each month. Please ensure your payment details are up to date in your profile.",
    category: "Info",
    target: "Teachers Only",
    author: "Finance",
    publishedAt: "2026-07-01 11:15",
  },
  {
    id: "A-2048",
    title: "Community Guidelines Refresh",
    content: "We've updated our community guidelines to keep discussions respectful and helpful. Please review the new rules before posting in course forums.",
    category: "Info",
    target: "All",
    author: "Moderation",
    publishedAt: "2026-06-29 14:20",
  },
]
