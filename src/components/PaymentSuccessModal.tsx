import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentSuccessModalProps {
  open: boolean;
  onClose: () => void;
  amount?: string;
  orderId?: string;
}

const PaymentSuccessModal = ({
  open,
  onClose,
  amount = "$249.00",
  orderId = "#ORD-29481",
}: PaymentSuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="bg-foreground/40 backdrop-blur-sm" />
      <DialogContent className="max-w-md border-none bg-transparent p-0 shadow-none [&>button]:hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative overflow-hidden rounded-2xl bg-card shadow-2xl"
            >
              {/* Gold gradient header */}
              <div className="relative flex flex-col items-center px-8 pb-6 pt-10 text-center">
                {/* Decorative background shimmer */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold-light/10" />
                <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gold/8 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gold-light/8 blur-3xl" />

                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 200,
                    delay: 0.2,
                  }}
                  className="relative mb-6"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-success to-success/80 shadow-lg shadow-success/30">
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <Check className="h-10 w-10 text-success-foreground" strokeWidth={3} />
                    </motion.div>
                  </div>
                  {/* Sparkle accents */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="absolute -right-2 -top-1"
                  >
                    <Sparkles className="h-5 w-5 text-gold" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    className="absolute -left-3 bottom-1"
                  >
                    <Sparkles className="h-4 w-4 text-gold-light" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-2 text-2xl font-bold tracking-tight text-foreground"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Payment Successful
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-muted-foreground"
                >
                  Your transaction has been completed
                </motion.p>
              </div>

              {/* Amount section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mx-8 rounded-xl border border-border bg-secondary/50 p-5"
              >
                <div className="mb-4 text-center">
                  <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Amount Paid
                  </p>
                  <p
                    className="text-4xl font-bold tracking-tight text-foreground"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {amount}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Order ID</span>
                    <span className="font-medium text-foreground">{orderId}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="flex items-center gap-1.5 font-medium text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      Confirmed
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">
                      {new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col gap-3 p-8"
              >
                <Button
                  onClick={onClose}
                  className="group h-12 w-full rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-primary-foreground font-semibold tracking-wide shadow-lg shadow-gold/20 transition-all hover:shadow-xl hover:shadow-gold/30 hover:brightness-110"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <button
                  onClick={onClose}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {/* View receipt */}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessModal;
