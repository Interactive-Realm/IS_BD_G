import { a, useSpring } from '@react-spring/three';

interface FlagParticleProps {
  position: [number, number, number];
  rotation: [number, number, number];
  flagImage: string;
}

export const FlagParticle = ({
  position,
  rotation,
  flagImage,
}: FlagParticleProps) => {
  // Vertical animation (falling down)
  const { y } = useSpring({
    from: { y: position[1] },
    to: { y: -5 }, // Adjust the destination position as needed
    config: { duration: 5000 }, // Adjust the animation duration as needed
    reset: true,
  });

  // Horizontal animation (swaying side to side)
  const { xRotation } = useSpring({
    from: { xRotation: rotation[0] },
    to: { xRotation: rotation[0] + Math.PI / 10 }, // Adjust the rotation angle as needed
    config: { duration: 2000, delay: 1000 }, // Adjust the animation duration and delay as needed
    reset: true,
  });

  return (
    <a.mesh
      position={[position[0], y, position[2]]}
      rotation={[xRotation, rotation[1], rotation[2]]}>
      <a.img src={flagImage} />
    </a.mesh>
  );
};
