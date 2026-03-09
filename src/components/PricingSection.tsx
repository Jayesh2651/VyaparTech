import { Check, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";

const plans = [
  {
    name: "Starter",
    price: "₹5,999",
    amount: 599900,
    period: "one-time",
    description: "Perfect for new businesses just getting started online.",
    features: [
      "Custom 5-Page Professional Website",
      "Fully Responsive Design (Mobile, Tablet, Desktop)",
      "Modern UI/UX Layout",
      "GContact Form Integration",
      "Basic SEO Setup",
      "7 Days Free Support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "₹10,999",
    amount: 1099900,
    period: "one-time",
    description: "For growing businesses that need more features.",
    features: [
      "Custom 10-Page Premium Website",
      "Advanced UI/UX Design",
      "Speed Optimized Website",
      "WhatsApp + Contact Integration",
      "Admin dashboard",
      "Basic Admin Dashboard",
      "15 Days Free Support",
     
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "₹20,999",
    amount: 2099900,
    period: "one-time",
    description: "Complete digital solution for serious businesses.",
    features: [
      "Full Custom Website or Web App",
      "Login / Signup System",
      "Payment Gateway Integration",
      "Database Integration",
      "Admin Dashboard",
      "30 Days Free Support",

    ],
    popular: false,
  },
];

// Razorpay Payment Function
const handlePayment = (
  plan: any,
  setPaymentSuccess: any,
  setPaidAmount: any,
  setOrderId: any
) => {
  const options = {
    key: "rzp_test_SOoJGIorUSvhjo",
    amount: plan.amount,
    currency: "INR",
    name: "VyaparTech",
    description: plan.name + " Plan Purchase",

    handler: function (response: any) {
      console.log("Payment Success:", response);

      setPaidAmount(plan.price);
      setOrderId(response.razorpay_payment_id);
      setPaymentSuccess(true);
    },

    theme: {
      color: "#4F46E5",
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};

const PlanCard = ({
  plan,
  index,
  setPaymentSuccess,
  setPaidAmount,
  setOrderId,
}: any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${
      index * 0.1
    }s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`relative rounded-3xl border-2 bg-card/40 backdrop-blur-sm p-8 transition-all duration-300 hover:-translate-y-1 ${
        plan.popular
          ? "border-primary md:-mt-4 md:mb-4 shadow-2xl glow-primary"
          : "border-border/30"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-5 py-2 rounded-full gradient-accent text-primary-foreground text-xs font-bold shadow-lg">
          <Star size={12} className="fill-current" />
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="font-heading text-xl font-bold text-foreground">
          {plan.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {plan.description}
        </p>
      </div>

      <div className="mb-8">
        <span className="font-heading text-5xl font-bold text-foreground">
          {plan.price}
        </span>
        <span className="text-xs text-muted-foreground ml-1">
          / {plan.period}
        </span>
      </div>

      <div className="h-px bg-border/30 mb-8" />

      <ul className="space-y-3.5 mb-10">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-muted-foreground"
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                plan.popular ? "gradient-accent" : "bg-primary/10"
              }`}
            >
              <Check
                size={12}
                className={
                  plan.popular ? "text-primary-foreground" : "text-primary"
                }
              />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        onClick={() =>
          handlePayment(plan, setPaymentSuccess, setPaidAmount, setOrderId)
        }
        className={`w-full font-semibold py-6 rounded-xl group btn-shine ${
          plan.popular
            ? "gradient-accent text-primary-foreground border-0 glow-primary"
            : "bg-muted/30 hover:bg-muted/50 border border-border/30"
        }`}
      >
        Get Started
        <ArrowRight
          size={16}
          className="ml-2 group-hover:translate-x-1 transition-transform"
        />
      </Button>
    </div>
  );
};

const PricingSection = () => {
  const headingRef = useScrollReveal();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidAmount, setPaidAmount] = useState("");
  const [orderId, setOrderId] = useState("");

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      <div className="container mx-auto">
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
            Pricing
          </span>

          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-3">
            Affordable <span className="text-gradient">Plans</span>
          </h2>

          <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-base">
            Transparent pricing with no hidden charges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              index={i}
              setPaymentSuccess={setPaymentSuccess}
              setPaidAmount={setPaidAmount}
              setOrderId={setOrderId}
            />
          ))}
        </div>
      </div>

      <PaymentSuccessModal
        open={paymentSuccess}
        onClose={() => setPaymentSuccess(false)}
        amount={paidAmount}
        orderId={orderId}
      />
    </section>
  );
};

export default PricingSection;