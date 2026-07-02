import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  opacity: number;
}

const PARTICLE_COUNT = 40;

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
    id,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 12 + Math.random() * 18,
    delay: Math.random() * -20,
    driftX: (Math.random() - 0.5) * 60,
    opacity: 0.25 + Math.random() * 0.55,
  }));
}

export function Particles({ className = "" }: { className?: string }) {
  const [particles, setParticles] = useState<Particle[] | null>(null);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  if (!particles) {
    return <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} />;
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-brand"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: "blur(0.5px)",
            boxShadow: "0 0 8px rgba(196,30,30,0.8)",
            animation: `avexa-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            // @ts-expect-error custom property consumed by keyframes
            "--drift-x": `${p.driftX}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes avexa-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--drift-x), -40px); }
        }
      `}</style>
    </div>
  );
}
