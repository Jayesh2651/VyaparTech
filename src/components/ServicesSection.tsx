import { Globe, ShoppingCart, CalendarCheck, Smartphone, Search, Wrench } from "lucide-react";
import ServiceCard3D from "./ServiceCard3D";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  { icon: Globe, title: "Business Websites", description: "Beautiful, fast, mobile-friendly websites that make your business look professional and attract more customers." },
  { icon: ShoppingCart, title: "E-Commerce Solutions", description: "Complete online stores with product catalogs, payment gateways, and order management for your business." },
  { icon: CalendarCheck, title: "Booking Systems", description: "Let your customers book appointments, tables, or sessions online — available 24/7 for salons, clinics & restaurants." },
  { icon: Smartphone, title: "Mobile App Development", description: "Custom Android & iOS apps to keep your customers engaged and coming back to your business." },
  { icon: Search, title: "SEO & Google Listing", description: "Get found on Google when customers search for your services. We handle Google My Business & local SEO." },
  { icon: Wrench, title: "Maintenance & Support", description: "Ongoing website updates, hosting management, security patches, and technical support — worry-free." },
];

const ServicesSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.04] blur-[120px]" style={{ background: "hsl(239 84% 67%)" }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-[0.03] blur-[80px]" style={{ background: "hsl(187 94% 43%)" }} />

      <div className="container mx-auto relative">
        <div ref={sectionRef}>
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
              What We Offer
            </span>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-3">
              Services That <br className="hidden md:block" />
              <span className="text-gradient">Grow Your Business</span>
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-base">
              Everything your small business needs to dominate the digital world — all under one roof.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard3D key={service.title} icon={service.icon} title={service.title} description={service.description} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
