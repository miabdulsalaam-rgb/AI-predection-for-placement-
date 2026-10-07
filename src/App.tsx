import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { PredictPage } from './pages/PredictPage';
import { ResultPage } from './pages/ResultPage';
import { StudentsPage } from './pages/StudentsPage';
import { DashboardPage } from './pages/DashboardPage';
import { DataStructuresPage } from './pages/DataStructuresPage';
import { Student } from './types/student';
import {
  getStoredStudents,
  saveStudentToStorage,
  deleteStudentFromStorage,
  getActiveStudent,
  setActiveStudent,
} from './lib/storage';
import {
  GraduationCap,
  Sparkles,
  Github,
  Heart,
  Code2,
  Terminal,
} from 'lucide-react';

export default function App() {
  // CRITICAL REQUIREMENT: Strictly load only user-entered records from localStorage.
  // Initially starts as empty array [].
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudent, setActiveStudentState] = useState<Student | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage safely on client mount
  useEffect(() => {
    const loaded = getStoredStudents();
    setStudents(loaded);

    const initialActive = getActiveStudent();
    if (initialActive) {
      setActiveStudentState(initialActive);
    }

    // Hash-based simple route restoration
    const hash = window.location.hash.replace('#', '');
    if (['predict', 'students', 'dashboard', 'ds-demo', 'result'].includes(hash)) {
      if (hash === 'result' && !initialActive && loaded.length > 0) {
        setActiveStudentState(loaded[0]);
      }
      setCurrentTab(hash);
    }

    setIsLoaded(true);
  }, []);

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab === 'home' ? '' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEvaluationComplete = (newStudent: Student) => {
    const updated = saveStudentToStorage(newStudent);
    setStudents(updated);
    setActiveStudentState(newStudent);
    setActiveStudent(newStudent);
    setCurrentTab('result');
    window.location.hash = 'result';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteStudent = (id: number) => {
    const updated = deleteStudentFromStorage(id);
    setStudents(updated);
    if (activeStudent?.id === id) {
      const nextActive = updated.length > 0 ? updated[0] : null;
      setActiveStudentState(nextActive);
      setActiveStudent(nextActive);
      if (!nextActive && currentTab === 'result') {
        setCurrentTab('students');
      }
    }
  };

  const handleSelectStudent = (student: Student) => {
    setActiveStudentState(student);
    setActiveStudent(student);
    setCurrentTab('result');
    window.location.hash = 'result';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative">
      {/* Ambient background lighting mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Top Global Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        studentCount={students.length}
      />

      {/* Main Body View */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onCheckEligibility={() => handleNavigate('predict')}
            onViewRecords={() => handleNavigate('students')}
            studentCount={students.length}
          />
        )}

        {currentTab === 'predict' && (
          <PredictPage
            onEvaluationComplete={handleEvaluationComplete}
            onCancel={() => handleNavigate('home')}
          />
        )}

        {currentTab === 'result' && (
          activeStudent ? (
            <ResultPage
              student={activeStudent}
              onAnalyzeAnother={() => handleNavigate('predict')}
              onViewAllRecords={() => handleNavigate('students')}
            />
          ) : (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
              <h2 className="text-xl font-bold text-white">
                No active student evaluation selected
              </h2>
              <p className="text-sm text-slate-400">
                Please enter a candidate&apos;s academic details to generate an eligibility report.
              </p>
              <button
                onClick={() => handleNavigate('predict')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Start New Evaluation
              </button>
            </div>
          )
        )}

        {currentTab === 'students' && (
          <StudentsPage
            students={students}
            onSelectStudent={handleSelectStudent}
            onDeleteStudent={handleDeleteStudent}
            onAddStudent={() => handleNavigate('predict')}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            students={students}
            onAddStudent={() => handleNavigate('predict')}
          />
        )}

        {currentTab === 'ds-demo' && (
          <DataStructuresPage />
        )}
      </main>

      {/* Global Footer */}
      <footer className="mt-20 border-t border-slate-900 bg-[#07090e]/95 backdrop-blur-xl py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5 drop-shadow" />
            </div>
            <div>
              <div className="font-bold text-slate-200">
                PlacementIQ System
              </div>
              <p className="text-[11px] text-slate-400">
                Data Structures, Selection Sort, Linear Search &amp; Deterministic Rules Architecture
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs font-semibold">
            <button
              onClick={() => handleNavigate('predict')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Evaluate Profile
            </button>
            <button
              onClick={() => handleNavigate('students')}
              className="hover:text-indigo-300 transition-colors cursor-pointer"
            >
              Registry ({students.length})
            </button>
            <button
              onClick={() => handleNavigate('dashboard')}
              className="hover:text-blue-300 transition-colors cursor-pointer"
            >
              Cohort Analytics
            </button>
            <button
              onClick={() => handleNavigate('ds-demo')}
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              DSA Viva Lab
            </button>
          </div>

          <div className="text-center md:text-right">
            <div className="text-[11px] text-slate-300 font-medium">
              Vercel-Compatible Architecture &bull; Client-Side Storage
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Deterministic calculations &bull; Pure user-driven records
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
