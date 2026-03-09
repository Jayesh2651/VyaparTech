import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import FloatingInput from "./FloatingInput";
import SocialButtons from "./SocialButtons";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const signUpSchema = z
  .object({
    fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().trim().email("Please enter a valid email").max(255),
    phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number")
      .regex(/[^A-Za-z0-9]/, "Include a special character"),
    confirmPassword: z.string(),
    terms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface Props {
  onSwitch: () => void;
}

const SignUpForm = ({ onSwitch }: Props) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = signUpSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          phone: form.phone,
        },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Check your email to confirm, then sign in. 🎉");
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="space-y-3.5">
        <FloatingInput
          label="Full Name"
          value={form.fullName}
          onChange={update("fullName")}
          error={errors.fullName}
        />
        <FloatingInput
          label="Email Address"
          type="email"
          value={form.email}
          onChange={update("email")}
          error={errors.email}
        />
        <FloatingInput
          label="Phone Number"
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          error={errors.phone}
        />
        <div className="space-y-2">
          <FloatingInput
            label="Password"
            isPassword
            value={form.password}
            onChange={update("password")}
            error={errors.password}
          />
          <PasswordStrengthIndicator password={form.password} />
        </div>
        <FloatingInput
          label="Confirm Password"
          isPassword
          value={form.confirmPassword}
          onChange={update("confirmPassword")}
          error={errors.confirmPassword}
        />
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={form.terms}
          onChange={(e) => setForm((p) => ({ ...p, terms: e.target.checked }))}
          className="mt-0.5 rounded border-border accent-primary w-4 h-4"
        />
        <span>
          I agree to the{" "}
          <span className="text-primary font-medium hover:underline cursor-pointer">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="text-primary font-medium hover:underline cursor-pointer">
            Privacy Policy
          </span>
        </span>
      </label>
      {errors.terms && <p className="text-xs text-destructive pl-1">{errors.terms}</p>}

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
          "Create Account"
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

      <div className="relative my-4">
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

      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-primary font-semibold hover:underline">
          Sign In
        </button>
      </p>
    </motion.form>
  );
};

export default SignUpForm;
