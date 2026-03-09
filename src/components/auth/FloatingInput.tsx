import { useState, forwardRef, InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isPassword?: boolean;
}

const FloatingInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, isPassword, className, value, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const hasValue = value !== undefined && value !== "";
    const isActive = focused || hasValue;

    return (
      <div className="space-y-1">
        <div
          className={cn(
            "relative rounded-xl border bg-card transition-all duration-300 vt-input-glow",
            error ? "border-destructive" : "border-border",
            className
          )}
        >
          <input
            ref={ref}
            {...props}
            type={isPassword ? (showPassword ? "text" : "password") : props.type}
            value={value}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            className="peer w-full bg-transparent px-4 pt-6 pb-2 text-sm text-foreground outline-none placeholder-transparent"
            placeholder={label}
          />
          <label
            className={cn(
              "pointer-events-none absolute left-4 transition-all duration-200",
              isActive
                ? "top-2 text-[11px] font-medium text-primary"
                : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
            )}
          >
            {label}
          </label>
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-destructive pl-1">{error}</p>}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";
export default FloatingInput;
