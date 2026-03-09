import { use3DCard } from "@/hooks/use3DCard";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface ServiceCard3DProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const ServiceCard3D = ({ icon: Icon, title, description, index }: ServiceCard3DProps) => {
  const { cardRef, lightRef, handleMouseMove, handleMouseLeave } = use3DCard();

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative glass-card p-8 overflow-hidden cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      {/* Dynamic light overlay */}
      <div
        ref={lightRef}
        className="absolute inset-0 pointer-events-none z-0 transition-all duration-300"
      />

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, hsl(239 84% 67% / 0.1), transparent 50%, hsl(187 94% 43% / 0.08))",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-shadow duration-300"
            style={{ transform: "translateZ(60px)" }}
          >
            <Icon size={24} className="text-primary-foreground" />
          </div>
          <ArrowUpRight
            size={20}
            className="text-muted-foreground/30 group-hover:text-secondary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            style={{ transform: "translateZ(40px)" }}
          />
        </div>
        <h3
          className="font-heading text-xl font-bold text-foreground mb-3"
          style={{ transform: "translateZ(40px)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm text-muted-foreground leading-relaxed"
          style={{ transform: "translateZ(20px)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard3D;
