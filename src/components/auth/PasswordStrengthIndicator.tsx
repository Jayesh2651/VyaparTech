import { motion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: Props) => {
  const { score, label, color } = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (password.length >= 12) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;

    const levels = [
      { label: "Very Weak", color: "bg-destructive" },
      { label: "Weak", color: "bg-destructive" },
      { label: "Fair", color: "bg-vt-warning" },
      { label: "Good", color: "bg-primary" },
      { label: "Strong", color: "bg-vt-success" },
      { label: "Very Strong", color: "bg-vt-success" },
    ];

    return { score: s, ...levels[s] };
  }, [password]);

  if (!password) return null;

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= score - 1 ? color : "bg-border"}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

export default PasswordStrengthIndicator;
