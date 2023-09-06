export function formatScore(score: number, length: number = 6): string {
  return String(score).padStart(length, '0');
}
