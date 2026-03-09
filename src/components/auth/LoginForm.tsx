import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import FloatingInput from "./FloatingInput";
import SocialButtons from "./SocialButtons";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

interface Props {
  onSwitch: () => void;
}

const LoginForm = ({ onSwitch }: Props) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back to VyaparTech! 🚀");
      navigate("/dashboard");
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div className="space-y-4">
        <FloatingInput
          label="Email Address"
          type="email"
          value={form.email}
          onChange={update("email")}
          error={errors.email}
        />
        <FloatingInput
          label="Password"
          isPassword
          value={form.password}
          onChange={update("password")}
          error={errors.password}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer text-muted-foreground">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="rounded border-border accent-primary w-4 h-4"
          />
          Remember me
        </label>
        <button type="button" className="text-primary hover:underline font-medium">
          Forgot Password?
        </button>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-semibold text-primary-foreground vt-gradient-bg relative overflow-hidden disabled:opacity-70 transition-shadow hover:shadow-lg hover:shadow-primary/25"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {loading ? (
          <Loader2 className="mx-auto animate-spin" size={22} />
        ) : (
          "Sign In"
        )}
        {!loading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
            style={{ backgroundSize: "200% 100%" }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-4 text-muted-foreground uppercase tracking-wider">
            or continue with
          </span>
        </div>
      </div>

      <SocialButtons />

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-primary font-semibold hover:underline">
          Create Account
        </button>
      </p>
    </motion.form>
  );
};

export default LoginForm;
