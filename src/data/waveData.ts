export type Wave = {
  duration: number;
  spawnInterval: number;
  minBalloonSpeed: number;
  maxBalloonSpeed: number;
};

export const slowWave: Wave = {
  duration: 10,
  spawnInterval: 350,
  minBalloonSpeed: 0.10,
  maxBalloonSpeed: 0.15, 
};

export const mediumWave: Wave = {
  duration: 10,
  spawnInterval: 300,
  minBalloonSpeed: 0.22,
  maxBalloonSpeed: 0.28,
};

export const fastWave: Wave = {
  duration: 5,
  spawnInterval: 200,
  minBalloonSpeed: 0.35,
  maxBalloonSpeed: 0.40,
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
