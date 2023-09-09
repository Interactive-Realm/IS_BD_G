import { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { FlagParticle } from './FlagParticle';
import flag from '/images/assets/flag.png';

export const FlagBackground = () => {
  const flags = [flag];
  return (
    <Canvas camera={{ fov: 75, position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        {flags.map((flag, index) => (
          <FlagParticle
            key={index}
            position={[
              Math.random() * 10 - 5,
              Math.random() * 10,
              Math.random() * -10,
            ]}
            rotation={[0, 0, Math.random() * 360]}
            flagImage={flag}
          />
        ))}
      </Suspense>
    </Canvas>
  );
};
