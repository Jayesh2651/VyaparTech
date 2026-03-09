import { motion } from "framer-motion";

const shapes = [
  { size: 300, x: "10%", y: "20%", delay: 0, duration: 8, color: "from-primary/20 to-accent/20" },
  { size: 200, x: "70%", y: "60%", delay: 2, duration: 10, color: "from-accent/15 to-primary/15" },
  { size: 150, x: "80%", y: "10%", delay: 4, duration: 12, color: "from-primary/10 to-accent/10" },
  { size: 250, x: "20%", y: "70%", delay: 1, duration: 9, color: "from-accent/20 to-primary/10" },
  { size: 180, x: "50%", y: "40%", delay: 3, duration: 11, color: "from-primary/15 to-accent/15" },
];

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-vt-surface to-background" />

      {/* Animated shapes */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-3xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 15, 0],
            x: [0, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
