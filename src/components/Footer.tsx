import { Heart, ArrowUp } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const FooterBrandLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href="#home"
      className="relative group select-none inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ rotateX: 5, rotateY: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 600 }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg blur-xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(210 100% 60% / 0.3), hsl(280 80% 60% / 0.3))",
        }}
        animate={isHovered ? { opacity: 0.6, scale: 1.2 } : { opacity: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      />
      <div className="relative flex items-baseline gap-0">
        <span className="text-xl font-bold tracking-tight text-foreground">Vyapar</span>
        <span
          className="text-xl font-extrabold tracking-tight"
          style={{
            backgroundImage: "linear-gradient(135deg, hsl(210 100% 60%), hsl(260 80% 65%), hsl(320 70% 60%), hsl(210 100% 60%))",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-shift 4s ease infinite",
          }}
        >
          Tech
        </span>
      </div>
      <motion.div
        className="absolute -bottom-1 left-0 h-[2px] rounded-full"
        style={{ background: "linear-gradient(90deg, hsl(210 100% 60%), hsl(280 80% 60%))" }}
        initial={{ width: "0%" }}
        animate={isHovered ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.a>
  );
};

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-border/30"
      style={{ backgroundColor: "hsl(var(--background) / 0.7)", backdropFilter: "blur(20px)" }}
    >
      {/* Animated gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(210 100% 60%), hsl(260 80% 65%), hsl(320 70% 60%), transparent)",
          backgroundSize: "200% 100%",
          animation: "gradient-shift 4s ease infinite",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(210 100% 60%), transparent 70%)" }} />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(280 80% 60%), transparent 70%)" }} />

      <motion.div style={{ opacity, y }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <FooterBrandLogo />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Helping small businesses to go digital with stunning websites, apps, and marketing solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {["Services", "Portfolio", "Pricing", "Process", "Testimonials", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Get In Touch</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>+91 99700 62565</p>
              <a href="mailto:vyapartech2@gmail.com" className="block hover:text-foreground transition-colors">vyapartech2@gmail.com</a>
              <p>Pune, Maharashtra, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VyaparTech.
            {/* . Made with{" "}
            <Heart className="inline w-3 h-3 text-destructive fill-destructive" /> in Pune */}
          </p>

          <a
            href="#home"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group"
          >
            Back to top
            <span className="w-7 h-7 rounded-full border border-border/50 flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
              <ArrowUp className="w-3 h-3" />
            </span>
          </a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;