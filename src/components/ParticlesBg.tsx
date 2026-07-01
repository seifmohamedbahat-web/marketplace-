import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ParticlesBg({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<Array<{id:number;x:number;y:number;size:number;delay:number;duration:number;red:boolean}>>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
        red: Math.random() > 0.6,
      }))
    );
  }, [count]);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 40%, rgba(196,30,30,0.18), transparent 60%)" }} />
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.red ? "#C41E1E" : "#FFFFFF",
            boxShadow: p.red ? "0 0 8px #C41E1E" : "0 0 4px #FFFFFF",
          }}
          animate={{ y: [0, -40, 0], opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}