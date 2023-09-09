export type Wave = {
  duration: number;
  spawnInterval: number;
  minBalloonSpeed: number;
  maxBalloonSpeed: number;
};

export const slowWave: Wave = {
  duration: 10,
  spawnInterval: 500,
  minBalloonSpeed: 0.16,
  maxBalloonSpeed: 0.2,
};

export const mediumWave: Wave = {
  duration: 10,
  spawnInterval: 350,
  minBalloonSpeed: 0.3,
  maxBalloonSpeed: 0.36,
};

export const fastWave: Wave = {
  duration: 5,
  spawnInterval: 250,
  minBalloonSpeed: 0.42,
  maxBalloonSpeed: 0.48,
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
