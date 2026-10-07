# AI Placement Eligibility & Prediction System

A complete, high-performance web application designed to evaluate student placement readiness, estimate selection probability, assess corporate eligibility criteria, generate personalized dynamic recommendations, and demonstrate foundational **Data Structures and Algorithms (Array, Linear Search, Selection Sort, Bubble Sort)**.

---

## Key Features

1. **Strictly User-Driven Data**:
   - **No predefined student profiles** (no mock names or hardcoded records).
   - The application begins with an empty state. All calculations and records come exclusively from user input.
2. **Weighted Placement Readiness Scoring (0–100)**:
   - 10th Percentage: 15%
   - 12th Percentage: 15%
   - CGPA (converted to %): 30%
   - Aptitude Score: 30%
   - Arrears Clearance: 10% (0 arrears = 100 pts, 1 = 70 pts, 2 = 45 pts, 3 = 25 pts, 4+ = 0 pts)
3. **Four Standardized Eligibility Tiers**:
   - `HIGHLY ELIGIBLE`: Score ≥ 80, CGPA ≥ 7.5, Aptitude ≥ 70, Arrears = 0
   - `ELIGIBLE`: Score ≥ 65, CGPA ≥ 6.5, Aptitude ≥ 55, Arrears ≤ 1
   - `PARTIALLY ELIGIBLE`: Score ≥ 50
   - `NOT CURRENTLY ELIGIBLE`: Score < 50
4. **Estimated Placement Probability**:
   - Score ≥ 85: 90–95%
   - Score ≥ 75: 75–89%
   - Score ≥ 65: 60–74%
   - Score ≥ 50: 40–59%
   - Score < 50: 20–39%
   - Includes official academic estimate disclaimer.
5. **Detailed Score Breakdown & Dynamic Recommendations**:
   - Shows exact points contributed by each parameter out of their maximum weights.
   - Dynamic recommendations tailored specifically to low/high metrics.
6. **Configurable Corporate Eligibility Matrix**:
   - Compares profile against Tier-1, Super Dream, Core Engineering, and Mass Recruitment company cut-offs (Company A, Company B, Company C, Company D, etc.).
   - Explicitly displays unmet requirements for companies requiring improvement.
7. **AI-Assisted Career Insight**:
   - AI-Assisted Rule-Based qualitative synthesis providing customized roadmap advice.
8. **Data Structures Implementation**:
   - **Array Container**: `Student[]` in-memory structure serialized to `localStorage`.
   - **Linear Search**: Sequential searching by student name substring and ID ($O(n)$ time, $O(1)$ space).
   - **Selection Sort & Bubble Sort**: Manual $O(n^2)$ sorting with real-time pass, swap, and comparison counters.
   - **Predicate Filtering**: Instant $O(n)$ cohort segmentation by eligibility tier.
9. **No External Database Required**:
   - Uses browser `localStorage` (`placementStudents`) for persistence across page reloads.

---

## Local Development & Execution

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or pnpm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```

---

## How to Deploy Directly to Vercel

The application is built with modern React, TypeScript, Vite, and Tailwind CSS, engineered specifically for zero-configuration deployment to Vercel without requiring MongoDB, MySQL, Firebase, or backend servers.

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click **New Repository**.
3. Name your repository (e.g., `ai-placement-eligibility-system`).
4. Set visibility to **Public** or **Private**, and click **Create repository**.

### Step 2: Push the Project to GitHub
In your local terminal:
```bash
git init
git add .
git commit -m "Initial commit: AI Placement Eligibility & Prediction System"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
git push -u origin main
```

### Step 3: Connect to Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** &rarr; **Project**.
3. Under "Import Git Repository", select the repository you pushed in Step 2.

### Step 4: Configure & Deploy
1. Vercel automatically detects the framework presets:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
2. No environment variables are required for standard local storage execution.
3. Click **Deploy**.

### Step 5: Open Deployed Application
Within ~30 seconds, Vercel will complete the build and assign a production URL (e.g., `https://ai-placement-eligibility-system.vercel.app`). Click the link to open your live web application!

---

## Project Structure

```text
├── src/
│   ├── types/
│   │   ├── student.ts        # Student entity schema & validation types
│   │   └── company.ts        # Company criteria & match types
│   ├── lib/
│   │   ├── prediction.ts     # 5-factor weighted placement score calculator
│   │   ├── eligibility.ts    # 4-tier categorical eligibility rules
│   │   ├── probability.ts    # Placement probability interpolation
│   │   ├── searching.ts      # Linear search & Binary search DSA algorithms
│   │   ├── sorting.ts        # Manual Selection Sort & Bubble Sort implementations
│   │   ├── companyData.ts    # Corporate criteria dataset & comparator
│   │   ├── recommendations.ts# Parameter-driven recommendations generator
│   │   ├── careerInsight.ts  # Rule-based natural language qualitative engine
│   │   └── storage.ts        # Safe browser localStorage persistence
│   ├── components/
│   │   ├── Navbar.tsx        # Responsive navigation & student count badge
│   │   ├── StudentForm.tsx   # Empty-by-default manual input form
│   │   ├── ScoreCard.tsx     # Circular score meter & probability gauge
│   │   ├── ScoreBreakdown.tsx# Contribution breakdown with weights & formula
│   │   ├── EligibilityBadge.tsx # Categorical tier badge with metadata
│   │   ├── CompanyCard.tsx   # Eligible vs. unmet company criteria cards
│   │   ├── StudentTable.tsx  # Central student registry with search/sort/filter
│   │   ├── RecommendationCard.tsx # Categorized profile recommendations
│   │   ├── CareerInsightCard.tsx  # AI-Assisted Rule-Based career insight
│   │   ├── AnalyticsDashboard.tsx # Cohort metrics & distribution graphs
│   │   └── DataStructureExplainer.tsx # Interactive Viva & DS documentation
│   ├── pages/
│   │   ├── HomePage.tsx      # Landing page with methodology overview
│   │   ├── PredictPage.tsx   # Placement credentials entry form
│   │   ├── ResultPage.tsx    # Comprehensive evaluation dossier report
│   │   ├── StudentsPage.tsx  # User-entered records central registry
│   │   ├── DashboardPage.tsx # Cohort analytics dashboard
│   │   └── DataStructuresPage.tsx # Academic viva & algorithm documentation
│   ├── App.tsx               # Root app router & state orchestrator
│   └── main.tsx              # React 19 entry point
├── index.html                # HTML entry point with synchronized metadata
├── metadata.json             # AI Studio app metadata
├── package.json              # Dependencies and build scripts
└── tsconfig.json             # TypeScript compiler configuration
```

---

## College Lab & Viva Questions (DSA)

- **Q: Which data structure stores the student profiles?**
  - **A:** A linear dynamic Array (`Student[]`) of Objects.
- **Q: What is the time complexity of the search implementation?**
  - **A:** $O(n)$ via Sequential Linear Search across student name substrings and IDs.
- **Q: What sorting algorithm is implemented?**
  - **A:** Manual Selection Sort ($O(n^2)$ time, at most $O(n)$ swaps) and Bubble Sort ($O(n^2)$ time with early exit flag).
- **Q: How does filtering work?**
  - **A:** $O(n)$ predicate testing against the eligibility category string.
