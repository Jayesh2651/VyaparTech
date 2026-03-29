import { useState, useRef, useEffect } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/lib/supabase";

const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef(null);

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

    const { error } = await supabase
      .from("contacts")
      .insert([data]);

    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } else {
      toast({
        title: "Message sent! 🎉",
        description: "We'll contact you soon.",
      });

      e.target.reset();
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="container mx-auto relative">
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
            Get In Touch
          </span>

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
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Your Name
                  </label>

                  <Input
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Business Name
                  </label>

                  <Input
                    name="business"
                    placeholder="My Bakery Shop"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Phone Number
                  </label>

                  <Input
                    name="phone"
                    placeholder="+91 99700 62565"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Budget Range
                  </label>

                  <Input
                    name="budget"
                    placeholder="₹10,000 - ₹25,000"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Tell Us Your Requirement
                </label>

                <Textarea
                  name="message"
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Message"}
                <Send size={16} className="ml-2" />
              </Button>
            </form>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col justify-center space-y-8">

              <div className="space-y-4">
                <a href="tel:+919970062565" className="flex items-center gap-4">
                  <Phone size={20} />
                  <span>+91 XXXXXXXXXX</span>
                </a>

                <a href="mailto:vyapartech2@gmail.com" className="flex items-center gap-4">
                  <Mail size={20} />
                  <span>vyapartech2@gmail.com</span>
                </a>

                <div className="flex items-center gap-4">
                  <MapPin size={20} />
                  <span>Pune, Maharashtra, India</span>
                </div>

              </div>

            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;