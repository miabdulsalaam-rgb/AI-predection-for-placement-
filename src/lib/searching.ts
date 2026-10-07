import { Student } from '../types/student';

/**
 * ============================================================================
 * DATA STRUCTURES & ALGORITHMS DEMONSTRATION: SEARCHING ALGORITHMS
 * ============================================================================
 *
 * Algorithm 1: Linear Search (Sequential Search)
 * -----------------------------------------------
 * How it works:
 * - Sequentially examines each element in the array from index 0 to N-1.
 * - Checks whether the search criteria matches the student's name (case-insensitive substring)
 *   or the student's ID (numeric string matching).
 *
 * Complexity Analysis:
 * - Best Case Time Complexity: O(1) [Target element is at the first index]
 * - Average Case Time Complexity: O(n) [Target element is in the middle]
 * - Worst Case Time Complexity: O(n) [Target element is at the end or not found]
 * - Auxiliary Space Complexity: O(1) [In-place evaluation, no extra memory required]
 *
 * Why Linear Search is used here:
 * 1. The student records array can be in arbitrary order (unsorted by name/ID).
 * 2. It supports substring matching (e.g., searching "alex" matches "Alexander").
 * 3. Works immediately without requiring pre-sorting overhead.
 */
export function linearSearchStudents(
  students: Student[],
  query: string
): { results: Student[]; comparisons: number } {
  const sanitizedQuery = query.trim().toLowerCase();
  if (!sanitizedQuery) {
    return { results: [...students], comparisons: 0 };
  }

  const results: Student[] = [];
  let comparisons = 0;

  for (let i = 0; i < students.length; i++) {
    comparisons++;
    const student = students[i];
    const nameMatch = student.name.toLowerCase().includes(sanitizedQuery);
    const idMatch = student.id.toString().includes(sanitizedQuery);

    if (nameMatch || idMatch) {
      results.push(student);
    }
  }

  return { results, comparisons };
}

/**
 * Algorithm 2: Binary Search (for Exact Student ID lookup on Sorted Arrays)
 * --------------------------------------------------------------------------
 * How it works:
 * - Requires the array to be sorted by student.id in ascending order.
 * - Repeatedly divides the search interval in half.
 * - If the target value is less than the middle element, narrow to the lower half.
 * - Otherwise, narrow to the upper half.
 *
 * Complexity Analysis:
 * - Time Complexity: O(log n)
 * - Space Complexity: O(1) iterative
 */
export function binarySearchStudentById(
  sortedStudentsById: Student[],
  targetId: number
): { found: Student | null; comparisons: number; steps: number[] } {
  let low = 0;
  let high = sortedStudentsById.length - 1;
  let comparisons = 0;
  const steps: number[] = [];

  while (low <= high) {
    comparisons++;
    const mid = Math.floor((low + high) / 2);
    const currentId = sortedStudentsById[mid].id;
    steps.push(currentId);

    if (currentId === targetId) {
      return { found: sortedStudentsById[mid], comparisons, steps };
    }

    if (currentId < targetId) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return { found: null, comparisons, steps };
}
