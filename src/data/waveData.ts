export type Wave = {
  duration: number;
  spawnInterval: number;
  minBalloonSpeed: number;
  maxBalloonSpeed: number;
  classes: string[];
};

export const slowWave: Wave = {
  duration: 10,
  spawnInterval: 180,
  minBalloonSpeed: 0.10,
  maxBalloonSpeed: 0.15, 
  classes: ["balloon-slow-1", "balloon-slow-2"]
};

export const mediumWave: Wave = {
  duration: 10,
  spawnInterval: 120,
  minBalloonSpeed: 0.22,
  maxBalloonSpeed: 0.28,
  classes: ["balloon-medium-1", "balloon-medium-2"]
};

export const fastWave: Wave = {
  duration: 5,
  spawnInterval: 80,
  minBalloonSpeed: 0.35,
  maxBalloonSpeed: 0.40,
  classes: ["balloon-fast-1", "balloon-fast-2"]
};

export const waves: Wave[] = [
  slowWave,
  mediumWave,
  slowWave,
  mediumWave,
  fastWave,
];

export const getGameDuration = (waves: Wave[]): number => {
  return waves.reduce((p, c) => p + c.duration, 0);
};
