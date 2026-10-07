import { Student } from '../types/student';

const STORAGE_KEY = 'placementStudents';
const ACTIVE_STUDENT_KEY = 'activePlacementStudent';

/**
 * Safely retrieves all user-entered students from localStorage.
 * CRITICAL: NEVER returns predefined or fake students.
 * Returns an empty array if no user records exist.
 */
export function getStoredStudents(): Student[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    console.error('Failed to read students from localStorage:', err);
    return [];
  }
}

/**
 * Saves a new or updated student into localStorage array.
 */
export function saveStudentToStorage(student: Student): Student[] {
  if (typeof window === 'undefined') return [];

  try {
    const existing = getStoredStudents();
    // Check if updating or appending
    const index = existing.findIndex((s) => s.id === student.id);
    let updated: Student[];

    if (index >= 0) {
      updated = [...existing];
      updated[index] = student;
    } else {
      updated = [student, ...existing];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Also save as active student for immediate result viewing
    localStorage.setItem(ACTIVE_STUDENT_KEY, JSON.stringify(student));
    return updated;
  } catch (err) {
    console.error('Failed to save student to localStorage:', err);
    return [];
  }
}

/**
 * Deletes a student from localStorage by id.
 */
export function deleteStudentFromStorage(id: number): Student[] {
  if (typeof window === 'undefined') return [];

  try {
    const existing = getStoredStudents();
    const updated = existing.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // If active student was deleted, clear active
    const activeRaw = localStorage.getItem(ACTIVE_STUDENT_KEY);
    if (activeRaw) {
      try {
        const active = JSON.parse(activeRaw);
        if (active.id === id) {
          localStorage.removeItem(ACTIVE_STUDENT_KEY);
        }
      } catch {
        localStorage.removeItem(ACTIVE_STUDENT_KEY);
      }
    }

    return updated;
  } catch (err) {
    console.error('Failed to delete student from localStorage:', err);
    return [];
  }
}

/**
 * Retrieves the currently active student for Result view.
 */
export function getActiveStudent(): Student | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(ACTIVE_STUDENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Student;
  } catch {
    return null;
  }
}

/**
 * Sets a specific student as the active student.
 */
export function setActiveStudent(student: Student | null): void {
  if (typeof window === 'undefined') return;

  try {
    if (student) {
      localStorage.setItem(ACTIVE_STUDENT_KEY, JSON.stringify(student));
    } else {
      localStorage.removeItem(ACTIVE_STUDENT_KEY);
    }
  } catch (err) {
    console.error('Failed to set active student:', err);
  }
}

/**
 * Clears all user-entered students from storage.
 */
export function clearAllStoredStudents(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACTIVE_STUDENT_KEY);
  } catch (err) {
    console.error('Failed to clear students from storage:', err);
  }
}
