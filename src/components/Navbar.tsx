import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-background/85 backdrop-blur-2xl border-b border-border/40 shadow-lg" : "bg-background/30 backdrop-blur-md"
    }`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-shadow">
            <span className="font-heading font-bold text-primary-foreground text-sm">V</span>
          </div>
          <span className="font-heading font-bold text-xl text-foreground">
            Vyapar<span className="text-gradient">Tech</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary group-hover:w-full transition-all duration-500 ease-out" />
            </a>
          ))}
          <Button asChild className="gradient-accent border-0 text-primary-foreground font-semibold glow-primary btn-shine rounded-xl px-6">
            <a href="#contact">Get Free Quote</a>
          </Button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - CSS transition instead of framer-motion */}
      <div
        className={`md:hidden bg-background/95 backdrop-blur-2xl border-b border-border overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted/30 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="mt-3 gradient-accent border-0 text-primary-foreground font-semibold">
            <a href="#contact" onClick={closeMenu}>Get Free Quote</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
