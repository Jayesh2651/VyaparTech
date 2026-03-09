import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const WhatsAppButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/919970062565?text=Hi%20VyaparTech!%20I%20want%20to%20know%20more%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${show ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      style={{ background: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} className="text-primary-foreground" />
    </a>
  );
};

export default WhatsAppButton;
