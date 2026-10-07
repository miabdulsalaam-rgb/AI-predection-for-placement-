import React from 'react';
import { Student } from '../types/student';
import { StudentTable } from '../components/StudentTable';
import { Users, Plus, Sparkles } from 'lucide-react';

interface StudentsPageProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onDeleteStudent: (id: number) => void;
  onAddStudent: () => void;
}

export const StudentsPage: React.FC<StudentsPageProps> = ({
  students,
  onSelectStudent,
  onDeleteStudent,
  onAddStudent,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Central Candidate Registry
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Verified Student Placement Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Persisted in browser localStorage. Supports manual Selection &amp; Bubble Sort, sequential Linear Search, and Tier partitioning.
          </p>
        </div>

        {students.length > 0 && (
          <button
            onClick={onAddStudent}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Evaluate New Student</span>
          </button>
        )}
      </div>

      {/* Main Student Records Component */}
      <StudentTable
        students={students}
        onSelectStudent={onSelectStudent}
        onDeleteStudent={onDeleteStudent}
        onAddStudent={onAddStudent}
      />
    </div>
  );
};
