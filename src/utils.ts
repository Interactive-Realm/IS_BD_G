export function formatScore(score: number, length: number = 4): string {
  return String(score).padStart(length, '0');
}
