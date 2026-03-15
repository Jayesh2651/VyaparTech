import { useState, useRef, useEffect } from "react";
import { Send, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
};

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const headingRef = useScrollReveal();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.target);

  const data = {
    name: formData.get("name"),
    business: formData.get("business"),
    phone: formData.get("phone"),
    budget: formData.get("budget"),
    message: formData.get("message"),
  };

  try {
    await fetch("http://vyapartech.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    toast({
      title: "Message sent! 🎉",
      description: "We'll contact you soon.",
    });

    e.target.reset();
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong",
    });
  }

  setLoading(false);
};

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="container mx-auto relative">
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">Get In Touch</span>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-3">
            Let's <span className="text-gradient">Talk Business</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-base">
            Fill the form below and get a free consultation. No commitment required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <FadeIn>
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8 md:p-10 space-y-5 border-glow"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Your Name</label>
                  <Input name="name" placeholder="Jayesh Patil" required className="bg-muted/30 border-border/30 py-5 rounded-xl focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Business Name</label>
                  <Input name="business" placeholder="My Bakery Shop" required className="bg-muted/30 border-border/30 py-5 rounded-xl focus:border-primary/50" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Phone Number</label>
                  <Input name="phone" placeholder="+91 99700 62565" required className="bg-muted/30 border-border/30 py-5 rounded-xl focus:border-primary/50" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Budget Range</label>
                  <Input name="budget" placeholder="₹10,000 - ₹25,000" className="bg-muted/30 border-border/30 py-5 rounded-xl focus:border-primary/50" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Tell Us Your Requirement</label>
                <Textarea name="message" placeholder="I want a website for my restaurant with online menu and table booking..." rows={4} required className="bg-muted/30 border-border/30 rounded-xl focus:border-primary/50" />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full gradient-amber text-accent-foreground border-0 font-semibold py-7 rounded-xl glow-amber hover:scale-[1.02] transition-transform group btn-shine"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Ready to grow your business?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We believe every small business deserves a strong online presence. Let's make it happen together —
                  no matter your budget or tech knowledge.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Phone, label: "+91 99700 62565", href: "tel:+919970062565" },
                  { icon: Mail, label: "hello@vyapartech.in", href: "mailto:hello@vyapartech.in" },
                  { icon: MapPin, label: "Pune, Maharashtra, India", href: "#" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 text-sm text-muted-foreground hover:text-primary transition-colors p-3 rounded-xl hover:bg-muted/20"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* <div className="p-5 rounded-2xl border border-secondary/20 bg-secondary/5 border-glow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center shadow-lg">
                    <ArrowRight size={18} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-foreground text-sm">Free Consultation</div>
                    <div className="text-xs text-muted-foreground">Get expert advice at zero cost</div>
                  </div>
                </div>
              </div> */}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
