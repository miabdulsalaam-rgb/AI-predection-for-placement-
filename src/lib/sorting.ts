import { Student } from '../types/student';

export type SortField =
  | 'score_desc' // Highest Placement Score
  | 'score_asc'  // Lowest Placement Score
  | 'cgpa_desc'   // Highest CGPA
  | 'aptitude_desc' // Highest Aptitude
  | 'probability_desc'; // Highest Probability

export interface SortMetric {
  comparisons: number;
  swaps: number;
  algorithmUsed: 'Selection Sort' | 'Bubble Sort';
  timeComplexity: string;
  spaceComplexity: string;
}

/**
 * Comparator function to determine if element A should precede element B
 * based on the chosen sort criterion.
 */
function shouldPrecede(a: Student, b: Student, criterion: SortField): boolean {
  switch (criterion) {
    case 'score_desc':
      return a.placementScore > b.placementScore;
    case 'score_asc':
      return a.placementScore < b.placementScore;
    case 'cgpa_desc':
      return a.cgpa > b.cgpa;
    case 'aptitude_desc':
      return a.aptitude > b.aptitude;
    case 'probability_desc':
      return a.probability > b.probability;
    default:
      return a.placementScore > b.placementScore;
  }
}

/**
 * ============================================================================
 * DATA STRUCTURES & ALGORITHMS DEMONSTRATION: SELECTION SORT
 * ============================================================================
 *
 * How Selection Sort Works:
 * 1. The array is conceptually divided into two parts:
 *    - Sorted sub-array on the left.
 *    - Unsorted sub-array on the right.
 * 2. In each iteration (pass i from 0 to n-2):
 *    - It searches the unsorted part to find the element that satisfies the sorting criterion
 *      (e.g., maximum score for descending order, or minimum score for ascending order).
 *    - Once found, it swaps that target element with the element at position `i`.
 * 3. The boundary between sorted and unsorted shifts one position to the right.
 * 4. This process repeats until the entire array is sorted.
 *
 * Algorithmic Complexity:
 * - Best Case Time:    O(n^2) - comparisons are always performed across the unsorted partition
 * - Average Case Time: O(n^2)
 * - Worst Case Time:   O(n^2)
 * - Auxiliary Space:   O(1) - performs in-place element swapping
 * - Stability:         Unstable in its standard implementation
 * - Total Swaps:       At most n - 1 swaps (very low write operations)
 *
 * College Presentation / Viva Note:
 * Selection Sort is ideal when memory writes (swaps) are expensive compared to comparisons,
 * because it performs at most O(n) swaps.
 */
export function manualSelectionSort(
  students: Student[],
  criterion: SortField
): { sorted: Student[]; metrics: SortMetric } {
  // Create a shallow copy of the student records array so we do not mutate the input array
  const arr = [...students];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let targetIndex = i;

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      if (shouldPrecede(arr[j], arr[targetIndex], criterion)) {
        targetIndex = j;
      }
    }

    if (targetIndex !== i) {
      // Perform swap: arr[i] <-> arr[targetIndex]
      const temp = arr[i];
      arr[i] = arr[targetIndex];
      arr[targetIndex] = temp;
      swaps++;
    }
  }

  return {
    sorted: arr,
    metrics: {
      comparisons,
      swaps,
      algorithmUsed: 'Selection Sort',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1) Auxiliary',
    },
  };
}

/**
 * ============================================================================
 * DATA STRUCTURES & ALGORITHMS DEMONSTRATION: BUBBLE SORT WITH EARLY EXIT
 * ============================================================================
 *
 * How Bubble Sort Works:
 * 1. Iterates repeatedly through the array.
 * 2. Compares adjacent elements (arr[j] and arr[j+1]).
 * 3. Swaps them if they are out of desired order.
 * 4. After each outer pass `i`, the greatest (or smallest) element "bubbles up"
 *    to its definitive position at the end.
 * 5. Uses a `swapped` boolean flag for early exit if the array is already sorted.
 *
 * Algorithmic Complexity:
 * - Best Case Time:    O(n) with early termination flag
 * - Average Case Time: O(n^2)
 * - Worst Case Time:   O(n^2)
 * - Auxiliary Space:   O(1)
 */
export function manualBubbleSort(
  students: Student[],
  criterion: SortField
): { sorted: Student[]; metrics: SortMetric } {
  const arr = [...students];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      // If arr[j+1] should precede arr[j], they are in wrong order -> swap
      if (shouldPrecede(arr[j + 1], arr[j], criterion)) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swaps++;
        swapped = true;
      }
    }

    // If no two elements were swapped by inner loop, array is sorted
    if (!swapped) break;
  }

  return {
    sorted: arr,
    metrics: {
      comparisons,
      swaps,
      algorithmUsed: 'Bubble Sort',
      timeComplexity: 'O(n²) [O(n) Best]',
      spaceComplexity: 'O(1) Auxiliary',
    },
  };
}
