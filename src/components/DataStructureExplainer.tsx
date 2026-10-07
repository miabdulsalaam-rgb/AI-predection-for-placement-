import React, { useState, useEffect } from 'react';
import {
  Code2,
  Layers,
  Search,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  FileCode,
  Terminal,
  Cpu,
  BookOpen,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';

export const DataStructureExplainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'array' | 'object' | 'search' | 'sort' | 'filter' | 'viva'>('sort');

  // Interactive Live Sorting Visualizer state
  const initialDemoArray = [42, 88, 65, 93, 51, 78, 84];
  const [demoArray, setDemoArray] = useState<number[]>(initialDemoArray);
  const [sortingAlgo, setSortingAlgo] = useState<'selection' | 'bubble'>('selection');
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [stepLogs, setStepLogs] = useState<string>('Ready to simulate. Select an algorithm and press Run.');

  const resetVisualizer = () => {
    setDemoArray([42, 88, 65, 93, 51, 78, 84]);
    setActiveIndices([]);
    setSortedIndices([]);
    setIsSorting(false);
    setStepLogs('Array reset to initial unsorted state.');
  };

  const randomizeVisualizer = () => {
    const randomized = Array.from({ length: 7 }, () => Math.floor(Math.random() * 60) + 35);
    setDemoArray(randomized);
    setActiveIndices([]);
    setSortedIndices([]);
    setIsSorting(false);
    setStepLogs('Generated new random candidate readiness scores.');
  };

  const runVisualizerSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...demoArray];
    const n = arr.length;
    const sorted: number[] = [];

    if (sortingAlgo === 'selection') {
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        setStepLogs(`Pass ${i + 1}: Finding minimum value in subarray [${i}..${n - 1}]`);
        for (let j = i + 1; j < n; j++) {
          setActiveIndices([minIdx, j]);
          await new Promise((r) => setTimeout(r, 450));
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        if (minIdx !== i) {
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
          setDemoArray([...arr]);
          setStepLogs(`Swapped element ${arr[i]} with ${arr[minIdx]}`);
          await new Promise((r) => setTimeout(r, 450));
        }
        sorted.push(i);
        setSortedIndices([...sorted]);
      }
      sorted.push(n - 1);
      setSortedIndices([...sorted]);
      setActiveIndices([]);
      setStepLogs('Selection Sort completed: Entire array is now monotonically non-decreasing.');
    } else {
      // Bubble Sort
      for (let i = 0; i < n - 1; i++) {
        setStepLogs(`Pass ${i + 1}: Bubbling largest unsorted element`);
        for (let j = 0; j < n - i - 1; j++) {
          setActiveIndices([j, j + 1]);
          await new Promise((r) => setTimeout(r, 450));
          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            setDemoArray([...arr]);
            setStepLogs(`Swapped adjacent pair (${arr[j + 1]}, ${arr[j]})`);
            await new Promise((r) => setTimeout(r, 450));
          }
        }
        sorted.push(n - 1 - i);
        setSortedIndices([...sorted]);
      }
      sorted.push(0);
      setSortedIndices([...sorted]);
      setActiveIndices([]);
      setStepLogs('Bubble Sort completed: Array sorted in O(n²) time.');
    }
    setIsSorting(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-purple-950/40 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-inner">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Data Structures &amp; Algorithmic Foundations
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  VIVA &amp; LAB CERTIFIED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Formal analysis of linear memory structures, asymptotic complexity, and in-place sorting logic
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('sort')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'sort'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            1. Sorting Simulator (Interactive)
          </button>

          <button
            onClick={() => setActiveTab('array')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'array'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            2. Linear Array Structure
          </button>

          <button
            onClick={() => setActiveTab('object')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'object'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            3. Composite Object Struct
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'search'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            4. Linear Search
          </button>

          <button
            onClick={() => setActiveTab('filter')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'filter'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            5. Predicate Partitioning
          </button>

          <button
            onClick={() => setActiveTab('viva')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'viva'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            6. Viva Oral Examination Q&amp;A
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Sorting Visualizer */}
      {activeTab === 'sort' && (
        <div className="space-y-6">
          {/* Interactive Lab Visualizer Panel */}
          <div className="bg-slate-900/80 border border-violet-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  Real-Time Asymptotic Simulation
                </div>
                <h3 className="text-xl font-black text-white">
                  Interactive Sorting Algorithm Visualizer
                </h3>
                <p className="text-xs text-slate-400">
                  Watch elements swap step-by-step and inspect comparisons live
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
                  <button
                    onClick={() => setSortingAlgo('selection')}
                    disabled={isSorting}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      sortingAlgo === 'selection'
                        ? 'bg-violet-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Selection Sort
                  </button>
                  <button
                    onClick={() => setSortingAlgo('bubble')}
                    disabled={isSorting}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      sortingAlgo === 'bubble'
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Bubble Sort
                  </button>
                </div>

                <button
                  onClick={runVisualizerSort}
                  disabled={isSorting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 disabled:opacity-50 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isSorting ? 'Sorting...' : 'Run Simulation'}</span>
                </button>

                <button
                  onClick={randomizeVisualizer}
                  disabled={isSorting}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold disabled:opacity-50 transition-all cursor-pointer"
                >
                  Randomize
                </button>

                <button
                  onClick={resetVisualizer}
                  disabled={isSorting}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Bars Container */}
            <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 flex items-end justify-center gap-3 sm:gap-6 h-64">
              {demoArray.map((value, idx) => {
                const isActive = activeIndices.includes(idx);
                const isSorted = sortedIndices.includes(idx);
                const barHeight = `${(value / 100) * 100}%`;

                let barColor = 'bg-slate-800 text-slate-400 border-slate-700';
                if (isActive) {
                  barColor = 'bg-gradient-to-t from-amber-500 to-orange-400 text-white border-amber-400 ring-2 ring-amber-400/50 scale-105';
                } else if (isSorted) {
                  barColor = 'bg-gradient-to-t from-emerald-500 to-teal-400 text-white border-emerald-400';
                } else {
                  barColor = 'bg-gradient-to-t from-indigo-600/60 to-purple-500/60 text-slate-300 border-indigo-500/40';
                }

                return (
                  <div key={idx} className="flex-1 max-w-16 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-xs font-mono font-bold">{value}</span>
                    <div
                      style={{ height: barHeight }}
                      className={`w-full rounded-xl border transition-all duration-300 shadow-lg ${barColor}`}
                    />
                    <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
                  </div>
                );
              })}
            </div>

            {/* Live Step Logger */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs font-mono">
              <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-400">Step Log:</span>
              <span className="text-cyan-300 font-semibold">{stepLogs}</span>
            </div>
          </div>

          {/* Theory & Complexity Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-violet-400" />
                Selection Sort Mechanics
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Divides the collection logically into sorted (<code className="text-emerald-400">0 .. i-1</code>) and unsorted (<code className="text-cyan-400">i .. n-1</code>) partitions.
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Best Case:</span> <strong className="text-amber-400">O(n²)</strong> (Still performs all pair comparisons)
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Worst Case:</span> <strong className="text-rose-400">O(n²)</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Auxiliary Space:</span> <strong className="text-emerald-400">O(1) In-Place</strong>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-cyan-400" />
                Bubble Sort Mechanics
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Repeatedly swaps adjacent out-of-order pairs until no elements are transposed during a complete pass.
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Best Case (Pre-sorted):</span> <strong className="text-emerald-400">O(n)</strong> with early-exit flag
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Worst Case:</span> <strong className="text-rose-400">O(n²)</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Auxiliary Space:</span> <strong className="text-emerald-400">O(1) In-Place</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Array Structure */}
      {activeTab === 'array' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-cyan-500/30 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Contiguous Array Storage (<code className="text-cyan-300">Student[]</code>)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Student evaluation records are maintained in a linear, index-addressable continuous block structure.
            </p>
            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-1">Index Direct Access: O(1)</strong>
                Given index <code className="text-cyan-400">i</code>, base address calculation <code className="text-emerald-400">Addr = Base + (i × Size)</code> executes instantaneously in CPU registers.
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-1">Cache Locality &amp; Linear Traversal:</strong>
                Contiguous memory layout provides optimal spatial locality during table rendering and iterative filtering.
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-1">Local Persistence:</strong>
                Serialized via JSON specification and committed to browser <code className="text-cyan-300">localStorage</code>.
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 font-mono text-xs overflow-x-auto text-slate-300 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 mb-3 text-[11px]">
              <span>src/types/student.ts</span>
              <span className="text-cyan-400">TypeScript Array Schema</span>
            </div>
            <pre className="text-slate-200 leading-relaxed">
{`// Contiguous Array Storage Structure
export type StudentStore = Student[];

// Access & Operation Complexities:
// Direct Index Access:  O(1)
// Append Push (amort):  O(1)
// Full Linear Traverse: O(n)
// In-Place Sorting:     O(n²)

const registry: Student[] = [];
// Appended upon form validation submission`}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 3: Object Structure */}
      {activeTab === 'object' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-indigo-500/30 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-400" />
              Composite Object Struct
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every student record constitutes an encapsulated entity of primitive scalar values and computed decision attributes.
            </p>
            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-1">Typed Schema Invariants:</strong>
                Guarantees non-null numeric bounds (10th/12th/Aptitude: 0–100, CGPA: 0–10.0, Arrears: integers ≥ 0).
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-1">State Cohesion:</strong>
                Inputs and resulting predictions remain atomically coupled across storage updates.
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 font-mono text-xs overflow-x-auto text-slate-300 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 mb-3 text-[11px]">
              <span>Entity Definition</span>
              <span className="text-indigo-400">Composite Structure</span>
            </div>
            <pre className="text-slate-200 leading-relaxed">
{`interface Student {
  id: number;              // Unique epoch identifier
  name: string;            // Text label
  tenth: number;           // Secondary score (15% wt)
  twelfth: number;         // Pre-university score (15% wt)
  cgpa: number;            // Normalized GPA (30% wt)
  aptitude: number;        // Quantitative index (30% wt)
  arrears: number;         // Backlog count (10% wt)
  placementScore: number;  // Composite score (0-100)
  probability: number;     // Projected selection %
  eligibility: string;     // Tier 1 / 2 / 3 / 4
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 4: Search */}
      {activeTab === 'search' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-blue-500/30 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-400" />
              Linear Sequential Search
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Iterates sequentially through the array comparing substring patterns on names and candidate IDs.
            </p>
            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-1">Time Complexity: O(n)</strong>
                Worst case traverses all <code className="text-blue-300">n</code> records when candidate does not exist or resides at index <code className="text-blue-300">n - 1</code>.
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-1">Space Complexity: O(1) Auxiliary</strong>
                Executes in constant memory without heap allocation during traversal iterations.
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 font-mono text-xs overflow-x-auto text-slate-300 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 mb-3 text-[11px]">
              <span>src/lib/searching.ts</span>
              <span className="text-blue-400">Sequential Scan</span>
            </div>
            <pre className="text-slate-200 leading-relaxed">
{`export function linearSearchStudents(
  students: Student[],
  query: string
): { results: Student[]; comparisons: number } {
  const q = query.trim().toLowerCase();
  const results: Student[] = [];
  let comparisons = 0;

  for (let i = 0; i < students.length; i++) {
    comparisons++;
    const s = students[i];
    if (s.name.toLowerCase().includes(q) || s.id.toString().includes(q)) {
      results.push(s);
    }
  }
  return { results, comparisons };
}`}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 5: Filter */}
      {activeTab === 'filter' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-emerald-500/30 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-emerald-400" />
              Predicate Partitioning
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Filters partition candidate records across four mutually-exclusive eligibility tiers.
            </p>
            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-1">Time Complexity: O(n)</strong>
                Evaluates predicate condition against each candidate exactly once.
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-1">Space Complexity: O(k)</strong>
                Where <code className="text-emerald-400">k &le; n</code> represents the count of matching candidates.
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 font-mono text-xs overflow-x-auto text-slate-300 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 mb-3 text-[11px]">
              <span>Predicate Function</span>
              <span className="text-emerald-400">Linear Filter</span>
            </div>
            <pre className="text-slate-200 leading-relaxed">
{`// Predicate Condition:
const isTierMatch = (s: Student, selected: string): boolean => {
  if (selected === 'ALL') return true;
  return s.eligibility.toUpperCase() === selected.toUpperCase();
};

const partition = students.filter(student =>
  isTierMatch(student, targetTier)
);`}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 6: Viva Q&A Guide */}
      {activeTab === 'viva' && (
        <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Academic Viva Voce Examination Questions &amp; Model Answers
              </h3>
              <p className="text-xs text-slate-400">
                Key questions frequently asked during practical laboratory and project evaluations
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-colors">
              <h4 className="text-sm font-bold text-amber-300 mb-1.5">
                Q1: Why choose manual Selection Sort / Bubble Sort over JavaScript's Array.prototype.sort()?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Model Answer:</strong> In an academic examination or DSA project, native black-box methods hide algorithmic mechanics. Our implementation demonstrates explicit index manipulation, in-place element swapping, and live comparison counting to empirically verify the theoretical <code className="text-cyan-400">O(n²)</code> complexity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-colors">
              <h4 className="text-sm font-bold text-amber-300 mb-1.5">
                Q2: How is the Composite Placement Score mathematically computed?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Model Answer:</strong> It implements a weighted linear combination: <code className="text-cyan-400">Score = (10th × 0.15) + (12th × 0.15) + (CGPA% × 0.30) + (Aptitude × 0.30) + (ArrearsPts × 0.10)</code>. Arrears are scored piecewise: 0 arrears = 100 pts, 1 = 70 pts, 2 = 45 pts, 3 = 25 pts, 4+ = 0 pts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-colors">
              <h4 className="text-sm font-bold text-amber-300 mb-1.5">
                Q3: Under what condition does Linear Search outperform Binary Search?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Model Answer:</strong> Binary Search requires pre-sorted input (<code className="text-cyan-400">O(n log n)</code> to sort first) and only performs exact-key equality matches. When user queries are arbitrary partial substrings (e.g., &quot;ar&quot; matching &quot;Aravind&quot;) on unsorted arrays, Linear Search in <code className="text-cyan-400">O(n)</code> is optimal without preprocessing overhead.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-colors">
              <h4 className="text-sm font-bold text-amber-300 mb-1.5">
                Q4: How is client data persistence accomplished without a backend database server?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Model Answer:</strong> The contiguous object array is serialized into a standard UTF-8 JSON string representation and saved to HTML5 <code className="text-cyan-400">localStorage</code>. On application bootstrap, the string is deserialized back into typed memory instances, preserving state across page refreshes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
